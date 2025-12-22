import Image from "next/image";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui";
import type { Species } from "@/lib/types";

interface SpeciesCardProps {
  species: Species;
  episodeNumber: number;
  className?: string;
}

export function SpeciesCard({
  species,
  episodeNumber,
  className,
}: SpeciesCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border-2 border-[var(--sage)] shadow-lg overflow-hidden max-w-sm",
        className
      )}
    >
      {/* Species Image */}
      <div className="relative aspect-square bg-[var(--sage-light)]">
        {species.image ? (
          <Image
            src={`/images/species/${species.image}`}
            alt={species.imageAlt || species.commonName}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 400px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[var(--olive)]">No image</span>
          </div>
        )}

        {/* Status badge */}
        {species.status && species.status !== "Unknown" && (
          <div className="absolute top-3 right-3">
            <StatusBadge status={species.status} />
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Species Names */}
        <h3 className="text-xl font-bold text-black">{species.commonName}</h3>
        {species.scientificName && (
          <p className="scientific-name text-sm mt-1">{species.scientificName}</p>
        )}

        {/* Stats Grid */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          {species.weight && (
            <div>
              <span className="block text-xs text-gray-500 uppercase tracking-wide font-mono">
                Weight
              </span>
              <p className="text-black">{species.weight}</p>
            </div>
          )}
          {species.length && (
            <div>
              <span className="block text-xs text-gray-500 uppercase tracking-wide font-mono">
                Length
              </span>
              <p className="text-black">{species.length}</p>
            </div>
          )}
          {species.diet && (
            <div className="col-span-2">
              <span className="block text-xs text-gray-500 uppercase tracking-wide font-mono">
                Diet
              </span>
              <p className="text-black">{species.diet}</p>
            </div>
          )}
          {species.habitat && (
            <div className="col-span-2">
              <span className="block text-xs text-gray-500 uppercase tracking-wide font-mono">
                Habitat
              </span>
              <p className="text-black">{species.habitat}</p>
            </div>
          )}
        </div>

        {/* Special Power */}
        {species.specialPower && (
          <div className="mt-4 p-3 bg-[var(--sage-light)] rounded-lg border border-[var(--sage)]">
            <span className="block text-xs text-[var(--olive)] uppercase tracking-wide font-mono font-semibold">
              Special Power
            </span>
            <p className="text-sm text-black mt-1 font-medium">
              {species.specialPower}
            </p>
          </div>
        )}

        {/* Episode Number */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <span className="text-xs text-gray-500 font-mono">
            Episode {episodeNumber}
          </span>
        </div>
      </div>
    </div>
  );
}
