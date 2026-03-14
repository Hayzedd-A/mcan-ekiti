"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { ILodge } from "@/models/Lodge";

const STATUSES = ["Available", "Under Construction", "Full"] as const;
type F = { title: string; description: string; status: string; location: string; };
const EMPTY: F = { title: "", description: "", status: "Available", location: "" };
const STATUS_STYLES: Record<string, string> = { Available: "bg-green-100 text-[#1B6B3A]", "Under Construction": "bg-amber-100 text-amber-700", Full: "bg-red-100 text-red-600" };
const FALLBACK = "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=400&q=80";

export default function AdminLodgesPage() {
  const [lodges, setLodges] = useState<ILodge[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<ILodge | null>(null);
  const [form, setForm] = useState<F>(EMPTY);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => { const r = await fetch("/api/lodges"); const d = await r.json(); setLodges(d.data ?? []); };
  useEffect(() => { load(); }, []);
  const openAdd = () => { setEditing(null); setForm(EMPTY); setImageFile(null); setShowModal(true); };
  const openEdit = (l: ILodge) => { setEditing(l); setForm({ title: l.title, description: l.description, status: l.status, location: l.location }); setImageFile(null); setShowModal(true); };
  const set = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault(); setLoading(true); setError("");
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (imageFile) fd.append("image", imageFile);
    try {
      const r = await fetch(editing ? `/api/lodges/${editing._id}` : "/api/lodges", { method: editing ? "PUT" : "POST", body: fd });
      const d = await r.json(); if (!r.ok) throw new Error(d.error);
      setShowModal(false); await load();
    } catch (e: unknown) { setError(e instanceof Error ? e.message : "Error"); } finally { setLoading(false); }
  };
  const del = async (id: string) => { if (!confirm("Delete lodge?")) return; await fetch(`/api/lodges/${id}`, { method: "DELETE" }); await load(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>Lodges</h1>
          <p className="text-gray-500 text-sm mt-0.5">{lodges.length} total</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#1B6B3A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#154a2a]"><Plus size={16} /> Add Lodge</button>
      </div>

      {lodges.length === 0 ? <div className="bg-white rounded-xl border p-12 text-center"><p className="text-gray-400 text-sm">No lodges yet.</p></div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lodges.map(l => (
            <div key={l._id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="relative h-36"><Image src={l.image || FALLBACK} alt={l.title} fill className="object-cover" />
                <span className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[l.status]}`}>{l.status}</span></div>
              <div className="p-4">
                <h3 className="font-semibold text-sm text-gray-900 mb-0.5" style={{ fontFamily: "Outfit, sans-serif" }}>{l.title}</h3>
                <p className="text-xs text-[#1B6B3A] font-medium mb-2">{l.location}</p>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{l.description}</p>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(l)} className="flex items-center gap-1 text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:border-[#1B6B3A] hover:text-[#1B6B3A]"><Pencil size={12} /> Edit</button>
                  <button onClick={() => del(l._id)} className="flex items-center gap-1 text-xs border border-red-200 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50"><Trash2 size={12} /> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>{editing ? "Edit" : "Add"} Lodge</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}
              {([["Title", "title"], ["Location", "location"]] as [string, keyof F][]).map(([label, name]) => (
                <div key={name}><label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input type="text" value={form[name]} onChange={set(name)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A]" /></div>
              ))}
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={3} value={form.description} onChange={set("description")} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A]" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={form.status} onChange={set("status")} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A]">
                  {STATUSES.map(s => <option key={s}>{s}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] ?? null)} className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:border-0 file:bg-[#e8f5ee] file:text-[#1B6B3A] file:rounded-lg file:text-xs file:font-medium" /></div>
              <button type="submit" disabled={loading} className="w-full bg-[#1B6B3A] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#154a2a] disabled:opacity-60">{loading ? "Saving..." : editing ? "Update Lodge" : "Add Lodge"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
