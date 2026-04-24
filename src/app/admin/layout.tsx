"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FolderOpen,
  Calendar,
  Users,
  Building2,
  Newspaper,
  ImageIcon,
  UserCheck,
  Heart,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Settings as SettingsIcon,
} from "lucide-react";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/executives", label: "Executives", icon: Users },
  { href: "/admin/leadership", label: "Leadership", icon: ShieldCheck },
  { href: "/admin/lodges", label: "Lodges", icon: Building2 },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/members", label: "Members", icon: UserCheck },
  { href: "/admin/donation-account", label: "Donation Account", icon: Heart },
  { href: "/admin/contact-info", label: "Contact Info", icon: SettingsIcon },
];

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <Image
          src="/images/mcan-logo.webp"
          alt="MCAN"
          width={32}
          height={32}
          className="rounded-full"
        />
        <div>
          <p
            className="text-white font-bold text-sm"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            MCAN Ekiti
          </p>
          <p className="text-white/50 text-xs">Admin Portal</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto text-white/60 hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navLinks.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex md:flex-col md:w-60 flex-shrink-0"
        style={{
          background: "linear-gradient(180deg, #0f3d22 0%, #1B6B3A 100%)",
        }}
      >
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="absolute left-0 top-0 h-full w-60"
            style={{
              background: "linear-gradient(180deg, #0f3d22 0%, #1B6B3A 100%)",
            }}
          >
            <Sidebar onClose={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 h-14 flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} className="text-gray-700" />
          </button>
          <h1
            className="text-base font-semibold text-gray-800"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            MCAN Ekiti — Admin
          </h1>
          <Link
            href="/"
            target="_blank"
            className="ml-auto text-xs text-[#1B6B3A] font-medium hover:underline"
          >
            View Site ↗
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
