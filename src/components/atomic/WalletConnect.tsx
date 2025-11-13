import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from "framer-motion";
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { analytics } from '@/lib/analytics';

export const WalletConnect = () => {
  const { address, isConnected, connector } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      analytics.trackWalletConnection(connector?.name || 'unknown', true);
    }
  }, [isConnected, address, connector]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ display: !ready ? 'none' : 'block' }}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="relative overflow-hidden px-4 py-2 text-sm font-medium rounded-md border border-border bg-background hover:bg-accent transition-colors"
                  >
                    <span className="flex items-center space-x-2">
                      <span className="hidden md:inline">Connect Wallet</span>
                      <span className="md:hidden">Connect</span>
                    </span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="relative overflow-hidden px-4 py-2 text-sm font-medium rounded-md border border-destructive bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex gap-2">
                  <button
                    onClick={openChainModal}
                    className="relative overflow-hidden px-3 py-2 text-sm font-medium rounded-md border border-border bg-background hover:bg-accent transition-colors flex items-center gap-2"
                  >
                    {chain.hasIcon && (
                      <div className="w-4 h-4">
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            className="w-4 h-4"
                          />
                        )}
                      </div>
                    )}
                    <span className="hidden md:inline">{chain.name}</span>
                  </button>

                  <button
                    onClick={openAccountModal}
                    className="relative overflow-hidden px-4 py-2 text-sm font-medium rounded-md border border-border bg-background hover:bg-accent transition-colors"
                  >
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </motion.div>
        );
      }}
    </ConnectButton.Custom>
  );
};