import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { Sparkles, Mail, Lock, User as UserIcon, ArrowLeft, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { PageHead } from "@/components/PageHead";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
});

const registerSchema = loginSchema.extend({
  displayName: z.string().trim().min(1, "Name is required").max(100),
});

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [submitting, setSubmitting] = useState(false);
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? "/";

  useEffect(() => {
    if (!loading && user) navigate(from, { replace: true });
  }, [loading, user, from, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = loginSchema.safeParse({
      email: form.get("email"),
      password: form.get("password"),
    });
    if (!parsed.success) {
      toast({
        title: "Invalid input",
        description: parsed.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Sign-in failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Welcome back!" });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = registerSchema.safeParse({
      email: form.get("email"),
      password: form.get("password"),
      displayName: form.get("displayName"),
    });
    if (!parsed.success) {
      toast({
        title: "Invalid input",
        description: parsed.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { display_name: parsed.data.displayName },
      },
    });
    setSubmitting(false);
    if (error) {
      const msg = error.message.toLowerCase().includes("already")
        ? "This email is already registered. Try signing in instead."
        : error.message;
      toast({ title: "Sign-up failed", description: msg, variant: "destructive" });
      return;
    }
    toast({
      title: "Account created",
      description: "Check your email to confirm your address, then sign in.",
    });
    setMode("login");
  };

  return (
    <>
      <PageHead
        title="Sign in — Bulgarian Spiritual Treasury"
        description="Sign in or create an account to access membership, governance, and your profile on the Bulgarian Spiritual Treasury platform."
      />
      <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden px-6 py-12">
        <div className="absolute inset-0 gradient-mystical opacity-30" />
        <div className="absolute inset-0 bg-gradient-dusk opacity-20" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <Card className="border-primary/20 bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="w-6 h-6 text-primary" />
                Join the community
              </CardTitle>
              <CardDescription>
                Sign in to your account or register to participate in DAO governance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={mode} onValueChange={(v) => setMode(v as "login" | "register")}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="login">Sign in</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" /> Email
                      </Label>
                      <Input id="login-email" name="email" type="email" required autoComplete="email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="flex items-center gap-2">
                        <Lock className="w-4 h-4" /> Password
                      </Label>
                      <Input
                        id="login-password"
                        name="password"
                        type="password"
                        required
                        minLength={8}
                        autoComplete="current-password"
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={submitting}>
                      {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                      Sign in
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name" className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4" /> Display name
                      </Label>
                      <Input id="register-name" name="displayName" type="text" required maxLength={100} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" /> Email
                      </Label>
                      <Input id="register-email" name="email" type="email" required autoComplete="email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="flex items-center gap-2">
                        <Lock className="w-4 h-4" /> Password
                      </Label>
                      <Input
                        id="register-password"
                        name="password"
                        type="password"
                        required
                        minLength={8}
                        autoComplete="new-password"
                      />
                      <p className="text-xs text-muted-foreground">At least 8 characters.</p>
                    </div>
                    <Button type="submit" className="w-full" disabled={submitting}>
                      {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                      Create account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default Auth;
