import { ScrollChainStatus } from "./atomic/ScrollChainStatus";

export const FooterSection = () => {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-gradient-dawn mb-4">
              Spirit of Bulgaria
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              A digital sanctuary preserving Bulgarian spiritual heritage through Web3 technology 
              and community governance.
            </p>
            <div className="flex gap-4">
              <a href="https://t.me/spiritofbulgaria" className="text-muted-foreground hover:text-primary transition-spiritual">
                <span className="sr-only">Telegram</span>
                📱
              </a>
              <a href="https://twitter.com/spiritbulgaria" className="text-muted-foreground hover:text-primary transition-spiritual">
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a href="https://discord.gg/spiritofbulgaria" className="text-muted-foreground hover:text-primary transition-spiritual">
                <span className="sr-only">Discord</span>
                💬
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#mission" className="block text-muted-foreground hover:text-primary transition-spiritual">About</a>
              <a href="#pillars" className="block text-muted-foreground hover:text-primary transition-spiritual">Our Work</a>
              <a href="#nft" className="block text-muted-foreground hover:text-primary transition-spiritual">NFT Collection</a>
              <a href="#dao" className="block text-muted-foreground hover:text-primary transition-spiritual">DAO Portal</a>
              <a href="#donate" className="block text-muted-foreground hover:text-primary transition-spiritual">Support Us</a>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>contact@spiritofbulgaria.org</p>
              <p>spiritofbulgaria.eth</p>
              <div className="mt-4">
                <div className="text-sm text-muted-foreground mb-1">Blockchain Status</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs">ScrollChain Synced</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left space-y-2">
            <ScrollChainStatus />
            <div className="text-sm text-muted-foreground">
              © 2024 Spirit of Bulgaria Foundation. 
              <span className="ml-2">Licensed under Creative Commons BY-SA 4.0</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>NFT License: CC0</span>
            <span>•</span>
            <a href="/ipfs-gateway" className="hover:text-primary transition-spiritual">IPFS Gateway</a>
            <span>•</span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-amber rounded-full" />
              Web3 Connected
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};