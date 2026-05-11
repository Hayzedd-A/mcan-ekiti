"use client";

import { useEffect, useState } from "react";
import { IMember } from "@/models/Member";

export default function AdminMembersPage() {
  const [members, setMembers] = useState<IMember[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 20;

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      search: debouncedSearch,
      page: page.toString(),
      limit: limit.toString(),
    });

    fetch(`/api/members?${queryParams}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setMembers(d.data ?? []);
          setTotal(d.pagination?.total ?? 0);
          setTotalPages(d.pagination?.totalPages ?? 0);
        }
      })
      .finally(() => setLoading(false));
  }, [debouncedSearch, page]);

  return (
    <div className="pb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Members
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {total} total members{" "}
            {debouncedSearch && `matching "${debouncedSearch}"`}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, state code, LGA or PPA..."
          className="w-full max-w-md border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A]"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-gray-100 border-t-[#1B6B3A] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-sm">Loading members...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-400 text-sm">
              {debouncedSearch
                ? "No members match your search."
                : "No members registered yet."}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    {[
                      "Name",
                      "Email",
                      "Phone",
                      "State Code",
                      "PPA",
                      "LGA",
                      "Gender",
                      "Registered",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {members.map((m) => (
                    <tr
                      key={m._id}
                      className="hover:bg-gray-50/80 transition-colors group"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                        {m.fullName}
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        {m.email}
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        {m.phone}
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap font-mono text-xs">
                        {m.stateCode}
                      </td>
                      <td
                        className="px-4 py-3 text-gray-500 max-w-[180px] truncate"
                        title={m.ppa}
                      >
                        {m.ppa}
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        {m.lga}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${m.gender === "male" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-pink-50 text-pink-600 border border-pink-100"}`}
                        >
                          {m.gender}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                        {new Date(m.registeredAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="px-4 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
                <div className="text-xs text-gray-500">
                  Showing{" "}
                  <span className="font-medium">{(page - 1) * limit + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(page * limit, total)}
                  </span>{" "}
                  of <span className="font-medium">{total}</span> results
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1 || loading}
                    className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    Previous
                  </button>
                  <div className="flex items-center gap-1">
                    {[...Array(totalPages)].map((_, i) => {
                      const p = i + 1;
                      // Logic to show limited page numbers if totalPages is large
                      if (totalPages > 7) {
                        if (
                          p !== 1 &&
                          p !== totalPages &&
                          (p < page - 1 || p > page + 1)
                        ) {
                          if (p === page - 2 || p === page + 2)
                            return (
                              <span key={p} className="px-1 text-gray-400">
                                ...
                              </span>
                            );
                          return null;
                        }
                      }
                      return (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-medium transition-all ${
                            page === p
                              ? "bg-[#1B6B3A] text-white shadow-md shadow-[#1B6B3A]/20"
                              : "text-gray-600 hover:bg-gray-100 border border-transparent"
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages || loading}
                    className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
