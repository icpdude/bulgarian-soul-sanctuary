import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, DollarSign, Coins, Palette, Users, Target, Gift } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";

const fundingGoals = [
  {
    category: "Sacred Site Restoration",
    current: 156000,
    target: 250000,
    description: "Restore and preserve ancient Bulgarian monasteries and Thracian sanctuaries",
    icon: "🏛️",
    color: "border-primary"
  },
  {
    category: "Digital Archive Creation", 
    current: 89000,
    target: 150000,
    description: "Create comprehensive digital records of Bulgarian cultural artifacts",
    icon: "💾",
    color: "border-amber"
  },
  {
    category: "Educational Programs",
    current: 67000,
    target: 100000,
    description: "Fund cultural education initiatives in schools and communities",
    icon: "📚",
    color: "border-rose"
  },
  {
    category: "Community Events",
    current: 34000,
    target: 75000,
    description: "Organize festivals, workshops, and cultural celebration events",
    icon: "🎭",
    color: "border-secondary"
  }
];

const donationMethods = [
  {
    title: "Traditional Donation",
    description: "Bank transfer, credit card, or PayPal",
    icon: DollarSign,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Crypto Donation",
    description: "ETH, BTC, or other cryptocurrencies", 
    icon: Coins,
    color: "text-amber",
    bgColor: "bg-amber/10"
  },
  {
    title: "NFT Purchase",
    description: "Buy cultural NFTs - proceeds support our mission",
    icon: Palette,
    color: "text-rose",
    bgColor: "bg-rose/10"
  }
];

export const DonationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openModal } = useModal();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      {/* Donation Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-rose/5 to-background" />
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-10 left-20 text-8xl"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          💝
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-6xl"
          animate={{ rotate: -360, y: [0, -15, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          🌟
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-1/4 text-7xl"
          animate={{ rotate: 180, scale: [1, 1.1, 1] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          ❤️
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
            Sacred Support
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-rose mx-auto mb-8"
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
            Your contributions help preserve Bulgaria's spiritual and cultural heritage for future generations. 
            Every donation, no matter the size, makes a meaningful impact.
          </motion.p>
        </motion.div>

        {/* Funding Goals */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h3 
            className="text-3xl font-bold text-foreground mb-8 text-center"
            variants={itemVariants}
          >
            Current Funding Goals
          </motion.h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {fundingGoals.map((goal, index) => {
              const percentage = (goal.current / goal.target) * 100;
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group"
                >
                  <Card className={`bg-card/70 backdrop-blur-sm border-2 ${goal.color} spiritual-card h-full`}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <motion.div
                          className="text-4xl"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                        >
                          {goal.icon}
                        </motion.div>
                        <div>
                          <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {goal.category}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            €{goal.current.toLocaleString()} / €{goal.target.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {goal.description}
                      </p>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-foreground">{percentage.toFixed(1)}% funded</span>
                          <span className="text-muted-foreground">
                            €{(goal.target - goal.current).toLocaleString()} remaining
                          </span>
                        </div>
                        <Progress value={percentage} className="h-3" />
                      </div>
                      
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 group"
                        onClick={() => openModal("donation")}
                      >
                        <Heart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Support This Cause
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Donation Methods */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h3 
            className="text-3xl font-bold text-foreground mb-8 text-center"
            variants={itemVariants}
          >
            Ways to Contribute
          </motion.h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {donationMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group spiritual-card"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary h-full text-center">
                  <CardContent className="p-8">
                    <motion.div
                      className={`w-16 h-16 ${method.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <method.icon className={`w-8 h-8 ${method.color}`} />
                    </motion.div>
                    <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {method.title}
                    </h4>
                    <p className="text-muted-foreground mb-6">
                      {method.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full border-border hover:bg-primary hover:text-primary-foreground"
                      onClick={() => openModal("donation")}
                    >
                      Choose This Method
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact Statement */}
        <motion.div
          className="bg-gradient-dawn rounded-3xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            className="text-6xl mb-6"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🙏
          </motion.div>
          <h3 className="text-3xl md:text-4xl font-bold text-background mb-6">
            Your Impact Creates Legacy
          </h3>
          <p className="text-lg text-background/80 max-w-2xl mx-auto mb-8">
            Together, we've preserved 47 sacred sites, digitized 12,000 artifacts, 
            and educated over 25,000 people about Bulgarian heritage. Your support makes this possible.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { number: "47", label: "Sites Preserved", icon: Target },
              { number: "12K", label: "Artifacts Digitized", icon: Gift },
              { number: "25K", label: "People Educated", icon: Users },
              { number: "€890K", label: "Total Raised", icon: Heart }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-background/20 backdrop-blur-sm rounded-xl p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="w-8 h-8 text-background mx-auto mb-2" />
                <div className="text-2xl font-bold text-background">{stat.number}</div>
                <div className="text-sm text-background/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          
          <Button 
            size="lg" 
            className="bg-background text-foreground hover:bg-background/90 px-8 py-3 sacred-button"
            onClick={() => openModal("donation")}
          >
            <Heart className="w-5 h-5 mr-2" />
            Make a Donation Today
          </Button>
        </motion.div>
      </div>
    </section>
  );
};