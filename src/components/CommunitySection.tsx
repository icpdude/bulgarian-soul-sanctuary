import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, MessageCircle, Users, Globe, Heart, Star, ExternalLink } from "lucide-react";

const communityStats = [
  { region: "Bulgaria", members: 1247, active: 892, badge: "🇧🇬" },
  { region: "North America", members: 845, active: 623, badge: "🌎" },
  { region: "Western Europe", members: 1156, active: 834, badge: "🌍" },
  { region: "Australia", members: 234, active: 187, badge: "🌏" },
  { region: "Other", members: 312, active: 234, badge: "🌐" }
];

const featuredStories = [
  {
    title: "My Grandmother's Songs",
    author: "Maria Dimitrova",
    location: "Toronto, Canada",
    excerpt: "Discovering my Bulgarian roots through the lullabies my grandmother sang to me...",
    likes: 234,
    comments: 67,
    image: "👵",
    timeAgo: "3 days ago"
  },
  {
    title: "Building a Spiritual Bridge", 
    author: "Stefan Petrov",
    location: "Sofia, Bulgaria",
    excerpt: "How technology helps preserve our ancient traditions for the next generation...",
    likes: 189,
    comments: 43,
    image: "🌉",
    timeAgo: "1 week ago"
  },
  {
    title: "The Fire Dancer's Legacy",
    author: "Elena Kostova",
    location: "Melbourne, Australia", 
    excerpt: "Learning the sacred dance of my ancestors in a modern world...",
    likes: 312,
    comments: 89,
    image: "🔥",
    timeAgo: "2 weeks ago"
  }
];

const platformLinks = [
  { name: "Discord", members: "2.1k", description: "Real-time chat & voice rooms", icon: "💬", color: "border-purple-500" },
  { name: "Telegram", members: "1.8k", description: "News & announcements", icon: "📱", color: "border-blue-500" },
  { name: "Forum", members: "3.2k", description: "Deep discussions & research", icon: "🗣️", color: "border-green-500" },
  { name: "Newsletter", members: "4.7k", description: "Weekly cultural insights", icon: "📧", color: "border-amber-500" }
];

export const CommunitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

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
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-20 left-20 text-9xl"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          🌍
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 text-7xl"
          animate={{ rotate: -360, y: [0, -20, 0] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          🤝
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-1/4 text-5xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          💝
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
            Global Family
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
            Connect with fellow guardians of Bulgarian heritage around the world. 
            Share stories, preserve memories, and build bridges across continents.
          </motion.p>
        </motion.div>

        {/* Global Member Map */}
        <motion.div 
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h3 
            className="text-2xl font-bold text-center mb-8 text-foreground"
            variants={itemVariants}
          >
            Our Worldwide Community
          </motion.h3>
          
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            {communityStats.map((region, index) => (
              <motion.div
                key={region.region}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                onHoverStart={() => setHoveredRegion(region.region)}
                onHoverEnd={() => setHoveredRegion(null)}
                className="relative"
              >
                <Card className="bg-card/80 backdrop-blur-sm border-border hover:border-primary transition-all duration-300 cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <motion.div 
                      className="text-4xl mb-2"
                      animate={{ 
                        scale: hoveredRegion === region.region ? [1, 1.2, 1] : 1,
                        rotate: hoveredRegion === region.region ? [0, 10, -10, 0] : 0
                      }}
                      transition={{ duration: 0.6, repeat: hoveredRegion === region.region ? Infinity : 0 }}
                    >
                      {region.badge}
                    </motion.div>
                    <h4 className="font-semibold text-foreground mb-2">{region.region}</h4>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Members:</span>
                        <span className="text-primary font-medium">{region.members}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Active:</span>
                        <span className="text-amber font-medium">{region.active}</span>
                      </div>
                    </div>
                    <motion.div 
                      className="w-full bg-muted rounded-full h-2 mt-3"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <motion.div 
                        className="bg-gradient-dawn h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${(region.active / region.members) * 100}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Platform Links */}
        <motion.div 
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h3 
            className="text-2xl font-bold text-center mb-8 text-foreground"
            variants={itemVariants}
          >
            Join Our Platforms
          </motion.h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            {platformLinks.map((platform, index) => (
              <motion.div
                key={platform.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className={`bg-card/70 backdrop-blur-sm border-2 ${platform.color} hover:shadow-xl transition-all duration-300 cursor-pointer group`}>
                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className="text-4xl mb-4"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {platform.icon}
                    </motion.div>
                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {platform.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {platform.description}
                    </p>
                    <Badge variant="outline" className="mb-4">
                      {platform.members} members
                    </Badge>
                    <Button size="sm" variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Join Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Stories */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h3 
            className="text-2xl font-bold text-center mb-8 text-foreground"
            variants={itemVariants}
          >
            Voices from the Diaspora
          </motion.h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {featuredStories.map((story, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, rotateY: 5 }}
                className="perspective-1000"
              >
                <Card className="bg-card/70 backdrop-blur-sm border-border hover:border-primary transition-all duration-500 group cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <motion.div 
                        className="text-3xl"
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {story.image}
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                          {story.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{story.author}</span>
                          <MapPin className="w-3 h-3" />
                          <span>{story.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {story.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4 text-rose" />
                          <span className="text-muted-foreground">{story.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">{story.comments}</span>
                        </div>
                      </div>
                      <span className="text-muted-foreground">{story.timeAgo}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Share Your Story
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};