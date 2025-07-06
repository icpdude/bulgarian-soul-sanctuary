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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Mission Statement */}
      <div id="mission">
        <MissionSection />
      </div>
      
      {/* Four Pillars */}
      <div id="pillars">
        <PillarsSection />
      </div>
      
      {/* NFT Collection */}
      <div id="nft">
        <NFTSection />
      </div>
      
      {/* Membership Tiers */}
      <div id="membership">
        <MembershipSection />
      </div>
      
      {/* DAO Portal */}
      <div id="dao">
        <DAOSection />
      </div>
      
      {/* Donation & Support */}
      <div id="donate">
        <DonationSection />
      </div>
      
      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default Index;