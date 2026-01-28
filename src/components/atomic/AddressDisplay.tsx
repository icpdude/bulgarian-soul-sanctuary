import { memo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useENSProfile, truncateAddress } from '@/hooks/useENS';
import { User, Copy, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AddressDisplayProps {
  address: `0x${string}`;
  showAvatar?: boolean;
  showCopy?: boolean;
  showExplorer?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AddressDisplay = memo(({
  address,
  showAvatar = true,
  showCopy = true,
  showExplorer = false,
  size = 'md',
  className = '',
}: AddressDisplayProps) => {
  const { ensName, avatar, displayName, isLoading } = useENSProfile(address);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  const handleExplorer = () => {
    window.open(`https://etherscan.io/address/${address}`, '_blank');
  };

  const sizeClasses = {
    sm: { avatar: 'h-5 w-5', text: 'text-xs', icon: 'w-3 h-3' },
    md: { avatar: 'h-8 w-8', text: 'text-sm', icon: 'w-4 h-4' },
    lg: { avatar: 'h-10 w-10', text: 'text-base', icon: 'w-5 h-5' },
  };

  const sizes = sizeClasses[size];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center gap-2 group ${className}`}>
            {showAvatar && (
              <Avatar className={sizes.avatar}>
                {avatar ? (
                  <AvatarImage src={avatar} alt={ensName || address} />
                ) : null}
                <AvatarFallback className="bg-primary/10">
                  <User className={`${sizes.icon} text-primary`} />
                </AvatarFallback>
              </Avatar>
            )}
            
            <span className={`font-mono ${sizes.text} ${isLoading ? 'animate-pulse' : ''}`}>
              {displayName}
            </span>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {showCopy && (
                <button
                  onClick={handleCopy}
                  className="p-1 rounded hover:bg-muted transition-colors"
                  aria-label="Copy address"
                >
                  <Copy className={sizes.icon} />
                </button>
              )}
              {showExplorer && (
                <button
                  onClick={handleExplorer}
                  className="p-1 rounded hover:bg-muted transition-colors"
                  aria-label="View on Etherscan"
                >
                  <ExternalLink className={sizes.icon} />
                </button>
              )}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            {ensName && (
              <p className="font-medium">{ensName}</p>
            )}
            <p className="font-mono text-xs text-muted-foreground">
              {address}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

AddressDisplay.displayName = 'AddressDisplay';

// Simple inline address display without avatar
export const InlineAddress = memo(({
  address,
  className = '',
}: {
  address: `0x${string}`;
  className?: string;
}) => {
  const { displayName, isLoading } = useENSProfile(address);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`font-mono ${isLoading ? 'animate-pulse' : ''} ${className}`}>
            {displayName}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-mono text-xs">{address}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

InlineAddress.displayName = 'InlineAddress';
