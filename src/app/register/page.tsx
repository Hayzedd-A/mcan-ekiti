"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    stateCode: "",
    ppa: "",
    lga: "",
    gender: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="text-center mb-8">
            <h1
              className="text-2xl font-bold text-gray-900 mb-1"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Join MCAN Ekiti
            </h1>
            <p className="text-gray-500 text-sm">
              Register as a member of MCAN Ekiti State Chapter
            </p>
          </div>

          <div className="space-y-4">
            {[
              { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter your full name" },
              { label: "Email Address", name: "email", type: "email", placeholder: "Enter your email" },
              { label: "Phone Number", name: "phone", type: "tel", placeholder: "+234 800 000 0000" },
              { label: "State Code", name: "stateCode", type: "text", placeholder: "e.g. EK/25A/1234" },
              { label: "Place of Primary Assignment (PPA)", name: "ppa", type: "text", placeholder: "Enter your PPA" },
              { label: "LGA of Deployment", name: "lga", type: "text", placeholder: "Enter LGA" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A] transition-colors"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1B6B3A]/30 focus:border-[#1B6B3A] transition-colors"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <button
              type="button"
              className="w-full bg-[#1B6B3A] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#154a2a] transition-colors mt-2"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
