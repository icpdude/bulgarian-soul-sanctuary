import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, BookOpen, Calendar, Clock, Trophy } from "lucide-react";

const academyPrograms = [
  {
    id: "youth",
    title: "Youth Heritage Program",
    description: "Engaging young Bulgarians in their cultural roots through interactive workshops and digital storytelling",
    duration: "6 months",
    participants: 156,
    level: "Beginner",
    icon: "👶",
    color: "border-primary",
    modules: ["Digital Storytelling", "Folk Music Basics", "Cultural Identity", "Community Projects"],
    nftDiploma: "Youth Cultural Guardian NFT",
    nextStart: "March 15, 2024"
  },
  {
    id: "spirit",
    title: "Spirit & Mindfulness",
    description: "Ancient Bulgarian meditation practices and spiritual traditions for modern wellness",
    duration: "4 months", 
    participants: 89,
    level: "Intermediate",
    icon: "🧘",
    color: "border-amber",
    modules: ["Bulgarian Meditation", "Spiritual Texts", "Sacred Geometry", "Healing Practices"],
    nftDiploma: "Spiritual Practitioner NFT",
    nextStart: "April 2, 2024"
  },
  {
    id: "art",
    title: "Art & Expression",
    description: "Traditional Bulgarian arts, crafts, and their contemporary digital interpretations",
    duration: "8 months",
    participants: 234,
    level: "All Levels",
    icon: "🎨",
    color: "border-rose",
    modules: ["Traditional Crafts", "Digital Art", "Cultural Symbols", "NFT Creation"],
    nftDiploma: "Cultural Artist NFT",
    nextStart: "February 28, 2024"
  },
  {
    id: "literacy",
    title: "Cultural Literacy",
    description: "Deep dive into Bulgarian history, literature, and philosophical traditions",
    duration: "12 months",
    participants: 67,
    level: "Advanced",
    icon: "📚",
    color: "border-secondary",
    modules: ["Historical Analysis", "Literary Criticism", "Philosophy", "Research Methods"],
    nftDiploma: "Cultural Scholar NFT",
    nextStart: "September 1, 2024"
  }
];

export const AcademySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/20 to-background" />
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-10 right-20 text-8xl"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          🎓
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-10 text-6xl"
          animate={{ rotate: -360, y: [0, -15, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          📖
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/4 text-4xl"
          animate={{ rotate: 180, scale: [1, 1.2, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          ✨
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
            Sacred Academy
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-amber mx-auto mb-8"
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
            Immerse yourself in Bulgarian cultural heritage through our transformative learning programs. 
            Each journey concludes with a unique NFT diploma certifying your mastery.
          </motion.p>
        </motion.div>

        {/* Timeline Layout */}
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Timeline Line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary via-amber to-rose opacity-30"
            style={{ height: "100%" }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 2, delay: 1 }}
          />

          <div className="space-y-16">
            {academyPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                variants={itemVariants}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Timeline Node */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-dawn rounded-full flex items-center justify-center z-10 border-4 border-background"
                  whileHover={{ scale: 1.3, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-xs">{program.icon}</span>
                </motion.div>

                {/* Content Card */}
                <motion.div
                  className={`w-5/12 ${index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}
                  whileHover={{ scale: 1.02, z: 50 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className={`bg-card/80 backdrop-blur-sm border-2 ${program.color} hover:shadow-2xl transition-all duration-500 group cursor-pointer`}
                        onClick={() => setSelectedProgram(selectedProgram === program.id ? null : program.id)}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className="text-3xl"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                          >
                            {program.icon}
                          </motion.div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {program.title}
                            </h3>
                            <Badge variant="outline" className="mt-1">
                              {program.level}
                            </Badge>
                          </div>
                        </div>
                        <motion.div 
                          className="text-right"
                          whileHover={{ scale: 1.1 }}
                        >
                          <GraduationCap className="w-6 h-6 text-primary mx-auto mb-1" />
                          <div className="text-xs text-muted-foreground">NFT Diploma</div>
                        </motion.div>
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {program.description}
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-amber" />
                          <span className="text-sm text-muted-foreground">{program.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{program.participants}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-rose" />
                          <span className="text-sm text-muted-foreground">Next: {program.nextStart.split(',')[0]}</span>
                        </div>
                      </div>

                      {/* Expandable Content */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: selectedProgram === program.id ? "auto" : 0,
                          opacity: selectedProgram === program.id ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-border">
                          <h4 className="font-semibold text-foreground mb-3 flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-primary" />
                            Course Modules
                          </h4>
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {program.modules.map((module, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {module}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Trophy className="w-4 h-4 text-amber" />
                              <span className="text-sm font-medium text-foreground">{program.nftDiploma}</span>
                            </div>
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              Enroll Now
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Academy Stats */}
        <motion.div 
          className="mt-20 grid md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {[
            { label: "Active Students", value: "546", icon: Users, color: "text-primary" },
            { label: "Courses Completed", value: "1,234", icon: GraduationCap, color: "text-amber" },
            { label: "NFT Diplomas Issued", value: "892", icon: Trophy, color: "text-rose" },
            { label: "Success Rate", value: "94%", icon: BookOpen, color: "text-secondary" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-card/50 backdrop-blur-sm rounded-xl p-6 text-center border border-border"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};