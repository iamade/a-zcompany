import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function getImageUrl(url: string): string {
//   if (!url) return "";
//   if (url.startsWith("http")) return url;
//   if (url.startsWith("/")) return `http://localhost:5000${url}`;
//   return url;
// }