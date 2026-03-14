"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { IProject } from "@/models/Project";

const STATUSES = ["Ongoing", "Completed", "Paused"] as const;
const FALLBACK_IMG = "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=400&q=80";

type FormState = {
  title: string; description: string; projectedAmount: string; amountRaised: string;
  status: string; location: string; projectedDate: string;
};
const EMPTY: FormState = { title: "", description: "", projectedAmount: "", amountRaised: "", status: "Ongoing", location: "", projectedDate: "" };

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<IProject | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data.data ?? []);
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setImageFile(null); setShowModal(true); };
  const openEdit = (p: IProject) => {
    setEditing(p);
    setForm({ title: p.title, description: p.description, projectedAmount: String(p.projectedAmount), amountRaised: String(p.amountRaised), status: p.status, location: p.location, projectedDate: p.projectedDate ?? "" });
    setImageFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (imageFile) fd.append("image", imageFile);

    try {
      const url = editing ? `/api/projects/${editing._id}` : "/api/projects";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setShowModal(false);
      await load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    await load();
  };

  const STATUS_COLORS: Record<string, string> = { Ongoing: "bg-green-100 text-[#1B6B3A]", Completed: "bg-blue-100 text-blue-700", Paused: "bg-amber-100 text-amber-700" };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>Projects</h1>
          <p className="text-gray-500 text-sm mt-0.5">{projects.length} total projects</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#1B6B3A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#154a2a] transition-colors">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <p className="text-gray-400 text-sm">No projects yet. Add your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p._id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">
              <div className="relative h-40">
                <Image src={p.image || FALLBACK_IMG} alt={p.title} fill className="object-cover" />
                <span className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[p.status]}`}>{p.status}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>{p.title}</h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{p.description}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(p)} className="flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:border-[#1B6B3A] hover:text-[#1B6B3A] transition-colors">
                    <Pencil size={12} /> Edit
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="flex items-center gap-1.5 text-xs border border-red-200 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>{editing ? "Edit" : "Add"} Project</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}
              {[
                { label: "Title", name: "title", type: "text" },
                { label: "Location", name: "location", type: "text" },
                { label: "Projected Amount (₦)", name: "projectedAmount", type: "number" },
                { label: "Amount Raised (₦)", name: "amountRaised", type: "number" },
                { label: "Projected Date", name: "projectedDate", type: "date" },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input type={type} value={form[name as keyof FormState]} onChange={(e) => setForm(p => ({ ...p, [name]: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A]" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={form.status} onChange={(e) => setForm(p => ({ ...p, status: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A]">
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image {editing?.image && "(leave empty to keep current)"}</label>
                <input ref={fileRef} type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:border-0 file:bg-[#e8f5ee] file:text-[#1B6B3A] file:rounded-lg file:text-xs file:font-medium" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#1B6B3A] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#154a2a] transition-colors disabled:opacity-60">
                {loading ? "Saving..." : editing ? "Update Project" : "Add Project"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
