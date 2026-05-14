import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModal } from "@/contexts/ModalContext";
import { Mail, Lock, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { BulgarianRose } from "@/components/atomic/BulgarianRose";

export const AuthModal = () => {
  const { activeModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      setIsLoading(false);
      closeModal();
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Welcome to the community!",
        description: "Your account has been created successfully.",
      });
      setIsLoading(false);
      closeModal();
    }, 1500);
  };

  return (
    <Dialog open={activeModal === 'auth'} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-background via-background to-background/95 border-primary/20 overflow-hidden p-0">
        <div className="heritage-border-top" />
        <div className="p-6 space-y-6">
          <DialogHeader className="text-left">
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-2">
              Foundation · Sanctuary
            </p>
            <DialogTitle className="text-2xl font-display font-bold tracking-tight bg-gradient-mystical bg-clip-text text-transparent flex items-center gap-3">
              <BulgarianRose size={22} className="text-primary/70" />
              Join the Community
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Connect with a global network of spiritual seekers and DAO members
            </DialogDescription>
          </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="bg-background/50"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                variant="spiritual"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Your name"
                  required
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="bg-background/50"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                variant="spiritual"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
