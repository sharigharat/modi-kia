/* Wordmark lockup for Modi Kia, using the official Kia logo mark
   alongside the dealership name and tagline. */
import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Link href="/#home" className={`group flex items-center gap-2.5 ${className}`}>
      <Image
        src={dark ? "/brand/kia-logo-white.png" : "/brand/kia-logo-black.png"}
        alt="Kia"
        width={561}
        height={131}
        priority
        className="h-6 w-auto shrink-0"
      />
      <span className="leading-none">
        <span className={`block font-display text-sm font-extrabold tracking-tight ${dark ? "text-white" : "text-brand"}`}>
          MODI KIA
        </span>
        <span className={`block text-[9px] font-medium uppercase tracking-[0.28em] ${dark ? "text-white/60" : "text-muted"}`}>
          Movement that Inspires
        </span>
      </span>
    </Link>
  );
}
