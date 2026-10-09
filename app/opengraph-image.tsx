import { socialImage } from "@/lib/social-image";

// Kept as literals here: Next reads these exports statically.
export const alt = "Monitizee: every Telegram message, monetized. Earn $0.001 per view, paid in USDT on GRAM.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return socialImage();
}
