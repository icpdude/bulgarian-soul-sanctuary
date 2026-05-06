import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { FooterSection } from "@/components/FooterSection";
import { PageHead } from "@/components/PageHead";
import { BulgarianRose } from "@/components/atomic/BulgarianRose";

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
        <main className="pt-28 pb-20 px-6 relative">
          <div className="absolute inset-x-0 top-20 h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
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
              transition={{ duration: 0.4 }}
              className="prose prose-invert max-w-none"
            >
              <header className="mb-10 not-prose">
                <div className="flex items-center gap-3 text-primary/70 mb-4">
                  <BulgarianRose size={20} />
                  <span className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient-dawn mb-3 tracking-tight">
                  {title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Last updated <time>{updated}</time>
                </p>
              </header>
              <div className="space-y-8 text-foreground/85 leading-relaxed text-[15px]">
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
