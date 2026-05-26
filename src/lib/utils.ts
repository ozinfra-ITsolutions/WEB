import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(path: string): string {
  if (!path) return "";
  
  // Only apply prefix if running on GitHub Pages (detected by hostname or config)
  const isGithubPages = typeof window !== "undefined" && window.location.hostname.includes("github.io");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isGithubPages ? "/WEB" : "");
  
  if (basePath && path.startsWith("/") && !path.startsWith(basePath)) {
    return `${basePath}${path}`;
  }
  
  return path;
}

