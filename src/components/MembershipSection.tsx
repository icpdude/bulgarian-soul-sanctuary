import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Sparkles } from "lucide-react";

const membershipTiers = [
  {
    name: "Sympathizer",
    description: "Support our mission and stay connected",
    badge: "🌟",
    benefits: [
      "Newsletter access",
      "Community updates",
      "Event invitations"
    ],
    nftReward: "Supporter Badge NFT",
    action: "Join Free"
  },
  {
    name: "Volunteer", 
    description: "Actively contribute to preservation efforts",
    badge: "🤝",
    benefits: [
      "Project participation",
      "Volunteer recognition",
      "Exclusive content access",
      "Governance participation"
    ],
    nftReward: "Volunteer Role NFT",
    action: "Apply Now"
  },
  {
    name: "Donor",
    description: "Financial support for our initiatives", 
    badge: "❤️",
    benefits: [
      "Tax deductible receipts",
      "Impact reports",
      "Donor recognition",
      "Priority event access"
    ],
    nftReward: "Patron NFT + Donation Receipt",
    action: "Donate"
  },
  {
    name: "Partner",
    description: "Strategic collaboration and major support",
    badge: "👑", 
    benefits: [
      "Strategic input",
      "Brand partnership",
      "Co-creation opportunities",
      "Advisory board invitation"
    ],
    nftReward: "Partnership Certificate NFT",
    action: "Partner With Us"
  }
];

export const MembershipSection = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-dusk opacity-20" />
      <motion.div 
        className="absolute inset-0"
        animate={{ 
          background: [
            'radial-gradient(circle at 0% 0%, hsl(var(--primary-glow) / 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, hsl(var(--primary-glow) / 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, hsl(var(--primary-glow) / 0.15) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-12 h-12 text-amber mx-auto" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Join Our Sacred Circle
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Become part of the Spirit of Bulgaria community. Each membership tier comes with 
            unique NFT badges and exclusive access to our cultural preservation efforts.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {membershipTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
            >
              <Card className="bg-card/70 backdrop-blur-sm border-border hover:border-primary hover:shadow-glow transition-all duration-500 group h-full relative overflow-hidden">
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
                
                <CardContent className="p-6 flex flex-col h-full relative z-10">
                  <div className="text-center mb-6">
                    <motion.div 
                      className="text-5xl mb-4"
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 4,
                        delay: index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {tier.badge}
                    </motion.div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {tier.description}
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-6 flex-grow">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <motion.div 
                        key={benefitIndex} 
                        className="flex items-start text-sm text-muted-foreground"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + benefitIndex * 0.05 }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        {benefit}
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="bg-gradient-to-r from-amber/20 to-primary/20 rounded-lg p-3 mb-6 border border-amber/30"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      NFT Reward
                    </div>
                    <div className="text-sm font-medium text-amber">{tier.nftReward}</div>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      className="w-full"
                      variant={tier.name === "Partner" ? "default" : "outline"}
                    >
                      {tier.action}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};