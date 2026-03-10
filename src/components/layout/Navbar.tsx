"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

const navLinks = [
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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile hamburger BEFORE logo + Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gray-700 rounded-md hover:bg-gray-50 md:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Image
                src="/images/mcan-logo.webp"
                alt="MCAN Logo"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
              <span
                className="font-bold text-base tracking-wide text-gray-900"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                MCAN EKITI
              </span>
            </Link>
          </div>

          {/* Desktop Left: Donate Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/donate"
              className="flex items-center gap-2 bg-[#1B6B3A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#154a2a] transition-colors"
            >
              Donate
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>

          {/* Desktop Center: Nav Links */}
          <div className="hidden md:flex items-center gap-1 mx-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-700 hover:text-[#1B6B3A] font-medium transition-colors rounded-md hover:bg-gray-50"
              >
                {link.label}
              </Link>
            ))}
            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 hover:text-[#1B6B3A] font-medium transition-colors rounded-md hover:bg-gray-50"
              >
                More
                <ChevronDown
                  size={14}
                  className={`transition-transform ${moreOpen ? "rotate-180" : ""}`}
                />
              </button>
              {moreOpen && (
                <div className="absolute top-full right-0 mt-1 w-44 bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-50">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#e8f5ee] hover:text-[#1B6B3A] transition-colors"
                      onClick={() => setMoreOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Right: Register */}
          <div className="hidden md:flex items-center">
            <Link
              href="/register"
              className="border-2 border-[#1B6B3A] text-[#1B6B3A] px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#e8f5ee] transition-colors"
            >
              Register
            </Link>
          </div>

          {/* Mobile: Donate only (hamburger moved to left) */}
          <div className="flex md:hidden items-center">
            <Link
              href="/donate"
              className="flex items-center gap-1.5 bg-[#1B6B3A] text-white px-3 py-1.5 rounded-lg text-xs font-semibold"
            >
              Donate
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2.5 text-sm text-gray-700 hover:text-[#1B6B3A] hover:bg-[#e8f5ee] rounded-md font-medium transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {moreLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2.5 text-sm text-gray-700 hover:text-[#1B6B3A] hover:bg-[#e8f5ee] rounded-md font-medium transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <Link
              href="/register"
              className="block text-center border-2 border-[#1B6B3A] text-[#1B6B3A] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#e8f5ee] transition-colors mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
