import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format duration in seconds to human-readable string
 * @param seconds - Duration in seconds
 * @returns Formatted string like "45 min" or "1 hr 23 min"
 */
export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours} hr ${minutes} min`;
  }
  return `${minutes} min`;
}

/**
 * Format duration in seconds to MM:SS or HH:MM:SS
 * @param seconds - Duration in seconds
 * @returns Formatted string like "45:23" or "1:23:45"
 */
export function formatTimestamp(seconds: number): string {
  if (!seconds || seconds <= 0) return "0:00";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const paddedMinutes = hours > 0 ? String(minutes).padStart(2, "0") : String(minutes);
  const paddedSeconds = String(secs).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }
  return `${paddedMinutes}:${paddedSeconds}`;
}

/**
 * Parse timestamp string to seconds
 * @param timeStr - Timestamp like "MM:SS" or "HH:MM:SS"
 * @returns Number of seconds
 */
export function parseTimestamp(timeStr: string): number {
  if (!timeStr) return 0;

  const parts = timeStr.split(":").map(Number);

  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  return 0;
}

/**
 * Format a date string to a readable format
 * @param dateStr - ISO date string
 * @returns Formatted date like "May 15, 2025"
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Get status badge CSS class based on conservation status
 */
export function getStatusClass(status: string): string {
  const statusLower = status.toLowerCase();

  if (statusLower.includes("endangered")) {
    return "status-endangered";
  }
  if (statusLower.includes("threatened")) {
    return "status-threatened";
  }
  if (statusLower.includes("vulnerable") || statusLower.includes("concern")) {
    return "status-special-concern";
  }

  return "bg-gray-100 text-gray-800";
}

/**
 * Truncate text to a maximum length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Truncate text at the end of a sentence within a character limit
 * Falls back to word boundary if no sentence ending found
 */
export function truncateAtSentence(
  text: string,
  maxLength: number
): { text: string; isTruncated: boolean } {
  if (!text || text.length <= maxLength) {
    return { text, isTruncated: false };
  }

  // Find sentence endings (. ! ?) within the limit
  const sentenceEndings = /[.!?]/g;
  let lastSentenceEnd = -1;
  let match;

  while ((match = sentenceEndings.exec(text)) !== null) {
    if (match.index < maxLength) {
      lastSentenceEnd = match.index;
    } else {
      break;
    }
  }

  // If we found a sentence ending, use it
  if (lastSentenceEnd > 0) {
    return {
      text: text.slice(0, lastSentenceEnd + 1).trim(),
      isTruncated: true,
    };
  }

  // Fallback: truncate at word boundary
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return {
    text: (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + "...",
    isTruncated: true,
  };
}
