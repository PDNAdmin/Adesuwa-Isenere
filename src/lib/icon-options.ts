// Shared by the website and the Sanity Studio dropdowns, so it must stay free of React imports.
export const iconOptions = [
  { value: "heart-handshake", title: "Heart & handshake" },
  { value: "users", title: "Group of people" },
  { value: "home", title: "House / family home" },
  { value: "graduation-cap", title: "Graduation cap (learning)" },
  { value: "heart", title: "Heart" },
  { value: "shield-check", title: "Shield (safety & trust)" },
  { value: "sparkles", title: "Sparkles (hope & growth)" },
  { value: "compass", title: "Compass (direction)" },
  { value: "book-open", title: "Open book" },
  { value: "message-circle", title: "Speech bubble (conversation)" },
  { value: "sun", title: "Sun (new beginnings)" },
  { value: "leaf", title: "Leaf (healing & growth)" },
] as const;

export type IconKey = (typeof iconOptions)[number]["value"];
