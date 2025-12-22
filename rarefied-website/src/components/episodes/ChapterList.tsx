"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Chapter } from "@/lib/types";

interface ChapterListProps {
  chapters: Chapter[];
  className?: string;
  onChapterClick?: (timeInSeconds: number) => void;
}

export function ChapterList({
  chapters,
  className,
  onChapterClick,
}: ChapterListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!chapters || chapters.length === 0) {
    return null;
  }

  return (
    <div className={cn("", className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-lg font-semibold text-black mb-4 hover:text-[var(--sky)] transition-colors"
      >
        <svg
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isExpanded && "rotate-90"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        Chapters
      </button>

      {isExpanded && (
        <div className="space-y-2">
          {chapters.map((chapter, index) => (
            <button
              key={index}
              onClick={() => onChapterClick?.(chapter.timeInSeconds)}
              className={cn(
                "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors",
                onChapterClick
                  ? "hover:bg-[var(--sage-light)] cursor-pointer"
                  : "cursor-default"
              )}
            >
              <span className="font-mono text-sm text-[var(--sky)] min-w-[50px]">
                {chapter.time}
              </span>
              <span className="text-sm text-gray-700">{chapter.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
