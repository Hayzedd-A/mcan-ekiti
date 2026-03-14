"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Upload, Trash2, X } from "lucide-react";
import { IGallery } from "@/models/Gallery";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<IGallery[]>([]);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<{ file: File; url: string; caption: string }[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => { const r = await fetch("/api/gallery"); const d = await r.json(); setImages(d.data ?? []); };
  useEffect(() => { load(); }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const newPreviews = files.map(f => ({ file: f, url: URL.createObjectURL(f), caption: "" }));
    setPreviews(p => [...p, ...newPreviews]);
    if (fileRef.current) fileRef.current.value = "";
  };

  const upload = async () => {
    if (!previews.length) return;
    setUploading(true);
    const fd = new FormData();
    previews.forEach((p, i) => { fd.append("images", p.file); fd.append("captions", p.caption); });
    try {
      const r = await fetch("/api/gallery", { method: "POST", body: fd });
      if (r.ok) { setPreviews([]); await load(); }
    } finally { setUploading(false); }
  };

  const del = async (id: string) => { if (!confirm("Delete image?")) return; await fetch(`/api/gallery/${id}`, { method: "DELETE" }); await load(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>Gallery</h1>
          <p className="text-gray-500 text-sm mt-0.5">{images.length} images</p></div>
        <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 bg-[#1B6B3A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#154a2a]">
          <Upload size={16} /> Upload Images</button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />

      {/* Upload Staging Area */}
      {previews.length > 0 && (
        <div className="bg-[#f0faf4] border border-[#dcf3e7] rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-[#1B6B3A]">{previews.length} image(s) ready to upload</p>
            <div className="flex gap-2">
              <button onClick={() => setPreviews([])} className="text-xs text-gray-500 hover:text-red-500">Clear all</button>
              <button onClick={upload} disabled={uploading} className="bg-[#1B6B3A] text-white text-xs px-4 py-1.5 rounded-lg hover:bg-[#154a2a] disabled:opacity-60">
                {uploading ? "Uploading..." : "Upload All"}</button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {previews.map((p, i) => (
              <div key={i} className="relative group">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image src={p.url} alt="Preview" fill className="object-cover" />
                  <button onClick={() => setPreviews(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                </div>
                <input type="text" placeholder="Caption (optional)" value={p.caption} onChange={e => setPreviews(prev => prev.map((item, idx) => idx === i ? { ...item, caption: e.target.value } : item))}
                  className="w-full mt-1.5 text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-[#1B6B3A]" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {images.length === 0 && previews.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-200 p-16 text-center cursor-pointer hover:border-[#1B6B3A] transition-colors" onClick={() => fileRef.current?.click()}>
          <Upload size={32} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-400 text-sm">Click to upload images to the gallery</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map(img => (
            <div key={img._id} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100">
              <Image src={img.image} alt={img.caption ?? "Gallery"} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <button onClick={() => del(img._id)} className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                  <Trash2 size={16} /></button>
              </div>
              {img.caption && <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity truncate">{img.caption}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
