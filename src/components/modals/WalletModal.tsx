import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/ModalContext";
import { Wallet, Chrome, Smartphone, Shield, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const wallets = [
  { id: 'metamask', name: 'MetaMask', icon: Chrome, description: 'Connect to MetaMask' },
  { id: 'walletconnect', name: 'WalletConnect', icon: Smartphone, description: 'Scan with WalletConnect' },
  { id: 'coinbase', name: 'Coinbase Wallet', icon: Wallet, description: 'Connect to Coinbase' },
];

export const WalletModal = () => {
  const { activeModal, closeModal } = useModal();
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  const handleConnect = async (walletId: string) => {
    setConnecting(walletId);
    
    // Simulate wallet connection
    setTimeout(() => {
      setConnected(true);
      toast({
        title: "Wallet Connected!",
        description: `Successfully connected to ${wallets.find(w => w.id === walletId)?.name}`,
      });
      setTimeout(() => {
        closeModal();
        setConnected(false);
        setConnecting(null);
      }, 1500);
    }, 2000);
  };

  return (
    <Dialog open={activeModal === 'wallet'} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-background via-background to-background/95 border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-aurora bg-clip-text text-transparent flex items-center gap-2">
            <Wallet className="w-6 h-6 text-primary" />
            Connect Wallet
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose your preferred wallet to connect with the DAO
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {wallets.map((wallet) => {
            const Icon = wallet.icon;
            const isConnecting = connecting === wallet.id;
            
            return (
              <motion.div
                key={wallet.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="w-full h-auto py-4 px-6 justify-start gap-4 hover:bg-primary/5 hover:border-primary/30 transition-all"
                  onClick={() => handleConnect(wallet.id)}
                  disabled={connecting !== null}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">{wallet.name}</p>
                      <p className="text-sm text-muted-foreground">{wallet.description}</p>
                    </div>
                  </div>
                  {isConnecting && !connected && (
                    <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
                  )}
                  {isConnecting && connected && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                </Button>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-start gap-2 p-4 rounded-lg bg-primary/5 border border-primary/10">
          <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold mb-1">Secure Connection</p>
            <p className="text-muted-foreground">
              We never access your private keys. Your wallet remains secure and under your control.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
