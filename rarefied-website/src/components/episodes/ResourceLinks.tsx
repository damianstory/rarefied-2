import { cn } from "@/lib/utils";
import type { Resource } from "@/lib/types";

interface ResourceLinksProps {
  resources: Resource[];
  className?: string;
}

export function ResourceLinks({ resources, className }: ResourceLinksProps) {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <div className={cn("", className)}>
      <h3 className="text-lg font-semibold text-black mb-4">Resources</h3>
      <ul className="space-y-2">
        {resources.map((resource, index) => (
          <li key={index}>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[var(--sky)] hover:text-[var(--sky-dark)] transition-colors"
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span className="text-sm">{resource.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
