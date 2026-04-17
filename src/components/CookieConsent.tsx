import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "bst-cookie-consent";
type Choice = "accepted" | "rejected";

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Slight delay so it doesn't compete with initial paint
        const t = window.setTimeout(() => setVisible(true), 600);
        return () => window.clearTimeout(t);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const persist = (choice: Choice) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ choice, timestamp: new Date().toISOString() })
      );
    } catch {
      // localStorage unavailable — silently ignore
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-6 md:left-auto md:right-6 md:max-w-md z-[60]"
        >
          <div className="relative bg-card/95 backdrop-blur-xl border border-primary/20 shadow-ambient rounded-xl p-5">
            <button
              onClick={() => persist("rejected")}
              aria-label="Dismiss cookie banner"
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3 mb-4">
              <div className="shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Cookie className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground mb-1">We value your privacy</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use essential cookies to run the site and optional analytics to improve it. Read
                  our{" "}
                  <Link to="/cookies" className="text-primary hover:underline">
                    cookie policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => persist("rejected")}
              >
                Essential only
              </Button>
              <Button size="sm" className="flex-1" onClick={() => persist("accepted")}>
                Accept all
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
