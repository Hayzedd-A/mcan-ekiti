import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import PrayerTimesSection from "@/components/sections/PrayerTimesSection";
import EventsSection from "@/components/sections/EventsSection";
import DonationCTA from "@/components/sections/DonationCTA";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProjectsSection showAll={false} />
      <PrayerTimesSection />
      <EventsSection />
      <DonationCTA />
    </div>
  );
}
