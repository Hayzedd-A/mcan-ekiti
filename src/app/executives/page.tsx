export default function ExecutivesPage() {
  const executives = [
    { name: "Executive Name", position: "President", title: "Br." },
    { name: "Executive Name", position: "Vice President", title: "Br." },
    { name: "Executive Name", position: "General Secretary", title: "Sis." },
    { name: "Executive Name", position: "Financial Secretary", title: "Br." },
    { name: "Executive Name", position: "Treasurer", title: "Br." },
    { name: "Executive Name", position: "Welfare Officer", title: "Sis." },
    { name: "Executive Name", position: "Dawah Officer", title: "Br." },
    { name: "Executive Name", position: "Sports Officer", title: "Br." },
    { name: "Executive Name", position: "Social Secretary", title: "Sis." },
    { name: "Executive Name", position: "PRO", title: "Br." },
    { name: "Executive Name", position: "Exco Member", title: "Br." },
    { name: "Executive Name", position: "Exco Member", title: "Sis." },
    { name: "Executive Name", position: "Exco Member", title: "Br." },
    { name: "Executive Name", position: "Exco Member", title: "Sis." },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">2025/26</p>
        <h1
          className="text-3xl font-bold text-gray-900 mb-10"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          2025/26 MCAN Ekiti State Executives
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {executives.map((exec, i) => (
            <div key={i} className="text-center">
              <div className="w-full aspect-square bg-gray-100 rounded-xl mb-3 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="#9ca3af" strokeWidth="1.5" />
                  <path
                    d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                    stroke="#9ca3af"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-xs text-gray-500">
                {exec.name}, {exec.title}
              </p>
              <p className="text-xs font-semibold text-gray-700">{exec.position}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
