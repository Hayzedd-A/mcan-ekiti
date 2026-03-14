"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { IEvent } from "@/models/Event";

const STATUSES = ["Upcoming", "Ongoing", "Completed"] as const;
const OCCURRENCES = ["One-time", "Weekly", "Monthly", "Annual"] as const;
const FALLBACK = "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=400&q=80";
type F = { date: string; title: string; description: string; status: string; location: string; cost: string; occurrence: string; };
const EMPTY: F = { date: "", title: "", description: "", status: "Upcoming", location: "", cost: "", occurrence: "One-time" };
const STATUS_COLORS: Record<string, string> = { Upcoming: "bg-green-100 text-[#1B6B3A]", Ongoing: "bg-blue-100 text-blue-700", Completed: "bg-gray-100 text-gray-600" };

export default function AdminEventsPage() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<IEvent | null>(null);
  const [form, setForm] = useState<F>(EMPTY);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => { const r = await fetch("/api/events"); const d = await r.json(); setEvents(d.data ?? []); };
  useEffect(() => { load(); }, []);
  const openAdd = () => { setEditing(null); setForm(EMPTY); setImageFile(null); setShowModal(true); };
  const openEdit = (e: IEvent) => {
    setEditing(e);
    setForm({ date: e.date?.slice(0, 10) ?? "", title: e.title, description: e.description, status: e.status, location: e.location, cost: String(e.cost ?? ""), occurrence: e.occurrence });
    setImageFile(null); setShowModal(true);
  };
  const set = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault(); setLoading(true); setError("");
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (imageFile) fd.append("image", imageFile);
    try {
      const r = await fetch(editing ? `/api/events/${editing._id}` : "/api/events", { method: editing ? "PUT" : "POST", body: fd });
      const d = await r.json(); if (!r.ok) throw new Error(d.error);
      setShowModal(false); await load();
    } catch (e: unknown) { setError(e instanceof Error ? e.message : "Error"); } finally { setLoading(false); }
  };
  const del = async (id: string) => { if (!confirm("Delete event?")) return; await fetch(`/api/events/${id}`, { method: "DELETE" }); await load(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>Events</h1>
          <p className="text-gray-500 text-sm mt-0.5">{events.length} total</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#1B6B3A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#154a2a]">
          <Plus size={16} /> Add Event</button>
      </div>

      {events.length === 0 ? <div className="bg-white rounded-xl border p-12 text-center"><p className="text-gray-400 text-sm">No events yet.</p></div> : (
        <div className="space-y-3">
          {events.map((ev) => (
            <div key={ev._id} className="bg-white rounded-xl border border-gray-100 flex items-center gap-4 px-5 py-4">
              {ev.imageBanner && <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0"><Image src={ev.imageBanner || FALLBACK} alt={ev.title} fill className="object-cover" /></div>}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-sm text-gray-900">{ev.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[ev.status]}`}>{ev.status}</span>
                </div>
                <p className="text-xs text-gray-400">{ev.date?.slice(0, 10)} · {ev.location} · {ev.occurrence}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(ev)} className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:border-[#1B6B3A] hover:text-[#1B6B3A] flex items-center gap-1"><Pencil size={12} /> Edit</button>
                <button onClick={() => del(ev._id)} className="text-xs border border-red-200 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 flex items-center gap-1"><Trash2 size={12} /> Del</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>{editing ? "Edit" : "Add"} Event</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}
              {([["Title", "title", "text"], ["Location", "location", "text"], ["Date", "date", "date"], ["Cost (₦, 0 for free)", "cost", "number"]] as [string, keyof F, string][]).map(([label, name, type]) => (
                <div key={name}><label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input type={type} value={form[name]} onChange={set(name)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A]" /></div>
              ))}
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={3} value={form.description} onChange={set("description")} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A]" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={form.status} onChange={set("status")} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A]">
                  {STATUSES.map(s => <option key={s}>{s}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Occurrence</label>
                <select value={form.occurrence} onChange={set("occurrence")} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A]">
                  {OCCURRENCES.map(o => <option key={o}>{o}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] ?? null)} className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:border-0 file:bg-[#e8f5ee] file:text-[#1B6B3A] file:rounded-lg file:text-xs file:font-medium" /></div>
              <button type="submit" disabled={loading} className="w-full bg-[#1B6B3A] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#154a2a] disabled:opacity-60">
                {loading ? "Saving..." : editing ? "Update Event" : "Add Event"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
