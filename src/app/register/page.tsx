"use client";

import { useState } from "react";

const FIELDS = [
  { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter your full name" },
  { label: "Email Address", name: "email", type: "email", placeholder: "Enter your email" },
  { label: "Phone Number", name: "phone", type: "tel", placeholder: "+234 800 000 0000" },
  { label: "State Code", name: "stateCode", type: "text", placeholder: "e.g. EK/25A/1234" },
  { label: "Place of Primary Assignment (PPA)", name: "ppa", type: "text", placeholder: "Enter your PPA" },
  { label: "LGA of Deployment", name: "lga", type: "text", placeholder: "Enter LGA" },
] as const;

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  stateCode: string;
  ppa: string;
  lga: string;
  gender: string;
};

export default function RegisterPage() {
  const [form, setForm] = useState<FormData>({
    fullName: "", email: "", phone: "", stateCode: "", ppa: "", lga: "", gender: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    for (const key of Object.keys(form) as (keyof FormData)[]) {
      if (!form[key].trim()) {
        newErrors[key] = "This field is required";
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Registration failed");
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center max-w-md">
          <div className="w-16 h-16 bg-[#e8f5ee] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="#1B6B3A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
            Registration Successful!
          </h2>
          <p className="text-gray-500 text-sm">
            Welcome to MCAN Ekiti State Chapter. Your record has been saved. Jazakallahu khairan!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
              Join MCAN Ekiti
            </h1>
            <p className="text-gray-500 text-sm">Register as a member of MCAN Ekiti State Chapter</p>
          </div>

          {status === "error" && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <p className="text-sm text-red-600">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {FIELDS.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A] transition-colors ${
                    errors[field.name] ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                />
                {errors[field.name] && (
                  <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A] transition-colors ${
                  errors.gender ? "border-red-400 bg-red-50" : "border-gray-200"
                }`}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#1B6B3A] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#154a2a] transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Registering...
                </>
              ) : (
                "Register Now"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
