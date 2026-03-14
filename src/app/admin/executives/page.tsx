"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { IExecutive } from "@/models/Executive";

type F = { name: string; position: string; title: string; year: string; order: string; };
const EMPTY: F = { name: "", position: "", title: "Br.", year: new Date().getFullYear() + "/" + String(new Date().getFullYear() + 1).slice(2), order: "0" };
const TITLES = ["Br.", "Sis.", "Dr.", "Engr.", "Prof."];

export default function AdminExecutivesPage() {
  const [execs, setExecs] = useState<IExecutive[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [activeYear, setActiveYear] = useState<string>("");
  const [filtered, setFiltered] = useState<IExecutive[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<IExecutive | null>(null);
  const [form, setForm] = useState<F>(EMPTY);
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    const r = await fetch("/api/executives"); const d = await r.json();
    setExecs(d.data ?? []); const ys: string[] = d.years ?? [];
    setYears(ys);
    if (!activeYear && ys.length) { setActiveYear(ys[0]); setFiltered((d.data ?? []).filter((e: IExecutive) => e.year === ys[0])); }
    else if (activeYear) setFiltered((d.data ?? []).filter((e: IExecutive) => e.year === activeYear));
  };
  useEffect(() => { load(); }, []);

  const switchYear = async (y: string) => {
    setActiveYear(y);
    const r = await fetch(`/api/executives?year=${encodeURIComponent(y)}`); const d = await r.json();
    setFiltered(d.data ?? []);
  };
  const openAdd = () => { setEditing(null); setForm({ ...EMPTY, year: activeYear || EMPTY.year }); setPhoto(null); setShowModal(true); };
  const openEdit = (e: IExecutive) => {
    setEditing(e); setForm({ name: e.name, position: e.position, title: e.title, year: e.year, order: String(e.order) });
    setPhoto(null); setShowModal(true);
  };
  const set = (k: keyof F) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: ev.target.value }));

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault(); setLoading(true); setError("");
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (photo) fd.append("photo", photo);
    try {
      const r = await fetch(editing ? `/api/executives/${editing._id}` : "/api/executives", { method: editing ? "PUT" : "POST", body: fd });
      const d = await r.json(); if (!r.ok) throw new Error(d.error);
      setShowModal(false); await load(); await switchYear(form.year);
    } catch (e: unknown) { setError(e instanceof Error ? e.message : "Error"); } finally { setLoading(false); }
  };
  const del = async (id: string, year: string) => {
    if (!confirm("Delete executive?")) return;
    await fetch(`/api/executives/${id}`, { method: "DELETE" });
    await load(); await switchYear(year);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>Executives</h1>
          <p className="text-gray-500 text-sm mt-0.5">{execs.length} total</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#1B6B3A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#154a2a]">
          <Plus size={16} /> Add Executive</button>
      </div>

      {years.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {years.map(y => (
            <button key={y} onClick={() => switchYear(y)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeYear === y ? "bg-[#1B6B3A] text-white" : "bg-gray-100 text-gray-600 hover:bg-[#e8f5ee] hover:text-[#1B6B3A]"}`}>{y}</button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? <div className="bg-white rounded-xl border p-12 text-center"><p className="text-gray-400 text-sm">No executives for this year.</p></div> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((ex) => (
            <div key={ex._id} className="bg-white rounded-xl border border-gray-100 overflow-hidden text-center p-4">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
                {ex.profilePic ? <Image src={ex.profilePic} alt={ex.name} fill className="object-cover" /> :
                  <div className="w-full h-full flex items-center justify-center"><svg width="36" height="36" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#9ca3af" strokeWidth="1.5" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" /></svg></div>}
              </div>
              <p className="text-xs text-gray-500 font-medium">{ex.name}, {ex.title}</p>
              <p className="text-xs text-gray-700 font-semibold">{ex.position}</p>
              <div className="flex gap-1 mt-3 justify-center">
                <button onClick={() => openEdit(ex)} className="flex items-center gap-1 text-xs border border-gray-200 px-2 py-1 rounded-lg hover:border-[#1B6B3A] hover:text-[#1B6B3A]"><Pencil size={10} /> Edit</button>
                <button onClick={() => del(ex._id, ex.year)} className="flex items-center gap-1 text-xs border border-red-200 text-red-500 px-2 py-1 rounded-lg hover:bg-red-50"><Trash2 size={10} /> Del</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>{editing ? "Edit" : "Add"} Executive</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}
              {([["Full Name", "name"], ["Position", "position"], ["Year (e.g. 2025/26)", "year"], ["Display Order", "order"]] as [string, keyof F][]).map(([label, name]) => (
                <div key={name}><label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input type={name === "order" ? "number" : "text"} value={form[name]} onChange={set(name)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A]" /></div>
              ))}
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <select value={form.title} onChange={set("title")} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A]">
                  {TITLES.map(t => <option key={t}>{t}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files?.[0] ?? null)} className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:border-0 file:bg-[#e8f5ee] file:text-[#1B6B3A] file:rounded-lg file:text-xs file:font-medium" /></div>
              <button type="submit" disabled={loading} className="w-full bg-[#1B6B3A] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#154a2a] disabled:opacity-60">{loading ? "Saving..." : editing ? "Update" : "Add Executive"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
