import Image from "next/image";

export default function DonatePage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            {/* Heading + logo side by side on mobile */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1
                className="text-4xl sm:text-5xl font-bold text-gray-900"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Support the cause of Allah
              </h1>
              {/* Logo shown inline on mobile, hidden on lg where the right column shows it */}
              <div className="flex-shrink-0 lg:hidden">
                <Image
                  src="/images/mcan-logo.webp"
                  alt="MCAN Logo"
                  width={64}
                  height={64}
                  className="rounded-full object-contain"
                />
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-md">
              Your donation helps us continue our work and serve the community effectively.
              Every contribution, no matter the amount, makes a meaningful difference.
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-gray-500 text-sm mb-1">Bank Name</p>
                <p
                  className="text-[#1B6B3A] text-xl font-bold"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  United Bank of Africa (UBA)
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm mb-1">Account Name</p>
                <p
                  className="text-[#1B6B3A] text-xl font-bold"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  000 000 000 00
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm mb-1">Account Name</p>
                <p
                  className="text-[#1B6B3A] text-xl font-bold"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  MCAN Ekiti State Branch
                </p>
              </div>
            </div>

            <p className="text-gray-500 text-sm mt-10 leading-relaxed italic">
              May Allah bless you for your generosity, increase you in goodness, and accept
              it as sadaqah jāriyah. Ameen.
            </p>
          </div>

          {/* Desktop only - large logo on the right */}
          <div className="hidden lg:flex justify-end">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64">
              <Image
                src="/images/mcan-logo.webp"
                alt="MCAN Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
