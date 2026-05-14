import { motion } from "framer-motion";
import { Shield, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMembershipStatus, useNFTCollection } from "@/hooks/useNFT";
import { useAccount } from "wagmi";
import { useModal } from "@/contexts/ModalContext";
import { MembershipTier } from "@/contracts/MembershipNFTABI";
import { BulgarianRose } from "@/components/atomic/BulgarianRose";

interface TokenGateProps {
  children: React.ReactNode;
  requiredTier?: MembershipTier;
  fallbackMessage?: string;
}

export const TokenGate = ({ 
  children, 
  requiredTier,
  fallbackMessage = "You need a membership NFT to access this content."
}: TokenGateProps) => {
  const { address, isConnected } = useAccount();
  const { isMember, tier, isLoading } = useMembershipStatus();
  const { isConfigured } = useNFTCollection();
  const { openModal } = useModal();

  // If NFT contract isn't configured, allow access (dev mode)
  if (!isConfigured) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="text-primary/60"
        >
          <BulgarianRose size={56} />
        </motion.div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Verifying membership
        </p>
      </div>
    );
  }

  if (!isConnected) {
    return <GateFallback type="wallet" onAction={() => openModal("auth")} />;
  }

  if (!isMember) {
    return <GateFallback type="nft" message={fallbackMessage} />;
  }

  if (requiredTier !== undefined && tier !== undefined && (tier as number) < requiredTier) {
    return (
      <GateFallback 
        type="tier" 
        message={`This content requires ${MembershipTier[requiredTier]} tier or higher.`} 
      />
    );
  }

  return <>{children}</>;
};

interface GateFallbackProps {
  type: "wallet" | "nft" | "tier";
  message?: string;
  onAction?: () => void;
}

const GateFallback = ({ type, message, onAction }: GateFallbackProps) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="flex items-center justify-center min-h-[400px] px-6"
  >
    <Card variant="ethereal" className="max-w-md w-full overflow-hidden">
      <div className="heritage-border-top" />
      <CardContent className="pt-8 pb-8 text-center space-y-4">
        <div className="relative w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/15 via-rose/10 to-amber/10 flex items-center justify-center border border-primary/20 shadow-glow">
          <BulgarianRose size={56} className="absolute text-primary/20" />
          {type === "wallet" ? (
            <Shield className="w-7 h-7 text-primary relative" />
          ) : (
            <Lock className="w-7 h-7 text-primary relative" />
          )}
        </div>

        <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          Sacred Threshold
        </p>
        <h2 className="text-2xl font-display font-bold tracking-tight">
          {type === "wallet" ? "Connect Your Wallet" : "Membership Required"}
        </h2>

        <p className="text-muted-foreground leading-relaxed">
          {type === "wallet"
            ? "Connect your wallet to verify your membership status."
            : message}
        </p>

        {type === "wallet" && onAction && (
          <Button onClick={onAction} className="mt-2">
            Connect Wallet <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}

        {type === "nft" && (
          <Button
            onClick={() => {
              const el = document.querySelector("#nft");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            variant="outline"
            className="mt-2"
          >
            Get Membership NFT <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}

        {type === "tier" && (
          <p className="text-sm text-muted-foreground/70">
            Upgrade your membership tier to unlock this content.
          </p>
        )}
      </CardContent>
    </Card>
  </motion.div>
);
