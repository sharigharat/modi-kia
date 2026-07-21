"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TestDriveWizard from "./TestDriveWizard";
import Logo from "./Logo";
import { nav } from "@/lib/data";
import { Phone, Menu, X } from "./icons";

/** Returns true when the given nav link points at the section the user is on. */
function isActive(pathname: string, href: string): boolean {
  const hrefPath = href.split("#")[0] || "/";
  if (hrefPath === "/") return pathname === "/";
  if (hrefPath === "/cars")
    return pathname === "/cars" || pathname.startsWith("/cars/");
  return pathname === hrefPath;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showTestDrive, setShowTestDrive] = useState(false);
  const pathname = usePathname();
  
  // Hide the global Book a Test Drive buttons on individual car pages
  const isIndividualCarPage = pathname.startsWith("/cars/") && pathname.length > 6;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (open || showTestDrive) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open, showTestDrive]);

  const navRef = useRef<HTMLUListElement>(null);
  
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, opacity: 0 });
  const [enableTransition, setEnableTransition] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    function updateIndicator() {
      if (!navRef.current) return;
      const activeItem = navRef.current.querySelector("li[data-active='true']") as HTMLElement;
      if (activeItem) {
        const newLeft = activeItem.offsetLeft + (activeItem.offsetWidth / 2) - 16;

        if (!hasMounted.current) {
          hasMounted.current = true;
          const prevLeft = sessionStorage.getItem("navIndicatorLeft");
          if (prevLeft !== null) {
            // Instantly snap to the previous tab's position without animation
            setIndicatorStyle({ left: parseFloat(prevLeft), opacity: 1 });
            
            // Allow the browser to paint the snapped position, then glide to the new tab
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setEnableTransition(true);
                setIndicatorStyle({ left: newLeft, opacity: 1 });
                sessionStorage.setItem("navIndicatorLeft", newLeft.toString());
              });
            });
          } else {
            // First ever visit, just snap to the current active tab
            setIndicatorStyle({ left: newLeft, opacity: 1 });
            sessionStorage.setItem("navIndicatorLeft", newLeft.toString());
          }
        } else {
          // Standard update (window resize, clicking a new tab, etc.)
          setEnableTransition(true);
          setIndicatorStyle({ left: newLeft, opacity: 1 });
          sessionStorage.setItem("navIndicatorLeft", newLeft.toString());
        }
      } else {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    }
    
    // A small delay ensures fonts/layout have painted before measuring
    const timeoutId = setTimeout(updateIndicator, 50);
    window.addEventListener("resize", updateIndicator);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_0_#e2e6ec,0_4px_16px_0_rgba(0,44,95,0.07)]" : "shadow-[0_1px_0_0_#e2e6ec]"
      }`}
    >
      {/* Main nav */}
      <nav className="container-px mx-auto flex h-[60px] max-w-[1400px] items-center justify-between">
        <Logo />

        {/* Desktop links */}
        <ul ref={navRef} className="hidden items-center gap-0.5 lg:flex relative">
          <span
            className={`absolute bottom-0 h-[2px] w-8 rounded-full bg-brand ease-out ${
              enableTransition ? "transition-all duration-300" : ""
            }`}
            style={{
              left: `${indicatorStyle.left}px`,
              opacity: indicatorStyle.opacity,
            }}
          />
          {nav.links.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <li key={l.href} data-active={active} className="relative flex flex-col items-center">
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative block px-4 py-2 text-sm font-medium transition-colors hover:text-brand ${
                    active ? "text-text" : "text-muted"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          {!isIndividualCarPage && (
            <button
              onClick={() => setShowTestDrive(true)}
              className="hidden rounded bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-light sm:inline-block"
            >
              Book a Test Drive
            </button>
          )}
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid h-9 w-9 place-items-center rounded border border-border bg-bg-2 text-text lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-1 border-l border-border bg-white p-6 shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <Logo />
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded border border-border bg-bg-2 text-text"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {nav.links.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`relative px-4 py-3 text-base font-medium transition-colors hover:bg-bg-2 hover:text-brand ${
                  active ? "bg-brand/5 text-brand" : "text-text"
                }`}
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-0 h-full w-1 bg-brand transition-opacity duration-300 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}

          {!isIndividualCarPage && (
            <button
              onClick={() => { setOpen(false); setShowTestDrive(true); }}
              className="mt-4 w-full rounded bg-brand px-5 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-light"
            >
              Book a Test Drive
            </button>
          )}
          <a
            href={`tel:${nav.phone.replace(/\s/g, "")}`}
            className="mt-2 flex items-center justify-center gap-2 rounded border border-border px-5 py-3.5 text-sm font-semibold text-brand"
          >
            <Phone className="h-4 w-4" /> {nav.phone}
          </a>
        </div>
      </div>

      {/* Test Drive Fullscreen Overlay */}
      {showTestDrive && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto text-left">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-white px-6 py-4 shadow-sm">
            <span className="font-display text-xl font-bold text-text">Book a Test Drive</span>
            <button
              onClick={() => setShowTestDrive(false)}
              className="text-sm font-semibold text-muted transition-colors hover:text-text"
            >
              Close
            </button>
          </div>
          <div className="py-10 lg:py-16">
            <div className="container-px mx-auto max-w-[1400px]">
              <TestDriveWizard onClose={() => setShowTestDrive(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
