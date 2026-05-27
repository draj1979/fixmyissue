import {
  Smartphone,
  Utensils,
  Plane,
  ShoppingBag,
  Wrench,
  CreditCard,
  MoreHorizontal,
} from "lucide-react";

// Palette
export const CREAM = "#FAF6EE";
export const CREAM_DEEP = "#F2EBDC";
export const INK = "#2A2520";
export const INK_SOFT = "#6B5D4F";
export const TERRA = "#E8553D";
export const TERRA_DEEP = "#C8442F";
export const SAGE = "#7A8E66";
export const PAPER_BORDER = "#E5DCC9";

// Brand
export const BRAND_NAME = "fixmyissue";
export const BRAND_INITIAL = "f";
export const TICKET_PREFIX = "FMI-";

export const CATEGORIES = [
  { id: "electronics", label: "Electronics", icon: Smartphone },
  { id: "food", label: "Food & delivery", icon: Utensils },
  { id: "travel", label: "Travel & airlines", icon: Plane },
  { id: "ecommerce", label: "Online shopping", icon: ShoppingBag },
  { id: "services", label: "Services & repairs", icon: Wrench },
  { id: "financial", label: "Banking & fintech", icon: CreditCard },
  { id: "other", label: "Something else", icon: MoreHorizontal },
];

export const OUTCOMES = [
  { id: "refund", label: "A full refund", emoji: "💰" },
  { id: "replacement", label: "A replacement or repair", emoji: "🔧" },
  { id: "response", label: "An honest response", emoji: "💬" },
  { id: "escalation", label: "Escalation to a human", emoji: "📣" },
  { id: "compensation", label: "Compensation for the trouble", emoji: "🎁" },
  { id: "other", label: "Something else", emoji: "✨" },
];
