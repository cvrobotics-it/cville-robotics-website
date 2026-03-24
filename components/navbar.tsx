"use client";

import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type NavItem = { label: string; href: string };
type NavGroup = { label: string; items: NavItem[] };

const primaryLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Newsletter", href: "/newsletter" },
];

const programsLinks: NavItem[] = [
  { label: "FTC Teams", href: "/ftc" },
  { label: "Join Robotics", href: "/join" },
];

const outreachLinks: NavItem[] = [
  { label: "Outreach Data", href: "/outreach" },
  { label: "Past Outreach", href: "/outreach/past" },
  { label: "Calendar", href: "/outreach/calendar" },
];

const secondaryLinks: NavItem[] = [
  { label: "Contact", href: "/contact" },
  { label: "Sponsors", href: "/sponsors" },
];

const mobileMenuGroups: (NavItem | NavGroup)[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Newsletter", href: "/newsletter" },
  { 
    label: "Programs", 
    items: programsLinks
  },
  { 
    label: "Outreach", 
    items: outreachLinks
  },
  { label: "Calendar", href: "/outreach/calendar" },
  { label: "Contact", href: "/contact" },
  { label: "Sponsors", href: "/sponsors" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("overflow-hidden");
      closeBtnRef.current?.focus();
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [mobileOpen]);

  // Close mobile menu and dropdowns when route changes
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (openDropdown) {
        const dropdownEl = dropdownRefs.current[openDropdown];
        if (dropdownEl && !dropdownEl.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const isGroupActive = (items: NavItem[]) =>
    items.some((item) => isActive(item.href));

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="sticky top-0 z-[60] bg-base-100/95 backdrop-blur-md border-b border-base-300 shadow-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 btn btn-sm z-[70]"
      >
        Skip to content
      </a>
      <div className="container mx-auto px-4">
        <div className="navbar px-0">
          <div className="flex-1">
            <Link
              href="/"
              prefetch={false}
              aria-label="Go to homepage"
              className="flex items-center gap-2"
            >
              <Image
                src="/logo.webp"
                alt="Centreville Robotics Logo"
                width={180}
                height={40}
                priority
                sizes="(max-width: 1279px) 50vw, 180px"
                className="h-11 w-auto xl:h-12"
              />
            </Link>
          </div>

          <nav className="hidden xl:flex items-center gap-1.5">
            <ul className="menu menu-horizontal px-0 gap-0.5">
              {primaryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className={isActive(item.href) ? "active" : ""}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
              
            {/* Programs Dropdown */}
            <div className="dropdown dropdown-hover" ref={(el) => {
              dropdownRefs.current.programs = el;
            }}>
              <button
                type="button"
                onClick={() => toggleDropdown("programs")}
                className={`btn btn-ghost rounded-btn gap-1 ${isGroupActive(programsLinks) ? "btn-active" : ""}`}
                aria-label="Programs menu"
                aria-expanded={openDropdown === "programs"}
                tabIndex={0}
              >
                Programs
                <ChevronDown className="w-4 h-4" />
              </button>
              {openDropdown === "programs" && (
                <ul 
                  className="menu dropdown-content bg-base-100 rounded-box z-[100] w-52 p-2 shadow-xl border border-base-300 mt-1 opacity-100 transition-opacity duration-200"
                >
                  {programsLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        prefetch={false}
                        className={isActive(item.href) ? "active" : ""}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Outreach Dropdown */}
            <div className="dropdown dropdown-hover" ref={(el) => {
              dropdownRefs.current.outreach = el;
            }}>
              <button
                type="button"
                onClick={() => toggleDropdown("outreach")}
                className={`btn btn-ghost rounded-btn gap-1 ${isGroupActive(outreachLinks) ? "btn-active" : ""}`}
                aria-label="Outreach menu"
                aria-expanded={openDropdown === "outreach"}
                tabIndex={0}
              >
                Outreach
                <ChevronDown className="w-4 h-4" />
              </button>
              {openDropdown === "outreach" && (
                <ul 
                  className="menu dropdown-content bg-base-100 rounded-box z-[100] w-52 p-2 shadow-xl border border-base-300 mt-1 opacity-100 transition-opacity duration-200"
                >
                  {outreachLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        prefetch={false}
                        className={isActive(item.href) ? "active" : ""}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link
              href="/outreach/calendar"
              prefetch={false}
              className={`btn btn-ghost btn-square ${isActive("/outreach/calendar") ? "btn-active" : ""}`}
              aria-label="Calendar"
              title="Calendar"
            >
              <CalendarDays className="w-5 h-5" />
            </Link>

            <ul className="menu menu-horizontal px-0 gap-0.5">
              {secondaryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className={isActive(item.href) ? "active" : ""}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center gap-2 ml-2">
              <Link href="/join" prefetch={false} className="btn btn-primary btn-sm">
                Join
              </Link>
              <Link
                href="https://www.paypal.com/ncp/payment/SCU42N7GPMVRL"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                Donate
              </Link>
            </div>
          </nav>

          <div className="xl:hidden">
            <button
              type="button"
              className="btn btn-ghost btn-square"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <title>Menu</title>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] bg-base-100"
          onKeyDown={(e) => {
            if (e.key === "Escape") setMobileOpen(false);
          }}
        >
          <div className="container mx-auto px-4 py-4 flex items-center justify-between border-b border-base-300">
            <span className="font-semibold text-lg">Menu</span>
            <button
              ref={closeBtnRef}
              type="button"
              className="btn btn-ghost btn-square"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <title>Close</title>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <nav className="container mx-auto px-4 py-4 overflow-y-auto max-h-[calc(100vh-80px)]">
            <ul className="menu menu-lg bg-base-100">
              {mobileMenuGroups.map((item) => {
                if ("items" in item) {
                  return (
                    <li key={item.label}>
                      <details>
                        <summary className="font-semibold">{item.label}</summary>
                        <ul>
                          {item.items.map((subItem) => (
                            <li key={subItem.href}>
                              <Link
                                href={subItem.href}
                                prefetch={false}
                                className={isActive(subItem.href) ? "active" : ""}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      prefetch={false}
                      className={isActive(item.href) ? "active" : ""}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-4">
                <Link href="/join" prefetch={false} className="btn btn-primary">
                  Join Robotics
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  href="https://www.paypal.com/ncp/payment/SCU42N7GPMVRL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
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
