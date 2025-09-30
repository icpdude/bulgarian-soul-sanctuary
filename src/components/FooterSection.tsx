import { motion } from "framer-motion";
import { ScrollChainStatus } from "./atomic/ScrollChainStatus";
import { Heart, Github, Twitter, MessageCircle } from "lucide-react";

const socialLinks = [
  { icon: MessageCircle, href: "https://t.me/spiritofbulgaria", label: "Telegram" },
  { icon: Twitter, href: "https://twitter.com/spiritbulgaria", label: "Twitter" },
  { icon: MessageCircle, href: "https://discord.gg/spiritofbulgaria", label: "Discord" },
  { icon: Github, href: "https://github.com/spiritofbulgaria", label: "GitHub" }
];

export const FooterSection = () => {
  return (
    <footer className="py-16 px-6 border-t border-border relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h3 
              className="text-2xl font-bold text-gradient-dawn mb-4"
              whileHover={{ scale: 1.02 }}
            >
              Spirit of Bulgaria
            </motion.h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              A digital sanctuary preserving Bulgarian spiritual heritage through Web3 technology 
              and community governance.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="sr-only">{link.label}</span>
                  <link.icon className="w-5 h-5" />
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
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["About", "Our Work", "NFT Collection", "DAO Portal", "Support Us"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300 group"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <span className="relative">
                    {item}
                    <motion.span 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                    />
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-2 text-muted-foreground">
              <motion.a 
                href="mailto:contact@spiritofbulgaria.org"
                className="block hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
              >
                contact@spiritofbulgaria.org
              </motion.a>
              <motion.p 
                className="hover:text-amber transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                spiritofbulgaria.eth
              </motion.p>
              <div className="mt-4">
                <div className="text-sm text-muted-foreground mb-1">Blockchain Status</div>
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs">ScrollChain Synced</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center md:text-left space-y-2">
            <ScrollChainStatus />
            <motion.div 
              className="text-sm text-muted-foreground"
              whileHover={{ scale: 1.02 }}
            >
              © 2024 Spirit of Bulgaria Foundation. 
              <span className="ml-2">Licensed under Creative Commons BY-SA 4.0</span>
            </motion.div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <motion.span whileHover={{ scale: 1.05, color: "hsl(var(--primary))" }}>
              NFT License: CC0
            </motion.span>
            <span>•</span>
            <motion.a 
              href="/ipfs-gateway" 
              className="hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              IPFS Gateway
            </motion.a>
            <span>•</span>
            <motion.span 
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-2 h-2 bg-amber rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Web3 Connected
            </motion.span>
          </div>
        </motion.div>
        
        {/* Love Badge */}
        <motion.div 
          className="text-center mt-8 text-xs text-muted-foreground flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span>Built with</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-3 h-3 text-rose fill-rose" />
          </motion.div>
          <span>for Bulgarian heritage</span>
        </motion.div>
      </div>
    </footer>
  );
};