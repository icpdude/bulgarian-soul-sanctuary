import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { ScrollProgress } from "@/components/atomic/ScrollProgress";
import { BackToTop } from "@/components/atomic/BackToTop";
import { CursorGlow } from "@/components/atomic/CursorGlow";
import { SectionDivider } from "@/components/atomic/SectionDivider";
import { HeroSection } from "@/components/HeroSection";
import { MissionSection } from "@/components/MissionSection";
import { PillarsSection } from "@/components/PillarsSection";
import { AcademySection } from "@/components/AcademySection";
import { NFTSection } from "@/components/NFTSection";
import { CommunitySection } from "@/components/CommunitySection";
import { MembershipSection } from "@/components/MembershipSection";
import { DAOSection } from "@/components/DAOSection";
import { DonationSection } from "@/components/DonationSection";
import { FooterSection } from "@/components/FooterSection";
import { useEffect } from "react";
import { capturePerformanceMetrics } from "@/lib/monitoring";

const Index = () => {
  useEffect(() => {
    // Log performance metrics on mount
    const metrics = capturePerformanceMetrics();
    if (metrics && process.env.NODE_ENV === 'production') {
      console.log('Performance Metrics:', metrics);
    }
  }, []);

  return (
    <>
      <ScrollProgress />
      <BackToTop />
      <CursorGlow />
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
        
        <SectionDivider icon="🌿" />

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
        
        <SectionDivider icon="⚡" />
        
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
        
        <SectionDivider icon="🎓" />

        {/* Academy Section */}
        <motion.section 
          id="academy"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <AcademySection />
        </motion.section>
        
        <SectionDivider icon="📦" />

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

        <SectionDivider icon="🫂" />

        {/* Community Section */}
        <motion.section 
          id="community"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <CommunitySection />
        </motion.section>
        
        <SectionDivider icon="✨" />
        
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
        
        <SectionDivider icon="🧠" />

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
        
        <SectionDivider icon="💎" />
        
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
    </>
  );
};

export default Index;