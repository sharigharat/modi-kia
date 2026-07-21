import Link from "next/link";
import Logo from "./Logo";
import { popularCars, nav, company } from "@/lib/data";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  YouTube,
} from "./icons";

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/about" },
  { label: "Find a car", href: "/cars" },
  { label: "Service", href: "/locate-service-centre" },
  { label: "Locate Us", href: "/locate-us" },
  { label: "Book a Test Drive", href: "/book-a-test-drive" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
];

const serviceLinks = [
  { label: "Book a Service", href: "/locate-service-centre#book-service" },
  { label: "Service Packages", href: "/locate-service-centre" },
  { label: "Genuine Parts", href: "/locate-service-centre" },
  { label: "Roadside Assistance", href: "/locate-service-centre" },
  { label: "Extended Warranty", href: "/locate-service-centre" },
];

const socials = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: YouTube, label: "YouTube" },
  { Icon: LinkedIn, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-deep">
      {/* Main footer grid */}
      <div className="container-px mx-auto max-w-[1400px] pb-10 pt-14">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-b border-white/10 pb-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.4fr]">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Logo dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Modi Kia is an authorised Kia dealership offering new car
              sales, servicing and genuine Kia parts in Bhiwandi & Dombivli.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`Follow Modi Kia on ${label}`}
                  className="grid h-9 w-9 place-items-center rounded border border-white/15 text-white/60 transition-all hover:border-white/40 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular cars */}
          <div>
            <h4 className="text-sm font-semibold text-white">Popular Cars</h4>
            <ul className="mt-4 space-y-3">
              {popularCars.map((c) => (
                <li key={c.name}>
                  <Link
                    href={`/cars/${c.slug}`}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    Kia {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service links */}
          <div>
            <h4 className="text-sm font-semibold text-white">Service</h4>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-sm font-semibold text-white">Contact Us</h4>
            <ul className="mt-4 space-y-4 text-sm text-white/60">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <span>
                  Modi Kia, Kalyan - Bhiwandi Rd, Near Mahanagar CNG Station,
                  Sapna Industrial Estate, Pimpalghar, Bhiwandi, Maharashtra
                  421302
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <a
                  href={`tel:${nav.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {nav.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <a
                  href={`mailto:${company.email}`}
                  className="transition-colors hover:text-white"
                >
                  {company.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <span>{company.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© 2026 Modi Kia. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="transition-colors hover:text-white">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
