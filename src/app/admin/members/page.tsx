"use client";

import { useEffect, useState } from "react";
import { IMember } from "@/models/Member";

export default function AdminMembersPage() {
  const [members, setMembers] = useState<IMember[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/members")
      .then(r => r.json())
      .then(d => setMembers(d.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = members.filter(m =>
    m.fullName.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.stateCode.toLowerCase().includes(search.toLowerCase()) ||
    m.lga.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>Members</h1>
          <p className="text-gray-500 text-sm mt-0.5">{members.length} registered members</p>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, state code or LGA..."
          className="w-full max-w-md border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A]"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center"><p className="text-gray-400 text-sm">Loading...</p></div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center"><p className="text-gray-400 text-sm">{search ? "No members match your search." : "No members registered yet."}</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Name", "Email", "Phone", "State Code", "PPA", "LGA", "Gender", "Registered"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(m => (
                  <tr key={m._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{m.fullName}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{m.email}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{m.phone}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{m.stateCode}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-[160px] truncate">{m.ppa}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{m.lga}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${m.gender === "male" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"}`}>
                        {m.gender === "male" ? "Male" : "Female"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(m.registeredAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
