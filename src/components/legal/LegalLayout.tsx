import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { FooterSection } from "@/components/FooterSection";
import { PageHead } from "@/components/PageHead";

interface LegalLayoutProps {
  title: string;
  description: string;
  updated: string;
  children: ReactNode;
}

export const LegalLayout = ({ title, description, updated, children }: LegalLayoutProps) => {
  return (
    <>
      <PageHead title={`${title} — BST Foundation`} description={description} />
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-28 pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-elegant mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose prose-invert max-w-none"
            >
              <header className="mb-8 not-prose">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient-dawn mb-3">
                  {title}
                </h1>
                <p className="text-muted-foreground">Last updated: {updated}</p>
              </header>
              <div className="space-y-6 text-foreground/90 leading-relaxed">
                {children}
              </div>
            </motion.article>
          </div>
        </main>
        <FooterSection />
      </div>
    </>
  );
};
