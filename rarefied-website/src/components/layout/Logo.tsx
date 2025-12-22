import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className, width = 48, height = 48 }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Image
        src="/images/logo/logo.jpg"
        alt="Rarefied Podcast"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
      <span className="font-heading text-lg tracking-wide">
        <span className="text-xl">R</span>
        <span className="text-base">AREFIED</span>
      </span>
    </Link>
  );
}
