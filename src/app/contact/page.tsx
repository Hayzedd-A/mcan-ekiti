import Image from "next/image";
import { Phone, MessageCircle, Mail, MapPin, ArrowRight } from "lucide-react";
import { NEXT_PUBLIC_BASE_URL } from "@/config/constants";

async function getSettings() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/contact`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return null;
  }
}

export default async function ContactPage() {
  const settings = await getSettings();

  const contactItems = [
    {
      icon: Phone,
      label: "Call Us",
      value: settings?.phone || "+234 800 000 0000",
      href: `tel:${(settings?.phone || "+2348000000000").replace(/\s/g, "")}`,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp Us",
      value: settings?.whatsapp || "+234 800 000 0000",
      href: `https://wa.me/${(settings?.whatsapp || "2348000000000").replace(/\+/g, "").replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email Us",
      value: settings?.email || "mcanekitistateado@gmail.com",
      href: `mailto:${settings?.email || "mcanekitistateado@gmail.com"}`,
    },
    {
      icon: MapPin,
      label: "Visit Us",
      value:
        settings?.location ||
        "MCAN Ekiti secretariat, Ansarudeen Mosque, Atikanakan, Ado ekiti, Ekiti",
      href: settings?.mapsUrl || "https://maps.google.com",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1
          className="text-4xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Contact us
        </h1>
        <p className="text-gray-500 text-sm mb-10">
          Reach out to Us, We'll respond as soon as possible
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Character Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-72 h-80 sm:w-80 sm:h-96">
              <Image
                src="/images/contact-character.png"
                alt="Contact Character"
                fill
                className="object-contain object-bottom"
              />
            </div>
          </div>

          {/* Contact Cards */}
          <div className="space-y-3">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-[#f0faf4] border border-[#dcf3e7] rounded-xl px-5 py-4 hover:border-[#1B6B3A]/50 hover:bg-[#e8f5ee] transition-all group"
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    <Icon size={18} className="text-[#1B6B3A]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-800 leading-snug">
                      {item.value}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-[#1B6B3A] flex-shrink-0 group-hover:translate-x-1 transition-transform"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
