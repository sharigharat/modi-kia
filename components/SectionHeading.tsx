import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  action?: ReactNode;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  action,
}: Props) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-6 ${
        centered
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <Reveal className={centered ? "max-w-2xl" : "max-w-xl"}>
        {eyebrow && (
          <span className="eyebrow mb-3 block">{eyebrow}</span>
        )}
        <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-text sm:text-3xl lg:text-[2.25rem]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-base text-muted">{subtitle}</p>
        )}
      </Reveal>
      {action && <Reveal delay={100}>{action}</Reveal>}
    </div>
  );
}
