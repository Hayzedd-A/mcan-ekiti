import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <div
        className="rounded-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B6B3A 0%, #2a8a4f 100%)" }}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 bg-white -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-1/2 w-48 h-48 rounded-full opacity-5 bg-white translate-y-1/3" />

        <div className="relative z-10 max-w-xl">
          <h1
            className="text-white font-bold text-4xl sm:text-5xl leading-tight mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Welcome to MCAN Ekiti State Chapter
          </h1>
          <p className="text-white/80 text-sm leading-relaxed max-w-md">
            MCAN has long united Muslim graduates serving under the National Youth Service
            Corps (NYSC), promoting Islamic values, service to humanity, and community
            development across Nigeria. Rooted in faith, driven by purpose. Serving Islam
            through the humanity.
          </p>
        </div>
      </div>
    </section>
  );
}
