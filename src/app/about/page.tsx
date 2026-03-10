import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1
              className="text-3xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              About us
            </h1>

            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              The Muslim Corpers' Association of Nigeria (MCAN) is a dynamic, faith-based
              organization for Muslim graduates serving under the National Youth Service Corps
              (NYSC). We are committed to promoting Islamic values, service to humanity, and
              community development across Nigeria. Through various programs, outreach
              activities, and projects, MCAN members strive to positively impact their host
              communities while upholding the teachings of Islam.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              The Ekiti State Chapter of MCAN has been at the forefront of these efforts,
              supporting corps members with spiritual guidance, welfare assistance, and a sense
              of community throughout their service year. We believe in Rooted in faith,
              driven by purpose — Serving Islam through the humanity.
            </p>

            <div className="mb-8">
              <h2
                className="text-[#1B6B3A] font-semibold text-base mb-2"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Our mission
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                To foster unity, promote Islamic values and community development among Muslim
                corps members serving in Ekiti State.
              </p>
            </div>

            <div>
              <h2
                className="text-[#1B6B3A] font-semibold text-base mb-2"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Our Vision
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                A Nigeria where Muslim corps members serve as exemplary ambassadors of Islam,
                contributing meaningfully to national development.
              </p>
            </div>
          </div>

          {/* Logo / Emblem */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-48 h-48">
              <Image
                src="/images/mcan-logo.webp"
                alt="MCAN Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Executives Section */}
        <div className="mt-16">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
            2025/26
          </p>
          <h2
            className="text-2xl font-bold text-gray-900 mb-8"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            2025/26 MCAN Ekiti State Executives
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-full aspect-square bg-gray-100 rounded-xl mb-3 border-2 border-dashed border-gray-200 flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="#9ca3af" strokeWidth="1.5" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500">Executive Name</p>
                <p className="text-xs font-semibold text-gray-700">Position, Title</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
