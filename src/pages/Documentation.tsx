import { useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageHead } from "@/components/PageHead";
import { trackPageView } from "@/lib/analytics";
import { 
  BookOpen, 
  Users, 
  Vote, 
  Wallet, 
  Shield, 
  TrendingUp,
  FileText,
  Lock,
  Coins,
  Target,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Documentation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView('/docs');
  }, []);

  const sections = [
    {
      id: "governance",
      title: "DAO Governance",
      icon: Users,
      color: "text-primary",
      content: [
        {
          subtitle: "What is DAO Governance?",
          text: "Our Decentralized Autonomous Organization (DAO) operates on democratic principles where every member has a voice. Governance decisions are made collectively through transparent voting mechanisms recorded on the blockchain."
        },
        {
          subtitle: "Voting Power",
          text: "Voting power is determined by your membership tier and participation history. Active members who contribute consistently gain increased influence in governance decisions.",
          list: [
            "Seeker tier: 1 vote per proposal",
            "Devotee tier: 3 votes per proposal",
            "Guardian tier: 5 votes per proposal",
            "Bonus votes for consistent participation"
          ]
        },
        {
          subtitle: "Proposal Process",
          text: "Any member can submit proposals for community consideration:",
          list: [
            "Draft your proposal with clear objectives",
            "Submit for community discussion (7-day period)",
            "Proposal enters formal voting (5-day period)",
            "Execution if approved by majority vote"
          ]
        }
      ]
    },
    {
      id: "treasury",
      title: "Treasury Management",
      icon: Wallet,
      color: "text-accent",
      content: [
        {
          subtitle: "Treasury Overview",
          text: "The DAO treasury is collectively owned by all members and managed through transparent, democratic processes. All funds are secured by multi-signature wallets requiring approval from elected trustees."
        },
        {
          subtitle: "Fund Sources",
          list: [
            "Member contributions and donations",
            "NFT sales and royalties",
            "Partnership agreements",
            "Investment returns from approved initiatives"
          ]
        },
        {
          subtitle: "Allocation Process",
          text: "Treasury funds are allocated through governance proposals with specific requirements:",
          list: [
            "Small grants (<$1000): Simple majority vote",
            "Medium allocations ($1000-$10,000): 60% approval required",
            "Large allocations (>$10,000): 75% approval + trustee review",
            "All transactions publicly recorded on-chain"
          ]
        },
        {
          subtitle: "Financial Transparency",
          text: "We maintain complete transparency with quarterly reports, real-time treasury dashboard access, and immutable on-chain transaction records available to all members."
        }
      ]
    },
    {
      id: "participation",
      title: "How to Participate",
      icon: Target,
      color: "text-secondary",
      content: [
        {
          subtitle: "Getting Started",
          text: "Participation in the DAO is open to all members. Here's how to begin your journey:",
          list: [
            "Connect your Web3 wallet",
            "Choose your membership tier",
            "Complete your profile setup",
            "Join community discussions"
          ]
        },
        {
          subtitle: "Active Participation",
          text: "Members can engage in various ways:",
          list: [
            "Vote on active proposals",
            "Submit new proposals for consideration",
            "Join working groups and committees",
            "Contribute to community projects",
            "Attend virtual town halls and events"
          ]
        },
        {
          subtitle: "Building Reputation",
          text: "Active participation earns you reputation points that enhance your voting power:",
          list: [
            "Consistent voting participation",
            "Quality proposal submissions",
            "Community contributions",
            "Event attendance",
            "Helping other members"
          ]
        },
        {
          subtitle: "Best Practices",
          list: [
            "Read proposals thoroughly before voting",
            "Engage respectfully in discussions",
            "Support initiatives aligned with our mission",
            "Stay informed through community channels",
            "Mentor new members"
          ]
        }
      ]
    },
    {
      id: "security",
      title: "Security & Compliance",
      icon: Shield,
      color: "text-destructive",
      content: [
        {
          subtitle: "Smart Contract Security",
          text: "All DAO operations are secured by audited smart contracts with multi-signature requirements for critical operations. We employ industry-leading security practices and regular audits."
        },
        {
          subtitle: "Member Safety",
          list: [
            "Never share your private keys",
            "Use hardware wallets for large holdings",
            "Verify all transactions before signing",
            "Report suspicious activity immediately",
            "Enable two-factor authentication where possible"
          ]
        },
        {
          subtitle: "Regulatory Compliance",
          text: "We operate within legal frameworks and maintain compliance with applicable regulations while preserving decentralization principles and member privacy."
        }
      ]
    }
  ];

  const faqs = [
    {
      question: "How much does it cost to join?",
      answer: "Membership tiers range from Seeker (free) to Guardian (premium). Each tier offers different benefits and voting power."
    },
    {
      question: "Can I change my membership tier?",
      answer: "Yes, you can upgrade or downgrade your membership tier at any time. Changes take effect immediately."
    },
    {
      question: "What happens if a proposal fails?",
      answer: "Failed proposals can be revised and resubmitted after addressing community concerns during the discussion period."
    },
    {
      question: "How are treasury trustees selected?",
      answer: "Trustees are elected annually through community voting. Any member with Guardian tier status can run for trustee positions."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHead 
        title="Documentation"
        description="Complete guide to DAO governance, treasury management, and participation. Learn how to vote, submit proposals, and contribute to Bulgarian cultural heritage."
        keywords="DAO documentation, governance guide, treasury management, blockchain voting, participation guide"
        canonicalUrl="https://foundation-bst.org/docs"
      />
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              DAO Documentation
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about participating in our decentralized autonomous organization, 
              from governance mechanisms to treasury management.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {sections.map((section, index) => (
              <motion.a
                key={section.id}
                href={`#${section.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="p-4 text-center hover:shadow-lg transition-all duration-300 cursor-pointer border-border/40">
                  <section.icon className={`w-8 h-8 mx-auto mb-2 ${section.color} group-hover:scale-110 transition-transform`} />
                  <p className="text-sm font-medium">{section.title}</p>
                </Card>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="mb-16 scroll-mt-24"
            >
              <Card className="p-8 border-border/40">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-lg bg-primary/10`}>
                    <section.icon className={`w-8 h-8 ${section.color}`} />
                  </div>
                  <h2 className="text-3xl font-bold">{section.title}</h2>
                </div>

                <Separator className="mb-6" />

                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      {item.subtitle && (
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <ArrowRight className="w-5 h-5 text-primary" />
                          {item.subtitle}
                        </h3>
                      )}
                      {item.text && (
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          {item.text}
                        </p>
                      )}
                      {item.list && (
                        <ul className="space-y-2 ml-4">
                          {item.list.map((listItem, listIndex) => (
                            <li key={listIndex} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{listItem}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="p-8 border-border/40">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                Frequently Asked Questions
              </h2>
              <Separator className="mb-6" />
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                    {index < faqs.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Card className="p-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-border/40">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join our community and start participating in the future of decentralized governance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/dao')}
                  className="group"
                >
                  View DAO Dashboard
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Documentation;
