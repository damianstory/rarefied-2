"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { TAG_CATEGORIES, formatTag } from "@/lib/tags";
import type { Episode } from "@/lib/types";

interface CategoryFilterProps {
  episodes: Episode[];
  className?: string;
}

export function CategoryFilter({ episodes, className }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");
  const [isExpanded, setIsExpanded] = useState(false);

  // Get tags that actually exist in episodes
  const availableTags = new Set<string>();
  episodes.forEach((ep) => {
    ep.tags.forEach((tag) => availableTags.add(tag.toLowerCase()));
  });

  // Filter categories to only show tags that exist in episodes
  const categoriesWithTags = TAG_CATEGORIES.map((category) => ({
    ...category,
    tags: category.tags.filter((tag) => availableTags.has(tag.toLowerCase())),
  })).filter((category) => category.tags.length > 0);

  const handleTagClick = useCallback(
    (tag: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (tag === null || tag === activeTag) {
        params.delete("tag");
      } else {
        params.set("tag", tag);
      }
      router.push(`/episodes?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, activeTag]
  );

  return (
    <div className={cn("w-full max-w-full", className)}>
      {/* Mobile: Collapsible header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full lg:hidden text-lg font-semibold text-black mb-4 hover:text-[var(--sky)] transition-colors"
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
        <span>Filter Episodes</span>
        {activeTag && (
          <span className="text-sm font-normal text-gray-500">
            ({formatTag(activeTag)})
          </span>
        )}
      </button>

      {/* Desktop: Static title */}
      <h2 className="hidden lg:block text-lg font-semibold text-black mb-4">
        Filter Episodes
      </h2>

      {/* Filter content: visible on desktop OR when expanded on mobile */}
      <div className={cn("space-y-4", isExpanded ? "block" : "hidden lg:block")}>
        {/* Clear filter button */}
        {activeTag && (
          <button
            onClick={() => handleTagClick(null)}
            className="text-sm text-[var(--sky)] hover:text-[var(--olive)] transition-colors"
          >
            &larr; Clear filter
          </button>
        )}

        {/* Category sections */}
        {categoriesWithTags.map((category) => (
          <div key={category.id}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {category.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.tags.map((tag) => {
                const isActive = activeTag === tag;
                const count = episodes.filter((ep) =>
                  ep.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
                ).length;

                return (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-full transition-colors",
                      isActive
                        ? "bg-[var(--olive)] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-[var(--sage-light)]"
                    )}
                  >
                    {formatTag(tag)}
                    <span className="ml-1.5 text-xs opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
