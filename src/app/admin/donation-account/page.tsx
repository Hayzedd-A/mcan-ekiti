"use client";

import { useEffect, useState } from "react";

interface Account { bankName: string; accountName: string; accountNumber: string; }

export default function AdminDonationAccountPage() {
  const [form, setForm] = useState<Account>({ bankName: "", accountName: "", accountNumber: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/donation-account")
      .then(r => r.json())
      .then(d => { if (d.data) setForm(d.data); })
      .finally(() => setFetching(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(""); setSaved(false);
    try {
      const r = await fetch("/api/donation-account", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await r.json(); if (!r.ok) throw new Error(d.error);
      setSaved(true); setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Error"); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>Donation Account</h1>
        <p className="text-gray-500 text-sm mt-0.5">These details are shown on the public Donate page</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        {fetching ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="animate-pulse h-10 bg-gray-100 rounded-lg" />)}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}
            {saved && <p className="text-sm text-[#1B6B3A] bg-[#e8f5ee] p-3 rounded-lg">✓ Account details saved successfully!</p>}

            {[
              { label: "Bank Name", name: "bankName", placeholder: "e.g. United Bank for Africa (UBA)" },
              { label: "Account Number", name: "accountNumber", placeholder: "e.g. 1234567890" },
              { label: "Account Name", name: "accountName", placeholder: "e.g. MCAN Ekiti State Branch" },
            ].map(({ label, name, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                <input
                  type="text"
                  value={form[name as keyof Account]}
                  onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A] transition-colors"
                />
              </div>
            ))}

            <button type="submit" disabled={loading} className="w-full bg-[#1B6B3A] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#154a2a] transition-colors disabled:opacity-60">
              {loading ? "Saving..." : "Save Account Details"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
