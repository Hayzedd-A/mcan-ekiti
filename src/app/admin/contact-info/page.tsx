"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Loader2,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Globe,
} from "lucide-react";

export default function ContactSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [settings, setSettings] = useState({
    phone: "",
    whatsapp: "",
    email: "",
    location: "",
    mapsUrl: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.success) {
        setSettings(data.data);
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to fetch settings" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Settings updated successfully" });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to update settings",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#1B6B3A]" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1
          className="text-2xl font-bold text-gray-900"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Contact Settings
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage the contact details displayed on the public website.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {message && (
          <div
            className={`p-4 rounded-xl text-sm font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-100"
                : "bg-red-50 text-red-700 border border-red-100"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Phone size={16} /> Phone Number
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) =>
                setSettings({ ...settings, phone: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/20 focus:border-[#1B6B3A] transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <MessageCircle size={16} /> WhatsApp Number
            </label>
            <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) =>
                setSettings({ ...settings, whatsapp: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/20 focus:border-[#1B6B3A] transition-all"
              placeholder="+234..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Mail size={16} /> Email Address
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) =>
                setSettings({ ...settings, email: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/20 focus:border-[#1B6B3A] transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <MapPin size={16} /> Location Address
            </label>
            <textarea
              value={settings.location}
              onChange={(e) =>
                setSettings({ ...settings, location: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/20 focus:border-[#1B6B3A] transition-all min-h-[100px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Globe size={16} /> Google Maps URL
            </label>
            <input
              type="url"
              value={settings.mapsUrl}
              onChange={(e) =>
                setSettings({ ...settings, mapsUrl: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/20 focus:border-[#1B6B3A] transition-all"
              placeholder="https://maps.google.com/..."
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-[#1B6B3A] text-white rounded-xl font-semibold hover:bg-[#1B6B3A]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save size={20} />
          )}
          {saving ? "Saving Changes..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
