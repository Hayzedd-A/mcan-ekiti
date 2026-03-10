import Link from "next/link";
import Image from "next/image";

export default function DonationCTA() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <div
        className="relative rounded-2xl p-8 sm:p-10 overflow-hidden flex items-center justify-between gap-6"
        style={{ background: "linear-gradient(135deg, #1B6B3A 0%, #2a8a4f 100%)" }}
      >
        {/* Decorative background circle */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-8 -top-8 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -left-8 -bottom-8 w-48 h-48 rounded-full bg-white/5" />
        </div>

        <div className="relative z-10 flex-1">
          <h2
            className="text-white font-bold text-2xl sm:text-3xl leading-tight mb-2"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Our projects need more support from you
          </h2>
          <p className="text-white/70 text-sm mb-6">
            Contribute to the cause of Allah and earn abundant rewards
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="bg-white text-[#1B6B3A] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/donate"
              className="flex items-center gap-2 bg-[#154a2a] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#103d22] transition-colors border border-white/20"
            >
              Contribute Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Donation box image */}
        <div className="relative z-10 flex-shrink-0 hidden sm:block">
          <div className="w-40 h-40 sm:w-48 sm:h-48 relative">
            <Image
              src="/images/donations-box.png"
              alt="Donations Box"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
