import { useAccount, usePublicClient } from 'wagmi';
import { useState, useEffect, useCallback } from 'react';
import { parseAbiItem, formatEther, type Log } from 'viem';

const NFT_ADDRESS = import.meta.env.VITE_MEMBERSHIP_NFT_ADDRESS as `0x${string}` | undefined;
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000' as `0x${string}`;

export type OnChainTxType = 'mint' | 'transfer_in' | 'transfer_out';

export interface OnChainTransaction {
  id: string;
  type: OnChainTxType;
  label: string;
  from: `0x${string}`;
  to: `0x${string}`;
  tokenId: bigint;
  blockNumber: bigint;
  transactionHash: string;
  timestamp: number | null;
  value: string;
}

const TRANSFER_EVENT = parseAbiItem(
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)'
);

export const useTransactionHistory = () => {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [transactions, setTransactions] = useState<OnChainTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!address || !publicClient || !NFT_ADDRESS) {
      setTransactions([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch Transfer events where user is sender or receiver
      const [logsTo, logsFrom] = await Promise.all([
        publicClient.getLogs({
          address: NFT_ADDRESS,
          event: TRANSFER_EVENT,
          args: { to: address },
          fromBlock: 'earliest',
          toBlock: 'latest',
        }),
        publicClient.getLogs({
          address: NFT_ADDRESS,
          event: TRANSFER_EVENT,
          args: { from: address },
          fromBlock: 'earliest',
          toBlock: 'latest',
        }),
      ]);

      const allLogs = [...logsTo, ...logsFrom];

      // Deduplicate by transactionHash + logIndex
      const seen = new Set<string>();
      const uniqueLogs = allLogs.filter((log) => {
        const key = `${log.transactionHash}-${log.logIndex}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      // Resolve block timestamps in parallel (batch unique blocks)
      const uniqueBlocks = [...new Set(uniqueLogs.map((l) => l.blockNumber))];
      const blockTimestamps = new Map<bigint, number>();

      const blocks = await Promise.all(
        uniqueBlocks.map((bn) =>
          publicClient.getBlock({ blockNumber: bn }).catch(() => null)
        )
      );
      blocks.forEach((block, i) => {
        if (block) {
          blockTimestamps.set(uniqueBlocks[i], Number(block.timestamp));
        }
      });

      // Optionally fetch tx values for mints
      const txs: OnChainTransaction[] = await Promise.all(
        uniqueLogs.map(async (log) => {
          const from = log.args.from as `0x${string}`;
          const to = log.args.to as `0x${string}`;
          const tokenId = log.args.tokenId as bigint;
          const isMint = from === ZERO_ADDRESS;
          const isOutgoing = from === address && !isMint;

          let value = '—';
          if (isMint && log.transactionHash) {
            try {
              const receipt = await publicClient.getTransaction({ hash: log.transactionHash as `0x${string}` });
              if (receipt.value > 0n) {
                value = `${formatEther(receipt.value)} ETH`;
              }
            } catch {
              // value stays as '—'
            }
          }

          const type: OnChainTxType = isMint
            ? 'mint'
            : isOutgoing
              ? 'transfer_out'
              : 'transfer_in';

          const label = isMint
            ? 'Membership NFT Minted'
            : isOutgoing
              ? 'NFT Sent'
              : 'NFT Received';

          return {
            id: log.transactionHash ?? `${log.blockNumber}-${log.logIndex}`,
            type,
            label,
            from,
            to,
            tokenId,
            blockNumber: log.blockNumber,
            transactionHash: log.transactionHash ?? '',
            timestamp: blockTimestamps.get(log.blockNumber) ?? null,
            value,
          };
        })
      );

      // Sort newest first
      txs.sort((a, b) => Number(b.blockNumber - a.blockNumber));
      setTransactions(txs);
    } catch (err) {
      console.error('Failed to fetch transaction history:', err);
      setError('Failed to load on-chain transaction history');
    } finally {
      setIsLoading(false);
    }
  }, [address, publicClient]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    transactions,
    isLoading,
    error,
    refetch: fetchHistory,
    isConfigured: !!NFT_ADDRESS,
  };
};
