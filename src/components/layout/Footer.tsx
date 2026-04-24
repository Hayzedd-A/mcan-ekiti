import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";

const footerLinks = {
  col1: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "News", href: "/news" },
  ],
  col2: [
    { label: "Projects", href: "/projects" },
    { label: "Executives", href: "/executives" },
  ],
  col3: [
    { label: "Lodges", href: "/lodges" },
    { label: "Contact", href: "/contact" },
    { label: "Events", href: "/events" },
  ],
};

const developers = [
  { name: "Adebayo Azeez", role: "Backend Developer" },
  { name: "Suleiman AbdulBasit", role: "Frontend Developer" },
  { name: "Akorede Oyafemi", role: "UI/UX Designer" },
  { name: "Akanni Jubril", role: "Content Writer" },
  { name: "Sodiq Adewole", role: "Project Manager" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Logo Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Image
              src="/images/mcan-logo.webp"
              alt="MCAN Logo"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <span
              className="font-bold text-lg text-gray-900"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              MCAN EKITI
            </span>
          </div>
        </div>

        {/* Desktop Footer Links */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between border-t border-gray-100 pt-6">
            <div className="flex flex-wrap gap-6">
              {[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: "Lodges", href: "/lodges" },
                { label: "Contact", href: "/contact" },
                { label: "About", href: "/about" },
                { label: "Executives", href: "/executives" },
                { label: "Events", href: "/events" },
                { label: "News", href: "/news" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-[#1B6B3A] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/register"
                className="border-2 border-[#1B6B3A] text-[#1B6B3A] px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#e8f5ee] transition-colors"
              >
                Register
              </Link>
              <Link
                href="/donate"
                className="flex items-center gap-2 bg-[#1B6B3A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#154a2a] transition-colors"
              >
                Donate
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Footer Links */}
        <div className="md:hidden">
          <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6 mb-6">
            {Object.values(footerLinks).map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-3">
                {col.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#1B6B3A] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Link
              href="/register"
              className="flex-1 text-center border-2 border-[#1B6B3A] text-[#1B6B3A] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#e8f5ee] transition-colors"
            >
              Register
            </Link>
            <Link
              href="/donate"
              className="flex-1 flex items-center justify-center gap-2 bg-[#1B6B3A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#154a2a] transition-colors"
            >
              Donate
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Social Links & Developers Section */}
      <div className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Connect With Us
              </h3>
              <div className="flex items-center gap-6">
                <Link
                  href="https://www.instagram.com/mcanekitistate?igsh=MWMwZHc0ODZjZTdsdA=="
                  target="_blank"
                  className="group p-2 rounded-full bg-white shadow-sm border border-gray-100 hover:border-[#E4405F] hover:shadow-md transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram
                    size={20}
                    className="text-gray-600 group-hover:text-[#E4405F]"
                  />
                </Link>
                <Link
                  href="https://www.facebook.com/share/1HAzf18L55/"
                  target="_blank"
                  className="group p-2 rounded-full bg-white shadow-sm border border-gray-100 hover:border-[#1877F2] hover:shadow-md transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook
                    size={20}
                    className="text-gray-600 group-hover:text-[#1877F2]"
                  />
                </Link>
                <Link
                  href="https://tiktok.com/@mcanekitistateado"
                  target="_blank"
                  className="group p-2 rounded-full bg-white shadow-sm border border-gray-100 hover:border-black hover:shadow-md transition-all duration-300"
                  aria-label="TikTok"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-600 group-hover:text-black"
                  >
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                Crafted by
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-1">
                {developers.map((dev, index) => (
                  <span
                    key={index}
                    className="text-sm font-semibold text-gray-700 hover:text-[#1B6B3A] cursor-default transition-colors"
                  >
                    {dev.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>
              © {new Date().getFullYear()} MCAN Ekiti State. All rights
              reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-gray-900 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-gray-900 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
