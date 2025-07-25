import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { MissionSection } from "@/components/MissionSection";
import { PillarsSection } from "@/components/PillarsSection";
import { NFTSection } from "@/components/NFTSection";
import { MembershipSection } from "@/components/MembershipSection";
import { DAOSection } from "@/components/DAOSection";
import { DonationSection } from "@/components/DonationSection";
import { FooterSection } from "@/components/FooterSection";

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navigation */}
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section id="home">
          <HeroSection />
        </section>
        
        {/* Mission Statement */}
        <motion.section 
          id="mission"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <MissionSection />
        </motion.section>
        
        {/* Four Pillars */}
        <motion.section 
          id="pillars"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <PillarsSection />
        </motion.section>
        
        {/* NFT Collection */}
        <motion.section 
          id="nft"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <NFTSection />
        </motion.section>
        
        {/* Membership Tiers */}
        <motion.section 
          id="membership"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <MembershipSection />
        </motion.section>
        
        {/* DAO Portal */}
        <motion.section 
          id="dao"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <DAOSection />
        </motion.section>
        
        {/* Donation & Support */}
        <motion.section 
          id="donate"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <DonationSection />
        </motion.section>
        
        {/* Footer */}
        <FooterSection />
      </div>
    </motion.div>
  );
};

export default Index;