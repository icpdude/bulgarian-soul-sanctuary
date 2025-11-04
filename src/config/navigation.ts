import { Home, Compass, GraduationCap, Archive, Users, Heart, Vote } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  emoji: string;
  description: string;
}

export const SITE_CONFIG = {
  name: "Bulgarian Spiritual Treasury",
  shortName: "BST Foundation",
  url: "https://foundation-bst.org",
  description: "Preserving and sharing Bulgaria's spiritual heritage through education, community, and sacred traditions.",
  keywords: [
    "Bulgarian heritage",
    "spiritual treasury",
    "cultural preservation",
    "Web3 community",
    "NFT archives",
    "DAO governance",
    "spiritual education",
    "Bulgarian traditions"
  ],
  social: {
    twitter: "@BulgarianSpiritualTreasury",
    github: "https://github.com/bulgarian-spiritual-treasury",
    discord: "https://discord.gg/bulgarian-spiritual-treasury",
    telegram: "https://t.me/bulgarian_spiritual_treasury"
  }
} as const;

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    href: "#home",
    icon: Home,
    emoji: "🏠",
    description: "Return to the sanctuary entrance"
  },
  {
    id: "mission",
    label: "Mission",
    href: "#mission",
    icon: Compass,
    emoji: "🌿",
    description: "Discover our sacred purpose"
  },
  {
    id: "academy",
    label: "Academy",
    href: "#academy",
    icon: GraduationCap,
    emoji: "🎓",
    description: "Learn spiritual wisdom"
  },
  {
    id: "nft",
    label: "NFT Archives",
    href: "#nft",
    icon: Archive,
    emoji: "📦",
    description: "Explore digital heritage"
  },
  {
    id: "community",
    label: "Community",
    href: "#community",
    icon: Users,
    emoji: "🫂",
    description: "Join the sacred circle"
  },
  {
    id: "donate",
    label: "Donate",
    href: "#donate",
    icon: Heart,
    emoji: "💎",
    description: "Support our mission"
  },
  {
    id: "dao",
    label: "DAO Portal",
    href: "#dao",
    icon: Vote,
    emoji: "🧠",
    description: "Participate in governance"
  }
] as const;
