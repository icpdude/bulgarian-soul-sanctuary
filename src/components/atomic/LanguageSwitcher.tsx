import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const LanguageSwitcher = () => {
  const [language, setLanguage] = useState("BG");

  const toggleLanguage = () => {
    setLanguage(prev => prev === "BG" ? "EN" : "BG");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLanguage}
        className="relative overflow-hidden"
      >
        <motion.span
          key={language}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm font-medium"
        >
          {language}
        </motion.span>
      </Button>
    </motion.div>
  );
};