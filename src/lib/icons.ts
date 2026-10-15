import { createElement } from "react";
import {
  BookOpen,
  Compass,
  GraduationCap,
  Heart,
  HeartHandshake,
  Home,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { IconKey } from "@/lib/icon-options";

const icons: Record<IconKey, LucideIcon> = {
  "heart-handshake": HeartHandshake,
  users: Users,
  home: Home,
  "graduation-cap": GraduationCap,
  heart: Heart,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  compass: Compass,
  "book-open": BookOpen,
  "message-circle": MessageCircle,
  sun: Sun,
  leaf: Leaf,
};

/** Renders the icon chosen in the Studio dropdown, falling back to sparkles. */
export function DynamicIcon({ name, className }: { name: string | undefined; className?: string }) {
  return createElement(icons[name as IconKey] ?? Sparkles, { className });
}
