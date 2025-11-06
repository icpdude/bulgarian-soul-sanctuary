import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModal } from "@/contexts/ModalContext";
import { Heart, CreditCard, Wallet, Bitcoin, DollarSign, Euro, Coins } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const amounts = [10, 25, 50, 100, 250, 500];

export const DonationModal = () => {
  const { activeModal, closeModal } = useModal();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDonate = async (method: string) => {
    setIsProcessing(true);
    const amount = selectedAmount || parseFloat(customAmount);
    
    setTimeout(() => {
      toast({
        title: "Thank you for your donation!",
        description: `Your ${amount} EUR contribution via ${method} is being processed.`,
      });
      setIsProcessing(false);
      closeModal();
      setSelectedAmount(null);
      setCustomAmount("");
    }, 2000);
  };

  const currentAmount = selectedAmount || (customAmount ? parseFloat(customAmount) : 0);

  return (
    <Dialog open={activeModal === 'donation'} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[550px] bg-gradient-to-br from-background via-background to-background/95 border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-heritage bg-clip-text text-transparent flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary fill-primary/20" />
            Support Our Mission
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Your contribution helps preserve Bulgarian spiritual heritage and empower our community
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Amount Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Select Amount (EUR)</Label>
            <div className="grid grid-cols-3 gap-2">
              {amounts.map((amount) => (
                <Button
                  key={amount}
                  variant={selectedAmount === amount ? "spiritual" : "outline"}
                  className="h-12"
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount("");
                  }}
                >
                  €{amount}
                </Button>
              ))}
            </div>
            <div className="space-y-2">
              <Label htmlFor="custom-amount">Custom Amount</Label>
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="pl-10 bg-background/50"
                  min="1"
                />
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <Tabs defaultValue="card" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="card" className="text-xs">Card</TabsTrigger>
              <TabsTrigger value="crypto" className="text-xs">Crypto</TabsTrigger>
              <TabsTrigger value="wallet" className="text-xs">Wallet</TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="w-full h-auto py-4 justify-start gap-4 hover:bg-primary/5"
                    onClick={() => handleDonate('Credit Card')}
                    disabled={!currentAmount || isProcessing}
                  >
                    <CreditCard className="w-5 h-5 text-primary" />
                    <div className="text-left">
                      <p className="font-semibold">Credit / Debit Card</p>
                      <p className="text-xs text-muted-foreground">Secure payment via Stripe</p>
                    </div>
                  </Button>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="crypto" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <Button
                  variant="outline"
                  className="w-full h-auto py-4 justify-start gap-4 hover:bg-primary/5"
                  onClick={() => handleDonate('Bitcoin')}
                  disabled={!currentAmount || isProcessing}
                >
                  <Bitcoin className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <p className="font-semibold">Bitcoin (BTC)</p>
                    <p className="text-xs text-muted-foreground">Native crypto donation</p>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-auto py-4 justify-start gap-4 hover:bg-primary/5"
                  onClick={() => handleDonate('Ethereum')}
                  disabled={!currentAmount || isProcessing}
                >
                  <Coins className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <p className="font-semibold">Ethereum (ETH)</p>
                    <p className="text-xs text-muted-foreground">Smart contract donation</p>
                  </div>
                </Button>
              </motion.div>
            </TabsContent>

            <TabsContent value="wallet" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <Button
                  variant="outline"
                  className="w-full h-auto py-4 justify-start gap-4 hover:bg-primary/5"
                  onClick={() => handleDonate('Web3 Wallet')}
                  disabled={!currentAmount || isProcessing}
                >
                  <Wallet className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <p className="font-semibold">Connect Wallet</p>
                    <p className="text-xs text-muted-foreground">MetaMask, WalletConnect</p>
                  </div>
                </Button>
              </motion.div>
            </TabsContent>
          </Tabs>

          {currentAmount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-lg bg-gradient-dusk border border-primary/20"
            >
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Donation:</span>
                <span className="text-2xl font-bold text-primary">€{currentAmount}</span>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
