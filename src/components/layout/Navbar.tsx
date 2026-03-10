"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "Lodges", href: "/lodges" },
  { label: "News", href: "/news" },
  { label: "Executives", href: "/executives" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
];

const desktopLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "Lodges", href: "/lodges" },
  { label: "News", href: "/news" },
];

const moreLinks = [
  { label: "Executives", href: "/executives" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
];

// Animated hamburger — 3 bars morph into X
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="w-6 h-5 flex flex-col justify-between cursor-pointer">
      <span
        className="block h-0.5 bg-gray-800 rounded-full transition-all duration-300 origin-center"
        style={{
          transform: open ? "translateY(9px) rotate(45deg)" : "none",
        }}
      />
      <span
        className="block h-0.5 bg-gray-800 rounded-full transition-all duration-300"
        style={{ opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "scaleX(1)" }}
      />
      <span
        className="block h-0.5 bg-gray-800 rounded-full transition-all duration-300 origin-center"
        style={{
          transform: open ? "translateY(-9px) rotate(-45deg)" : "none",
        }}
      />
    </div>
  );
}

// Islamic star / geometric decoration
function GeometricDecor() {
  return (
    <svg
      viewBox="0 0 300 300"
      fill="none"
      className="absolute bottom-0 right-0 w-72 h-72 opacity-[0.06] pointer-events-none"
    >
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 150 + 130 * Math.cos(rad);
        const y = 150 + 130 * Math.sin(rad);
        return (
          <line key={angle} x1="150" y1="150" x2={x} y2={y} stroke="white" strokeWidth="1" />
        );
      })}
      <circle cx="150" cy="150" r="130" stroke="white" strokeWidth="1" />
      <circle cx="150" cy="150" r="90" stroke="white" strokeWidth="1" />
      <circle cx="150" cy="150" r="50" stroke="white" strokeWidth="1" />
      <polygon
        points="150,20 170,90 240,90 185,130 205,200 150,160 95,200 115,130 60,90 130,90"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Mobile: Hamburger */}
            <div className="flex md:hidden items-center">
              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1" aria-label="Toggle menu">
                <HamburgerIcon open={mobileOpen} />
              </button>
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0" onClick={() => setMobileOpen(false)}>
              <Image
                src="/images/mcan-logo.webp"
                alt="MCAN Logo"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
              <span className="font-bold text-base tracking-wide text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>
                MCAN EKITI
              </span>
            </Link>

            {/* Desktop: Donate */}
            <div className="hidden md:flex items-center">
              <Link href="/donate" className="flex items-center gap-2 bg-[#1B6B3A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#154a2a] transition-colors">
                Donate
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                </svg>
              </Link>
            </div>

            {/* Desktop: Nav links */}
            <div className="hidden md:flex items-center gap-1 mx-6">
              {desktopLinks.map((link) => (
                <Link key={link.href} href={link.href} className="px-3 py-2 text-sm text-gray-700 hover:text-[#1B6B3A] font-medium transition-colors rounded-md hover:bg-gray-50">
                  {link.label}
                </Link>
              ))}
              <div className="relative">
                <button onClick={() => setMoreOpen(!moreOpen)} className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 hover:text-[#1B6B3A] font-medium transition-colors rounded-md hover:bg-gray-50">
                  More
                  <ChevronDown size={14} className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
                </button>
                {moreOpen && (
                  <div className="absolute top-full right-0 mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 z-50">
                    {moreLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#e8f5ee] hover:text-[#1B6B3A] transition-colors" onClick={() => setMoreOpen(false)}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop: Register */}
            <div className="hidden md:flex items-center">
              <Link href="/register" className="border-2 border-[#1B6B3A] text-[#1B6B3A] px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#e8f5ee] transition-colors">
                Register
              </Link>
            </div>

            {/* Mobile: Donate */}
            <div className="flex md:hidden items-center">
              <Link href="/donate" className="flex items-center gap-1.5 bg-[#1B6B3A] text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
                Donate
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </nav>

      {/* ── FULL-SCREEN MOBILE OVERLAY MENU ── */}
      <div
        className="fixed inset-0 z-40 md:hidden pointer-events-none"
        style={{
          background: "#0f3d22",
          clipPath: mobileOpen ? "circle(200% at calc(100% - 36px) 32px)" : "circle(0% at calc(100% - 36px) 32px)",
          transition: "clip-path 0.55s cubic-bezier(0.77, 0, 0.175, 1)",
          pointerEvents: mobileOpen ? "all" : "none",
        }}
      >
        <GeometricDecor />

        {/* Top bar inside overlay */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
            <Image src="/images/mcan-logo.webp" alt="MCAN Logo" width={32} height={32} className="rounded-full object-cover brightness-110" />
            <span className="font-bold text-white text-sm tracking-wide" style={{ fontFamily: "Outfit, sans-serif" }}>MCAN EKITI</span>
          </Link>
          <button onClick={() => setMobileOpen(false)} className="p-1" aria-label="Close menu">
            <HamburgerIcon open={true} />
          </button>
        </div>

        {/* Nav Links — large, staggered */}
        <nav className="px-8 pt-8 pb-6 flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="group flex items-center gap-4 py-3.5 border-b border-white/10 last:border-0"
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateX(0)" : "translateX(-24px)",
                transition: `opacity 0.4s ease ${0.1 + i * 0.05}s, transform 0.4s ease ${0.1 + i * 0.05}s`,
              }}
            >
              <span
                className="text-white text-2xl font-bold tracking-tight group-hover:text-[#4ade80] transition-colors duration-200"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {link.label}
              </span>
              <span className="ml-auto text-white/20 group-hover:text-[#4ade80] group-hover:translate-x-1 transition-all duration-200">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div
          className="absolute bottom-0 left-0 right-0 px-8 py-8 border-t border-white/10"
          style={{
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.4s ease 0.55s, transform 0.4s ease 0.55s",
          }}
        >
          <div className="flex gap-3">
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center border-2 border-white/40 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:border-white hover:bg-white/10 transition-all"
            >
              Register
            </Link>
            <Link
              href="/donate"
              onClick={() => setMobileOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#4ade80] text-[#0f3d22] px-4 py-3 rounded-xl text-sm font-bold hover:bg-[#22c55e] transition-colors"
            >
              Donate Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
              </svg>
            </Link>
          </div>
          <p className="text-white/20 text-xs text-center mt-4" style={{ fontFamily: "Outfit, sans-serif" }}>
            Serving Islam Through the Nation
          </p>
        </div>
      </div>
    </>
  );
}
    