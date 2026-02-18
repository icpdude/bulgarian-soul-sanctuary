import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { PageHead } from "@/components/PageHead";
import { trackPageView } from "@/lib/analytics";
import { FooterSection } from "@/components/FooterSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileText, Wallet, Users } from "lucide-react";
import { ProposalManagement } from "@/components/admin/ProposalManagement";
import { TreasuryManagement } from "@/components/admin/TreasuryManagement";
import { MemberManagement } from "@/components/admin/MemberManagement";
import { TokenGate } from "@/components/TokenGate";
import { MembershipTier } from "@/contracts/MembershipNFTABI";

const AdminDashboard = () => {
  useEffect(() => {
    trackPageView('/admin');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageHead 
        title="Admin Dashboard"
        description="Administrative control panel for managing DAO proposals, treasury allocations, and member permissions."
        keywords="admin dashboard, DAO management, proposal management, treasury control"
        canonicalUrl="https://foundation-bst.org/admin"
      />
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <TokenGate requiredTier={MembershipTier.Gold} fallbackMessage="Admin Dashboard requires Gold tier membership or higher.">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold bg-gradient-aurora bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>

            <Tabs defaultValue="proposals" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="proposals" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Proposals</span>
                </TabsTrigger>
                <TabsTrigger value="treasury" className="flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  <span className="hidden sm:inline">Treasury</span>
                </TabsTrigger>
                <TabsTrigger value="members" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Members</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="proposals">
                <ProposalManagement />
              </TabsContent>

              <TabsContent value="treasury">
                <TreasuryManagement />
              </TabsContent>

              <TabsContent value="members">
                <MemberManagement />
              </TabsContent>
            </Tabs>
          </motion.div>
        </TokenGate>
      </main>

      <FooterSection />
    </div>
  );
};

export default AdminDashboard;
