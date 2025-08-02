import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Vote, Users, Clock, CheckCircle, Wallet, Shield, Zap } from "lucide-react";

const proposals = [
  {
    id: "PROP-001",
    title: "Sacred Site Preservation Initiative",
    description: "Allocate 50,000 BGN for the restoration of the ancient Thracian sanctuary at Perperikon",
    status: "active",
    votesFor: 1247,
    votesAgainst: 89,
    timeLeft: "3 days",
    category: "Heritage"
  },
  {
    id: "PROP-002", 
    title: "Digital Archive Expansion",
    description: "Fund creation of 3D scans and virtual reality experiences for Bulgarian monasteries",
    status: "active",
    votesFor: 892,
    votesAgainst: 156,
    timeLeft: "1 week",
    category: "Technology"
  },
  {
    id: "PROP-003",
    title: "Cultural Education Program",
    description: "Launch educational initiatives in 100 schools across Bulgaria",
    status: "passed",
    votesFor: 2341,
    votesAgainst: 234,
    timeLeft: "Passed",
    category: "Education"
  }
];

const daoStats = [
  { label: "Total Members", value: "2,847", icon: Users, color: "text-primary" },
  { label: "Active Proposals", value: "12", icon: Vote, color: "text-amber" },
  { label: "Funds Allocated", value: "€234K", icon: Wallet, color: "text-rose" },
  { label: "Success Rate", value: "94%", icon: CheckCircle, color: "text-secondary" }
];

export const DAOSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isConnected, setIsConnected] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Mystical Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-navy/10 to-background" />
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-20 right-1/4 text-9xl"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          ⚡
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-1/3 text-7xl"
          animate={{ rotate: -360, y: [0, -20, 0] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          🏛️
        </motion.div>
        <motion.div
          className="absolute top-1/3 left-10 text-5xl"
          animate={{ rotate: 180, scale: [1, 1.3, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          🗳️
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
            className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sacred Council DAO
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-primary mx-auto mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Join our decentralized community in making decisions that shape the future of Bulgarian 
            cultural preservation. Every voice matters in our sacred democracy.
          </motion.p>
        </motion.div>

        {/* Wallet Connection */}
        <motion.div 
          className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-border"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                className="p-3 bg-primary/20 rounded-full"
                whileHover={{ scale: 1.1, rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Wallet className="w-6 h-6 text-primary" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {isConnected ? "Wallet Connected" : "Connect Your Wallet"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isConnected 
                    ? "You can now participate in governance decisions" 
                    : "Connect to participate in DAO governance"
                  }
                </p>
              </div>
            </div>
            <Button 
              onClick={() => setIsConnected(!isConnected)}
              className={`${isConnected ? 'bg-secondary' : 'bg-primary'} hover:opacity-90`}
            >
              {isConnected ? "Disconnect" : "Connect Wallet"}
            </Button>
          </div>
        </motion.div>

        {/* DAO Stats */}
        <motion.div 
          className="grid md:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {daoStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card/30 backdrop-blur-sm rounded-xl p-6 text-center border border-border group spiritual-card"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className={`w-12 h-12 ${stat.color} mx-auto mb-3 p-2`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-full h-full" />
              </motion.div>
              <div className={`text-3xl font-bold ${stat.color} mb-2 group-hover:text-primary transition-colors`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Active Proposals */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h3 
            className="text-3xl font-bold text-foreground mb-8"
            variants={itemVariants}
          >
            Current Proposals
          </motion.h3>
          
          <div className="space-y-6">
            {proposals.map((proposal, index) => {
              const totalVotes = proposal.votesFor + proposal.votesAgainst;
              const supportPercentage = (proposal.votesFor / totalVotes) * 100;
              
              return (
                <motion.div
                  key={proposal.id}
                  variants={itemVariants}
                  className="group"
                >
                  <Card className="bg-card/70 backdrop-blur-sm border-border hover:border-primary spiritual-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge 
                            variant={proposal.status === "active" ? "default" : "secondary"}
                            className={proposal.status === "active" ? "bg-primary" : "bg-secondary"}
                          >
                            {proposal.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{proposal.id}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {proposal.timeLeft}
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {proposal.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {proposal.description}
                      </p>
                      
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-foreground">Support: {supportPercentage.toFixed(1)}%</span>
                          <span className="text-muted-foreground">{totalVotes} votes</span>
                        </div>
                        <Progress value={supportPercentage} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>For: {proposal.votesFor}</span>
                          <span>Against: {proposal.votesAgainst}</span>
                        </div>
                      </div>
                      
                      {proposal.status === "active" && isConnected && (
                        <div className="flex space-x-3">
                          <Button className="flex-1 bg-primary hover:bg-primary/90">
                            <Vote className="w-4 h-4 mr-2" />
                            Vote For
                          </Button>
                          <Button variant="outline" className="flex-1 border-border hover:bg-muted">
                            <Vote className="w-4 h-4 mr-2" />
                            Vote Against
                          </Button>
                        </div>
                      )}
                      
                      {proposal.status === "passed" && (
                        <div className="flex items-center justify-center p-4 bg-secondary/20 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-secondary mr-2" />
                          <span className="text-secondary font-medium">Proposal Passed & Implemented</span>
                        </div>
                      )}
                      
                      {!isConnected && proposal.status === "active" && (
                        <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
                          <Shield className="w-5 h-5 text-muted-foreground mr-2" />
                          <span className="text-muted-foreground">Connect wallet to participate</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};