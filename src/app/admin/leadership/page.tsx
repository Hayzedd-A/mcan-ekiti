"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { ILeadership } from "@/models/Leadership";

type F = { name: string; position: string; order: string; };
const EMPTY: F = { name: "", position: "", order: "0" };

export default function AdminLeadershipPage() {
  const [leaders, setLeaders] = useState<ILeadership[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<ILeadership | null>(null);
  const [form, setForm] = useState<F>(EMPTY);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    const r = await fetch("/api/leadership");
    const d = await r.json();
    setLeaders(d.data ?? []);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setImage(null);
    setShowModal(true);
  };

  const openEdit = (l: ILeadership) => {
    setEditing(l);
    setForm({ name: l.name, position: l.position, order: String(l.order) });
    setImage(null);
    setShowModal(true);
  };

  const handleChange = (k: keyof F) => (ev: React.ChangeEvent<HTMLInputElement>) => 
    setForm(p => ({ ...p, [k]: ev.target.value }));

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setLoading(true);
    setError("");

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (image) fd.append("image", image);

    try {
      const url = editing ? `/api/leadership/${editing._id}` : "/api/leadership";
      const method = editing ? "PUT" : "POST";
      const r = await fetch(url, { method, body: fd });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      setShowModal(false);
      await load();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this leader?")) return;
    try {
      const r = await fetch(`/api/leadership/${id}`, { method: "DELETE" });
      if (!r.ok) throw new Error("Failed to delete");
      await load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Error deleting");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>Leadership</h1>
          <p className="text-gray-500 text-sm mt-0.5">{leaders.length} members total</p>
        </div>
        <button 
          onClick={openAdd} 
          className="flex items-center gap-2 bg-[#1B6B3A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#154a2a] transition-colors"
        >
          <Plus size={16} /> Add Member
        </button>
      </div>

      {leaders.length === 0 ? (
        <div className="bg-white rounded-xl border p-12 text-center">
          <p className="text-gray-400 text-sm">No leadership members found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {leaders.map((l) => (
            <div key={l._id} className="bg-white rounded-xl border border-gray-100 overflow-hidden text-center p-4 hover:shadow-sm transition-shadow">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-50 mb-3">
                {l.image ? (
                  <Image src={l.image} alt={l.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" stroke="#9ca3af" strokeWidth="1.5" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-sm font-semibold text-gray-900 truncate">{l.name}</p>
              <p className="text-xs text-gray-500 mt-1">{l.position}</p>
              <div className="flex gap-2 mt-4 justify-center">
                <button 
                  onClick={() => openEdit(l)} 
                  className="flex items-center gap-1 text-xs border border-gray-200 px-2.5 py-1.5 rounded-lg hover:border-[#1B6B3A] hover:text-[#1B6B3A] transition-colors"
                >
                  <Pencil size={12} /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(l._id)} 
                  className="flex items-center gap-1 text-xs border border-red-100 text-red-500 px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg" style={{ fontFamily: "Outfit, sans-serif" }}>
                {editing ? "Edit Member" : "Add Leadership Member"}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={form.name} 
                  onChange={handleChange("name")} 
                  placeholder="e.g. Abdullah Abdurrahmaan"
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-[#1B6B3A]/20 focus:border-[#1B6B3A] outline-none transition-all" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Position</label>
                <input 
                  type="text" 
                  required 
                  value={form.position} 
                  onChange={handleChange("position")} 
                  placeholder="e.g. Patron"
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-[#1B6B3A]/20 focus:border-[#1B6B3A] outline-none transition-all" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Display Order</label>
                <input 
                  type="number" 
                  value={form.order} 
                  onChange={handleChange("order")} 
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-[#1B6B3A]/20 focus:border-[#1B6B3A] outline-none transition-all" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Photo</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => setImage(e.target.files?.[0] ?? null)} 
                  className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:border-0 file:bg-[#e8f5ee] file:text-[#1B6B3A] file:rounded-lg file:text-xs file:font-semibold cursor-pointer" 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-[#1B6B3A] text-white py-3 rounded-lg text-sm font-bold hover:bg-[#154a2a] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-[0.98]"
              >
                {loading ? "Saving..." : editing ? "Update Member" : "Add Member"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
