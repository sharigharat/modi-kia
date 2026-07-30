/* Wordmark lockup for Modi Kia, using the official Kia logo mark
   alongside the dealership name and tagline. */
import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Link href="/#home" className={`group flex items-center gap-1.5 sm:gap-2 shrink min-w-0 ${className}`}>
      <Image
        src={dark ? "/brand/kia-logo-white.png" : "/brand/kia-logo-black.png"}
        alt="Kia"
        title="Kia"
        width={561}
        height={131}
        priority
        className="h-4.5 sm:h-6 w-auto shrink-0"
      />
      <span className="leading-none flex flex-col gap-0.5 overflow-hidden min-w-0 shrink">
        <span className="flex flex-col min-w-0">
          <span className={`block font-sans text-[13px] sm:text-sm font-bold tracking-normal truncate ${dark ? "text-white" : "text-black"}`}>
            Modi Kia
          </span>
        </span>
        <span className={`block text-[7.5px] sm:text-[9px] font-medium uppercase tracking-[0.12em] sm:tracking-[0.28em] truncate ${dark ? "text-white/60" : "text-muted"}`}>
          Movement that Inspires
        </span>
      </span>
    </Link>
  );
}
