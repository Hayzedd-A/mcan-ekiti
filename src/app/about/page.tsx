import Image from "next/image";

const executives = Array.from({ length: 10 }).map((_, i) => ({
  name: "Abdullah Abdurrahmaan",
  role: "Ameer",
  bg: [
    "bg-red-500",
    "bg-green-600",
    "bg-teal-500",
    "bg-gray-200",
    "bg-purple-500",
    "bg-yellow-500",
  ][i % 6],
}));

const patrons = Array.from({ length: 6 });

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* 🔹 TOP TABS (NEW) */}
      <div className="border-b bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center gap-8 text-sm font-medium">
          
          <a href="#about" className="py-4 border-b-2 border-green-600 text-green-700">
            About us
          </a>

          <a href="#executives" className="py-4 text-gray-500 hover:text-green-600">
            Our Executives
          </a>

          <a href="#patrons" className="py-4 text-gray-500 hover:text-green-600">
            Our Patrons
          </a>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ABOUT SECTION */}
        <div id="about" className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* TEXT */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              About us
            </h1>

            {/* MOBILE TEXT + LOGO */}
            <div className="flex items-start gap-4 lg:block">
              <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                MCAN is the acronym for the Muslim Corpers' Association of Nigeria,
                a national body that has fostered a strong network of Muslim youth
                corps members across Nigeria for over three decades.
              </p>

              {/* Mobile logo */}
              <div className="relative w-20 h-20 shrink-0 lg:hidden">
                <Image
                  src="/images/image.png"
                  alt="MCAN Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              The association was born out of the need for Muslim corps members
              deployed through the NYSC scheme to have a unified platform for
              spiritual growth, welfare coordination, and community service.
            </p>

            {/* Mission */}
            <div className="mb-6">
              <h2 className="text-green-700 font-semibold mb-1">
                Our mission
              </h2>
              <p className="text-gray-600 text-sm">
                Adherence to the pristine teachings of Islam in all affairs of life.
              </p>
            </div>

            {/* Vision */}
            <div>
              <h2 className="text-green-700 font-semibold mb-1">
                Our vision
              </h2>
              <p className="text-gray-600 text-sm">
                Towards achieving an ideal, morally bounded Islamic society.
              </p>
            </div>
          </div>

          {/* DESKTOP LOGO */}
          <div className="hidden lg:flex justify-end">
            <div className="relative w-40 h-40">
              <Image
                src="/images/image.png"
                alt="MCAN Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* PATRONS */}
        <div id="patrons" className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            MCAN Ekiti State Patrons
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
            {patrons.map((_, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-4 border hover:shadow transition"
              >
                <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden">
                  <Image
                    src="/images/group.png"
                    alt="Patron"
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="text-sm font-semibold text-gray-800">
                  Abdullah Abdurrahmaan
                </p>
                <p className="text-xs text-gray-500">
                  Patron
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* EXECUTIVES */}
        <div id="executives" className="mt-20">
          <p className="text-green-600 text-xs uppercase tracking-widest mb-1">
            Meet the Team
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            2025/26 MCAN Ekiti State Executives
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {executives.map((exec, i) => (
              <div key={i} className="text-center">

                <div
                  className={`w-full aspect-square rounded-xl overflow-hidden ${exec.bg}`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/group.png"
                      alt={exec.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="mt-2 bg-white shadow rounded-full px-3 py-1 inline-block">
                  <p className="text-xs font-semibold text-gray-800">
                    {exec.name}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {exec.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
