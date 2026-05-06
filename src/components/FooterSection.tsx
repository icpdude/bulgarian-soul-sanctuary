import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ScrollChainStatus } from "./atomic/ScrollChainStatus";
import { Heart, Github, Twitter, MessageCircle } from "lucide-react";
import { BulgarianRose } from "./atomic/BulgarianRose";

const socialLinks = [
  { icon: MessageCircle, href: "https://t.me/spiritofbulgaria", label: "Telegram" },
  { icon: Twitter, href: "https://twitter.com/spiritbulgaria", label: "Twitter" },
  { icon: MessageCircle, href: "https://discord.gg/spiritofbulgaria", label: "Discord" },
  { icon: Github, href: "https://github.com/spiritofbulgaria", label: "GitHub" }
];

const quickLinks: { label: string; to: string }[] = [
  { label: "Mission", to: "/#mission" },
  { label: "NFT Collection", to: "/#nft" },
  { label: "DAO Portal", to: "/dao" },
  { label: "Documentation", to: "/docs" },
  { label: "Contact", to: "/contact" },
];


export const FooterSection = () => {
  return (
    <footer className="py-16 px-6 border-t border-border relative overflow-hidden heritage-border-top">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 heritage-pattern opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <BulgarianRose size={22} className="text-primary/80" />
              <h3 className="text-2xl font-display font-bold text-gradient-dawn tracking-tight">
                Bulgarian Spiritual Treasury
              </h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              A digital sanctuary preserving Bulgarian spiritual heritage through Web3 technology 
              and community governance.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-border bg-card/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-elegant"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                >
                  <span className="sr-only">{link.label}</span>
                  <link.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-[0.2em]">Explore</h4>
            <div className="space-y-2">
              {quickLinks.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 + index * 0.04 }}
                >
                  <Link
                    to={item.to}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-300 group"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </motion.div>
              ))}
              <div className="pt-3 mt-3 border-t border-border/40 space-y-1.5">
                <Link to="/privacy" className="block text-xs text-muted-foreground/80 hover:text-primary transition-colors">Privacy</Link>
                <Link to="/terms" className="block text-xs text-muted-foreground/80 hover:text-primary transition-colors">Terms</Link>
                <Link to="/cookies" className="block text-xs text-muted-foreground/80 hover:text-primary transition-colors">Cookies</Link>
              </div>
            </div>

          </motion.div>
          
          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-[0.2em]">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <motion.a 
                href="mailto:contact@spiritofbulgaria.org"
                className="block hover:text-primary transition-colors"
                whileHover={{ x: 3 }}
              >
                contact@spiritofbulgaria.org
              </motion.a>
              <p className="hover:text-amber transition-colors cursor-pointer font-mono text-xs">
                spiritofbulgaria.eth
              </p>
              <div className="mt-4">
                <div className="text-xs text-muted-foreground/70 mb-1.5 uppercase tracking-wider">Status</div>
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-success rounded-full shadow-[0_0_8px_hsl(var(--success))]"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="text-xs">ScrollChain Synced</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 border-t border-border/60 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center md:text-left space-y-1.5">
            <ScrollChainStatus />
            <p className="text-xs text-muted-foreground">
              © 2024 Bulgarian Spiritual Treasury Foundation
              <span className="mx-2">·</span>
              Licensed under CC BY-SA 4.0
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>NFT License: CC0</span>
            <span className="text-border">•</span>
            <Link to="/ipfs-gateway" className="hover:text-primary transition-colors">
              IPFS Gateway
            </Link>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1.5">
              <motion.span
                className="w-2 h-2 bg-amber rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              Web3
            </span>
          </div>
        </motion.div>
        
        {/* Love Badge */}
        <motion.div 
          className="text-center mt-8 text-xs text-muted-foreground/70 flex items-center justify-center gap-1.5"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span>Built with</span>
          <Heart className="w-3 h-3 text-rose fill-rose" />
          <span>for Bulgarian heritage</span>
        </motion.div>
      </div>
    </footer>
  );
};