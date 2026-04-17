import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MessageCircle, Send, Loader2 } from "lucide-react";
import { z } from "zod";
import { Navigation } from "@/components/Navigation";
import { FooterSection } from "@/components/FooterSection";
import { PageHead } from "@/components/PageHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be 100 characters or fewer"),
  email: z.string().trim().email("Enter a valid email").max(255, "Email is too long"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject is too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be 2000 characters or fewer"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    const { data: userData } = await supabase.auth.getUser();
    const { error } = await supabase.from("contact_messages").insert({
      ...parsed.data,
      user_id: userData.user?.id ?? null,
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: "Could not send message",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message sent",
      description: "Thank you — we will respond within a few days.",
    });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <PageHead
        title="Contact — Bulgarian Spiritual Treasury"
        description="Reach the Bulgarian Spiritual Treasury Foundation with questions about membership, governance, or partnerships."
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-28 pb-16 px-6">
          <div className="max-w-5xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-elegant mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>

            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient-dawn mb-3">
                Get in touch
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Questions about membership, governance, partnerships, or our cultural mission? Send
                us a message and a steward will reply.
              </p>
            </motion.header>

            <div className="grid lg:grid-cols-3 gap-6">
              <aside className="space-y-4">
                <Card className="border-primary/20 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Mail className="w-4 h-4 text-primary" /> Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a
                      href="mailto:contact@spiritofbulgaria.org"
                      className="text-sm text-muted-foreground hover:text-primary break-all"
                    >
                      contact@spiritofbulgaria.org
                    </a>
                  </CardContent>
                </Card>
                <Card className="border-primary/20 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <MessageCircle className="w-4 h-4 text-primary" /> Community
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <a href="https://t.me/spiritofbulgaria" className="block text-muted-foreground hover:text-primary">
                      Telegram
                    </a>
                    <a href="https://discord.gg/spiritofbulgaria" className="block text-muted-foreground hover:text-primary">
                      Discord
                    </a>
                  </CardContent>
                </Card>
              </aside>

              <Card className="lg:col-span-2 border-primary/20 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Send a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={handleChange("name")}
                          maxLength={100}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && (
                          <p id="name-error" className="text-xs text-destructive">{errors.name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange("email")}
                          maxLength={255}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" className="text-xs text-destructive">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={form.subject}
                        onChange={handleChange("subject")}
                        maxLength={200}
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                      />
                      {errors.subject && (
                        <p id="subject-error" className="text-xs text-destructive">{errors.subject}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={form.message}
                        onChange={handleChange("message")}
                        maxLength={2000}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{errors.message && <span className="text-destructive">{errors.message}</span>}</span>
                        <span>{form.message.length}/2000</span>
                      </div>
                    </div>
                    <Button type="submit" className="w-full sm:w-auto" disabled={submitting}>
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending…
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" /> Send message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <FooterSection />
      </div>
    </>
  );
};

export default Contact;
