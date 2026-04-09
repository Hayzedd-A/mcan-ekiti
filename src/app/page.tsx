import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import PrayerTimesSection from "@/components/sections/PrayerTimesSection";
import EventsSection from "@/components/sections/EventsSection";
import DonationCTA from "@/components/sections/DonationCTA";

import { IProject } from "@/models/Project";
import { IEvent } from "@/models/Event";
import { NEXT_PUBLIC_BASE_URL } from "@/config/constants";

interface PrayerTime {
  name: string;
  time: string;
}

async function getPrayerTimes(): Promise<PrayerTime[]> {
  const fallback: PrayerTime[] = [
    { name: "Fajr", time: "--:--" },
    { name: "Sunrise", time: "--:--" },
    { name: "Dhur", time: "--:--" },
    { name: "Asr", time: "--:--" },
    { name: "Maghrib", time: "--:--" },
    { name: "Isha'a", time: "--:--" },
  ];

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/prayer-times`, {
        next: { revalidate: 86400 },
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      return data.prayers ?? [];
    } catch {
      await new Promise((r) => setTimeout(r, 500 * attempt));
      if (attempt === 2) return fallback;
    }
  }

  return fallback;
}

async function getProjects(): Promise<IProject[]> {
  const fallback: IProject[] = [];

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/projects`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      return data.data ?? [];
    } catch (error) {
      console.log("Failed to fetch projects: ", error);
      await new Promise((r) => setTimeout(r, 500 * attempt));
      if (attempt === 2) return fallback;
    }
  }

  return fallback;
}

async function getEvents(): Promise<IEvent[]> {
  const fallback: IEvent[] = [];

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/events`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      return data.data ?? [];
    } catch (error) {
      console.log("Failed to fetch events: ", error);
      await new Promise((r) => setTimeout(r, 500 * attempt));
      if (attempt === 2) return fallback;
    }
  }

  return fallback;
}

export default async function HomePage() {
  const prayers = await getPrayerTimes();
  const projects = await getProjects();
  const events = await getEvents();

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProjectsSection showAll={false} projects={projects} />
      <PrayerTimesSection prayers={prayers} />
      <EventsSection events={events} />
      <DonationCTA />
    </div>
  );
}
