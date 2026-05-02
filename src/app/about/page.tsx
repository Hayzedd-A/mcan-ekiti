import Image from "next/image";
import { ILeadership } from "@/models/Leadership";
import { NEXT_PUBLIC_BASE_URL } from "@/config/constants";
import {
  History,
  Target,
  CheckCircle2,
  LayoutGrid,
  Trophy,
  AlertTriangle,
  Sparkles,
  Users,
  Search,
  BookOpen,
  Heart,
  Handshake,
  CheckCircle,
  Map,
} from "lucide-react";
import Leadership from "@/components/sections/Leadership";

const LGA = [
  "Ado-Ekiti",
  "Efon",
  "Ijero",
  "Ikere",
  "Ikole",
  "Irepodun/Ifelodun",
  "Ise/Orun",
  "Moba",
  "Oye",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 🔹 TOP TABS */}
      {/* <div className="border-b bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center gap-8 text-sm font-medium">
          <a
            href="#about"
            className="py-4 border-b-2 border-green-600 text-green-700"
          >
            About us
          </a>
          <a
            href="#history"
            className="py-4 text-gray-500 hover:text-green-600 border-b-2 border-transparent transition-all"
          >
            History
          </a>
          <a
            href="#objectives"
            className="py-4 text-gray-500 hover:text-green-600 border-b-2 border-transparent transition-all"
          >
            Our Mission
          </a>
          <a
            href="#programs"
            className="py-4 text-gray-500 hover:text-green-600 border-b-2 border-transparent transition-all"
          >
            Programs
          </a>
          <a
            href="#patrons"
            className="py-4 text-gray-500 hover:text-green-600 border-b-2 border-transparent transition-all"
          >
            Leadership
          </a>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        {/* HERO SECTION */}
        <section id="about" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3 h-3" />
                MCAN EKITI STATE CHAPTER
              </div> */}
              <h1
                className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight font-display"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Fostering Faith, Service &{" "}
                <span className="text-green-600">Community</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                The Muslim Corpers Association of Nigeria (MCAN), Ekiti State
                Chapter, is a faith-based organization committed to Islamic
                propagation (Da’wah), welfare support, leadership development,
                and community engagement among Muslim corps members in Ekiti
                State.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex-1 min-w-[200px]">
                  <Users className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Unity</p>
                    <p className="text-xs text-gray-500">
                      Coordinating Muslim corps members
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex-1 min-w-[200px]">
                  <Heart className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Service</p>
                    <p className="text-xs text-gray-500">
                      Welfare & community support
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-green-600 rounded-[2rem] rotate-3 opacity-10 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="relative bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-100 flex items-center justify-center aspect-square lg:aspect-auto lg:h-[400px]">
                <Image
                  src="/images/image.png"
                  alt="MCAN Logo"
                  width={300}
                  height={300}
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* HISTORY SECTION */}
        <section id="history" className="scroll-mt-24">
          <div className="max-w-3xl">
            <h2
              className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3 font-display"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              <History className="w-8 h-8 text-green-600" />
              History and Development
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                The history of MCAN in Ekiti State dates back to 1996, the year
                the state was created. Its first Ameer, Mallam Umar Abbass
                Jahun, a Northerner from Zaria, was appointed at the NYSC
                orientation camp in Lafiagi, Kwara State. The camp was later
                relocated to Efon-Alaaye, before finally settling at its
                permanent site in Ise-Orun, Emure-Ekiti.
              </p>
              <div className="relative pl-8 border-l-2 border-green-100 py-2">
                <div className="absolute left-[-9px] top-4 w-4 h-4 bg-green-600 rounded-full border-4 border-white"></div>
                <p className="italic text-gray-700">
                  "What began as informal acts of hospitality, offering shelter,
                  guidance, and spiritual support to Muslim travelers, students,
                  and corpers away from home, gradually developed into a
                  structured community organization dedicated to Islamic
                  propagation, welfare support, and social cohesion."
                </p>
              </div>
              <p>
                In its early years, the association operated without a permanent
                office. With support from Islamic organizations such as
                Ansar-Ud-Deen, temporary spaces were provided at the
                Ansar-Ud-Deen Mosque in Atikankan. Despite early challenges, the
                association evolved into an organized structure with improved
                continuity and leadership succession.
              </p>
            </div>
          </div>
        </section>

        {/* PURPOSE & PHILOSOPHY */}
        <section className="bg-green-900 rounded-[3rem] p-8 sm:p-16 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-800 rounded-full -mr-32 -mt-32 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-700 rounded-full -ml-24 -mb-24 opacity-30"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl font-bold mb-6 font-display"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Our Purpose & Philosophy
              </h2>
              <p className="text-green-50 text-lg leading-relaxed mb-6">
                MCAN Ekiti was founded with the belief that Muslim corps members
                should not only serve the nation but also serve as ambassadors
                of faith, character, and community development.
              </p>
              <p className="text-green-100 font-medium">
                Our mission is to ensure that corpers leave every community
                better than they found it.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20">
                <Target className="w-8 h-8 text-green-300 mb-4" />
                <h3 className="font-bold text-xl mb-2">Our Mission</h3>
                <p className="text-green-50 text-sm">
                  Adherence to the pristine teachings of Islam in all affairs of
                  life.
                </p>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20">
                <Sparkles className="w-8 h-8 text-green-300 mb-4" />
                <h3 className="font-bold text-xl mb-2">Our Vision</h3>
                <p className="text-green-50 text-sm">
                  Towards achieving an ideal, morally bounded Islamic society.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AIM AND OBJECTIVES */}
        <section id="objectives" className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-gray-900 font-display"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Aim and Objectives
            </h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                text: "Coordinating Muslim corps members in Ekiti State",
              },
              {
                icon: <BookOpen className="w-6 h-6" />,
                text: "Promoting Islamic education and correct understanding",
              },
              {
                icon: <LayoutGrid className="w-6 h-6" />,
                text: "Supporting Da’wah activities within host communities",
              },
              {
                icon: <Heart className="w-6 h-6" />,
                text: "Defending the rights and welfare of Muslim corps members",
              },
              {
                icon: <Handshake className="w-6 h-6" />,
                text: "Collaborating with Islamic & community organizations",
              },
            ].map((obj, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className="p-3 bg-green-50 text-green-600 rounded-2xl shrink-0">
                  {obj.icon}
                </div>
                <p className="text-gray-700 font-medium">{obj.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Local Government Areas */}
        <section>
          <div className="">
            <h2
              className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3 font-display"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              <Map className="w-8 h-8 text-green-600" />
              MCAN Ekiti LGAs(Local Government Areas)
            </h2>
            <p>
              For a long time, activities across the Local Government Areas were
              carried out independently, with little or no coordination between
              them. However, the association has recently succeeded in
              re-establishing itself by bringing these chapters together;
              fostering unity and coordinated participation across the following
              Local Government Areas:{" "}
              <span className="flex flex-wrap gap-4">
                {LGA.map((lga) => (
                  <div key={lga} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">{lga}</span>
                  </div>
                ))}
              </span>
            </p>
          </div>
        </section>

        {/* ACTIVITIES & PROGRAMMES */}
        <section
          id="programs"
          className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <div className="space-y-8">
            <h2
              className="text-3xl font-bold text-gray-900 font-display"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Activities & Programmes
            </h2>
            <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-green-700 mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                Orientation Camp Activities
              </h3>
              <ul className="space-y-4">
                {[
                  "Identification and mobilization of Muslim corps members",
                  "Da’wah lectures and Islamic reminders",
                  "Qur’an recitation and memorization sessions",
                  "Welfare and support services within the camp",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 shrink-0 transition-transform group-hover:scale-110" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:mt-16">
            <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-green-700 mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                Post-Orientation Activities
              </h3>
              <ul className="space-y-4">
                {[
                  "Weekly Qur’an and knowledge circles",
                  "Da’wah lectures and community outreach",
                  "Educational support and tutorial sessions",
                  "Community development initiatives",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 shrink-0 transition-transform group-hover:scale-110" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* IMPACT & ACHIEVEMENTS */}
        <section className="bg-green-900 rounded-[3rem] p-8 sm:p-16 text-white">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-4 font-display"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Impact and Achievements
            </h2>
            <p className="text-gray-400">
              Making a difference in the lives of corps members and the
              community.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Islamic Identity",
                desc: "Strengthening Islamic identity among corps members",
              },
              {
                title: "Community Support",
                desc: "Supporting Da’wah efforts in host communities",
              },
              {
                title: "Interfaith Harmony",
                desc: "Promoting peaceful interfaith coexistence",
              },
              {
                title: "Youth Mentoring",
                desc: "Mentoring Muslim youths in leadership and conduct",
              },
              {
                title: "Welfare Success",
                desc: "Improving welfare coordination for corps members",
              },
              {
                title: "Education",
                desc: "Correcting misconceptions about Islam through engagement",
              },
            ].map((impact, i) => (
              <div key={i} className="group">
                <Trophy className="w-8 h-8 text-green-500 mb-4 transition-transform group-hover:scale-110" />
                <h3 className="font-bold text-lg mb-2">{impact.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {impact.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CHALLENGES */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="text-3xl font-bold text-gray-900 mb-6 font-display"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Our Challenges
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Despite our progress, we encounter significant hurdles that test
              our resilience and commitment to service.
            </p>
            <div className="space-y-4">
              <div className="p-6 bg-red-50 rounded-3xl border border-red-100 flex gap-4">
                <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Financial Constraints
                  </h3>
                  <p className="text-sm text-gray-600">
                    Limited funding affects the maintenance and expansion of
                    facilities, Da’wah outreach, and welfare support.
                  </p>
                </div>
              </div>
              <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">MCAN Lodges</h3>
                  <p className="text-sm text-gray-600">
                    Establishing and expanding lodges remains a priority to
                    provide safe, supportive environments for corpers.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-8 sm:p-12 rounded-[3rem] border border-gray-100 text-center">
            <Sparkles className="w-12 h-12 text-green-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Legacy & Future
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Today, MCAN Ekiti stands as a respected and organized Muslim
              community institution. With strong leadership and active youth
              participation, we are committed to strengthening unity, deepening
              Islamic knowledge, and building a legacy of service for future
              generations.
            </p>
          </div>
        </section>

        {/* LEADERSHIP */}
        <Leadership />
      </div>
    </div>
  );
}
