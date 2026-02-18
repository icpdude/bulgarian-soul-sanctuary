import { motion } from "framer-motion";
import { Shield, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMembershipStatus, useNFTCollection } from "@/hooks/useNFT";
import { useAccount } from "wagmi";
import { useModal } from "@/contexts/ModalContext";
import { MembershipTier } from "@/contracts/MembershipNFTABI";

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
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full"
        />
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
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex items-center justify-center min-h-[400px] px-6"
  >
    <Card className="max-w-md w-full border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-8 pb-8 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
          {type === "wallet" ? (
            <Shield className="w-8 h-8 text-primary" />
          ) : (
            <Lock className="w-8 h-8 text-primary" />
          )}
        </div>

        <h2 className="text-2xl font-bold">
          {type === "wallet" ? "Connect Your Wallet" : "Membership Required"}
        </h2>

        <p className="text-muted-foreground">
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
