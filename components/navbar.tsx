"use client";

import Link from "next/link";
import Image from "next/image";
import { CalendarIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type NavItem = { label: string; href: string };

const primaryLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FTC Teams", href: "/ftc" },
  { label: "Gallery", href: "/gallery" },
];

const outreachLinks: NavItem[] = [
  { label: "Outreach Data", href: "/outreach" },
  { label: "Past Outreach", href: "/outreach/past" },
  { label: "Calendar", href: "/outreach/calendar" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
      closeBtnRef.current?.focus();
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur border-b border-base-300">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 btn btn-sm"
      >
        Skip to content
      </a>
      <div className="container mx-auto px-4">
        <div className="navbar px-0">
          <div className="flex-1">
            <Link
              href="/"
              aria-label="Go to homepage"
              className="flex items-center gap-2"
            >
              <Image
                src="/logo.webp"
                alt="Centreville Robotics Logo"
                width={180}
                height={40}
                priority
                sizes="(max-width: 1024px) 40vw, 180px"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-2">
            <ul className="menu menu-horizontal px-0">
              {primaryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={isActive(item.href) ? "active" : ""}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <details className="dropdown dropdown-end">
                  <summary
                    className={
                      pathname?.startsWith("/outreach") ? "active" : ""
                    }
                  >
                    Outreach
                  </summary>
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-56 p-2 shadow mt-2">
                    {outreachLinks.map((o) => (
                      <li key={o.href}>
                        <Link href={o.href}>{o.label}</Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
              <li>
                <Link
                  href="/outreach/calendar"
                  aria-label="Calendar"
                  title="Calendar"
                >
                  <CalendarIcon className="w-5 h-5" />
                </Link>
              </li>
            </ul>
            <Link href="/join" className="btn btn-primary ml-2">
              Join Robotics
            </Link>
            <Link
              href="https://www.paypal.com/ncp/payment/SCU42N7GPMVRL"
              className="btn btn-secondary ml-2"
            >
              Donate Now
            </Link>
          </nav>

          <div className="lg:hidden">
            <button
              type="button"
              className="btn btn-ghost"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              {/* Hamburger icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] bg-base-100"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          <div className="container mx-auto px-4 py-4 flex items-center justify-between border-b border-base-300">
            <span className="font-semibold">Menu</span>
            <button
              ref={closeBtnRef}
              type="button"
              className="btn btn-ghost"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              {/* X icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <nav className="container mx-auto px-4 py-4">
            <ul className="menu menu-lg bg-base-100">
              {primaryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={isActive(item.href) ? "active" : ""}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="menu-title">Outreach</li>
              {outreachLinks.map((o) => (
                <li key={o.href}>
                  <Link href={o.href}>{o.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/join" className="btn btn-primary mt-2">
                  Join Robotics
                </Link>
              </li>
              <li>
                <Link href="" className="btn btn-secondary mt-2">
                  Donate Now
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
