import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { MembershipMint } from "@/components/nft/MembershipMint";

const nftCollection = [
  {
    title: "Ancient Rose Ritual",
    type: "Audio Recording",
    region: "Valley of Roses",
    year: "1952",
    status: "Available",
    ipfsHash: "QmX7Y8Z9...",
    price: "0.1 ETH"
  },
  {
    title: "Thracian Sun Dance",
    type: "Folk Song",
    region: "Rhodope Mountains", 
    year: "1934",
    status: "Minted",
    ipfsHash: "QmA1B2C3...",
    owner: "0x742d35Cc6c"
  },
  {
    title: "Grandmother's Wisdom",
    type: "Story Collection",
    region: "Pirin Region",
    year: "1960s",
    status: "Available",
    ipfsHash: "QmD4E5F6...",
    price: "0.15 ETH"
  },
  {
    title: "Fire Dancing Chant",
    type: "Ceremonial Music",
    region: "Strandzha Mountains",
    year: "1945",
    status: "Available",
    ipfsHash: "QmG7H8I9...",
    price: "0.2 ETH"
  },
  {
    title: "Kukeri Winter Songs",
    type: "Ritual Music",
    region: "Pernik",
    year: "1938",
    status: "Minted",
    ipfsHash: "QmJ1K2L3...",
    owner: "0x8A7B9C2d"
  },
  {
    title: "Martenitsa Blessing",
    type: "Folk Tale",
    region: "Stara Planina",
    year: "1955",
    status: "Available",
    ipfsHash: "QmM4N5O6...",
    price: "0.08 ETH"
  }
];

const filterTypes = ["All", "Audio Recording", "Folk Song", "Story Collection", "Ceremonial Music", "Ritual Music", "Folk Tale"];

export const NFTSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMint = (title: string) => {
    toast({
      title: "Connect Wallet First",
      description: "Please connect your wallet using the button in the navigation bar to mint NFTs.",
    });
  };

  const filteredCollection = selectedFilter === "All" 
    ? nftCollection 
    : nftCollection.filter(item => item.type === selectedFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, rotateY: 15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 gradient-mystical" />
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-20 left-10 text-9xl"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          🎭
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-7xl"
          animate={{ rotate: -360, y: [0, -20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          📜
        </motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Voices of the Spirit
          </motion.h2>
          <motion.div 
            className="text-2xl text-amber mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Volume I Collection
          </motion.div>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Our inaugural NFT collection features rare audio recordings, folk songs, and stories 
            from Bulgarian spiritual traditions, permanently preserved on ScrollChain.
          </motion.p>
          
          {/* Collection Stats */}
          <motion.div 
            className="flex justify-center gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {[
              { value: 24, label: "Total Items", color: "text-primary" },
              { value: 8, label: "Available", color: "text-rose" },
              { value: 16, label: "Minted", color: "text-amber" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={cardVariants}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className={`text-3xl font-bold ${stat.color}`}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {filterTypes.map((filter) => (
            <motion.div
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant={selectedFilter === filter ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedFilter === filter 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "hover:bg-primary/10"
                }`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
        
        {/* NFT Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredCollection.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05, 
                rotateY: hoveredCard === index ? 10 : 0,
                z: 50
              }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="perspective-1000"
            >
              <Card className="bg-card/70 backdrop-blur-sm border-border hover:border-primary transition-all duration-500 group relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <CardContent className="p-6 relative z-10">
                  <motion.div 
                    className="aspect-square bg-gradient-dusk rounded-lg mb-4 flex items-center justify-center relative overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="text-4xl"
                      animate={{ 
                        rotate: hoveredCard === index ? [0, 10, -10, 0] : 0,
                        scale: hoveredCard === index ? [1, 1.2, 1] : 1
                      }}
                      transition={{ duration: 0.6, repeat: hoveredCard === index ? Infinity : 0 }}
                    >
                      {item.type === "Audio Recording" ? "🎵" : 
                       item.type === "Folk Song" ? "🎶" : 
                       item.type === "Story Collection" ? "📖" : 
                       item.type === "Ceremonial Music" ? "🔥" :
                       item.type === "Ritual Music" ? "🎭" : "📚"}
                    </motion.div>
                    
                    {hoveredCard === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center"
                      >
                        <ExternalLink className="w-6 h-6 text-primary" />
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <motion.h3 
                    className="font-bold text-foreground mb-2 group-hover:text-primary transition-all duration-300"
                    layout
                  >
                    {item.title}
                  </motion.h3>
                  
                  <div className="space-y-1 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center justify-between">
                      <span>{item.type}</span>
                      <Badge variant="secondary" className="text-xs">{item.year}</Badge>
                    </div>
                    <div>{item.region}</div>
                    {item.ipfsHash && (
                      <div className="font-mono text-xs text-primary/60">
                        IPFS: {item.ipfsHash.slice(0, 12)}...
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === "Available" 
                        ? "bg-primary/20 text-primary" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {item.status}
                    </span>
                    
                    {item.status === "Available" ? (
                      <div className="flex flex-col items-end">
                        <div className="text-xs text-muted-foreground mb-1">{item.price}</div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                          onClick={() => handleMint(item.title)}
                        >
                          Mint NFT
                        </Button>
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground">
                        Owner: {item.owner?.slice(0, 10)}...
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Membership Mint Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <MembershipMint />
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="bg-gradient-dawn text-background hover:opacity-90 px-8 py-4 relative overflow-hidden group">
              <motion.div
                className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
              />
              <span className="relative z-10">View Full Collection</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};