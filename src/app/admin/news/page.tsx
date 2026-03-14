"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus, X, Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExt from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { INews } from "@/models/News";

const CATEGORIES = ["Events", "Projects", "Dawah", "Organization", "Education", "Welfare", "General"];
const FALLBACK = "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=400&q=80";
type F = { title: string; shortDescription: string; category: string; };
const EMPTY: F = { title: "", shortDescription: "", category: "General" };

function ToolbarBtn({ onClick, active, children }: { onClick: () => void; active?: boolean; children: React.ReactNode }) {
  return (
    <button type="button" onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      className={`p-1.5 rounded transition-colors ${active ? "bg-[#1B6B3A] text-white" : "text-gray-600 hover:bg-gray-100"}`}>
      {children}
    </button>
  );
}

function RichEditor({ content, onChange }: { content: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit, UnderlineExt, TextAlign.configure({ types: ["heading", "paragraph"] })],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: { attributes: { class: "min-h-[200px] px-3 py-2 text-sm text-gray-800 focus:outline-none" } },
  });
  const is = useCallback((name: string, opts?: Record<string, unknown>) => editor?.isActive(name, opts) ?? false, [editor]);

  if (!editor) return <div className="border border-gray-200 rounded-lg h-32 animate-pulse bg-gray-50" />;
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#1B6B3A]/30 focus-within:border-[#1B6B3A]">
      <div className="flex flex-wrap gap-0.5 p-2 border-b border-gray-100 bg-gray-50">
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={is("bold")}><Bold size={14} /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={is("italic")}><Italic size={14} /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={is("underline")}><Underline size={14} /></ToolbarBtn>
        <div className="w-px h-5 bg-gray-200 mx-1 self-center" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={is("bulletList")}><List size={14} /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={is("orderedList")}><ListOrdered size={14} /></ToolbarBtn>
        <div className="w-px h-5 bg-gray-200 mx-1 self-center" />
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={is("paragraph", { textAlign: "left" })}><AlignLeft size={14} /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={is("paragraph", { textAlign: "center" })}><AlignCenter size={14} /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={is("paragraph", { textAlign: "right" })}><AlignRight size={14} /></ToolbarBtn>
        <div className="w-px h-5 bg-gray-200 mx-1 self-center" />
        {[1, 2, 3].map(level => (
          <ToolbarBtn key={level} onClick={() => editor.chain().focus().toggleHeading({ level: level as 1|2|3 }).run()} active={is("heading", { level })}>
            <span className="text-xs font-bold">H{level}</span>
          </ToolbarBtn>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<INews[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<INews | null>(null);
  const [form, setForm] = useState<F>(EMPTY);
  const [story, setStory] = useState("<p></p>");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => { const r = await fetch("/api/news"); const d = await r.json(); setNews(d.data ?? []); };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setStory("<p></p>"); setImageFile(null); setShowModal(true); };
  const openEdit = async (item: INews) => {
    // Fetch full article with story
    const r = await fetch(`/api/news/${item._id}`); const d = await r.json();
    setEditing(d.data); setForm({ title: d.data.title, shortDescription: d.data.shortDescription, category: d.data.category });
    setStory(d.data.story || "<p></p>"); setImageFile(null); setShowModal(true);
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault(); setLoading(true); setError("");
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("story", story);
    if (imageFile) fd.append("image", imageFile);
    try {
      const r = await fetch(editing ? `/api/news/${editing._id}` : "/api/news", { method: editing ? "PUT" : "POST", body: fd });
      const d = await r.json(); if (!r.ok) throw new Error(d.error);
      setShowModal(false); await load();
    } catch (e: unknown) { setError(e instanceof Error ? e.message : "Error"); } finally { setLoading(false); }
  };
  const del = async (id: string) => { if (!confirm("Delete article?")) return; await fetch(`/api/news/${id}`, { method: "DELETE" }); await load(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>News</h1>
          <p className="text-gray-500 text-sm mt-0.5">{news.length} articles</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#1B6B3A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#154a2a]"><Plus size={16} /> Add Article</button>
      </div>

      {news.length === 0 ? <div className="bg-white rounded-xl border p-12 text-center"><p className="text-gray-400 text-sm">No articles yet.</p></div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map(item => (
            <div key={item._id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="relative h-36"><Image src={item.image || FALLBACK} alt={item.title} fill className="object-cover" />
                <span className="absolute top-2 left-2 bg-[#1B6B3A] text-white text-xs px-2 py-0.5 rounded-full font-medium">{item.category}</span></div>
              <div className="p-4">
                <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2" style={{ fontFamily: "Outfit, sans-serif" }}>{item.title}</h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.shortDescription}</p>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="flex items-center gap-1 text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:border-[#1B6B3A] hover:text-[#1B6B3A]"><Pencil size={12} /> Edit</button>
                  <button onClick={() => del(item._id)} className="flex items-center gap-1 text-xs border border-red-200 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50"><Trash2 size={12} /> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
              <h2 className="font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>{editing ? "Edit" : "Add"} Article</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A]" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <textarea rows={2} value={form.shortDescription} onChange={e => setForm(p => ({ ...p, shortDescription: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A]" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A]">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Story</label>
                <RichEditor content={story} onChange={setStory} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] ?? null)} className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:border-0 file:bg-[#e8f5ee] file:text-[#1B6B3A] file:rounded-lg file:text-xs file:font-medium" /></div>
              <button type="submit" disabled={loading} className="w-full bg-[#1B6B3A] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#154a2a] disabled:opacity-60">{loading ? "Saving..." : editing ? "Update Article" : "Publish Article"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
