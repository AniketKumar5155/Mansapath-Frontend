import { createElement, useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CalendarDays,
  CheckCircle2,
  Clock,
  Eye,
  IndianRupee,
  Sparkles,
  Video,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/NavBar";
import Footer from "../component/Footer";

const programs = [
  {
    title: "Brain Gym",
    subtitle: "Strengthening focus and emotional balance",
    icon: Brain,
    fee: "1499",
    audience: "Students, teenagers, and young adults",
    status: "Open",
    description:
      "Brain Gym helps learners handle academic pressure, improve focus, build confidence, and understand emotions with practical routines they can use in daily life.",
    outcomes: [
      "Better concentration and study rhythm",
      "Stress regulation for exams and deadlines",
      "Confidence building through guided practice",
    ],
  },
  {
    title: "Chaitanya",
    subtitle: "Awakening calm, clarity, and purpose",
    icon: Sparkles,
    fee: "1999",
    audience: "Adults and older adults",
    status: "Open",
    description:
      "Chaitanya is a gentle program for emotional balance, mental clarity, and purposeful daily rhythm through simple guided practices and steady follow-up.",
    outcomes: [
      "Calmer responses to daily stress",
      "Improved clarity and self-confidence",
      "Supportive structure for active ageing",
    ],
  },
  {
    title: "Bodh",
    subtitle: "Awareness and understanding",
    icon: Eye,
    fee: "Coming soon",
    audience: "Launching soon",
    status: "Coming soon",
    description:
      "Bodh will focus on self-awareness, emotional regulation, and healthier responses to stress, anger, and overwhelm. Enrollment will open soon.",
    outcomes: [
      "Thought and emotion awareness",
      "Mindful pauses before reaction",
      "Healthier behavior patterns",
    ],
    comingSoon: true,
  },
];

const courseFacts = [
  { icon: Clock, label: "Duration", value: "66 days course" },
  { icon: Video, label: "Class mode", value: "2 online classes in a week" },
  { icon: CalendarDays, label: "Follow-up", value: "Guided weekly structure" },
];

const ServiceCard = ({ program, dark, onBook }) => {
  const Icon = program.icon;

  return (
    <Motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`flex min-h-full flex-col rounded-2xl border p-6 shadow-sm ${
        program.comingSoon
          ? dark
            ? "border-amber-300/20 bg-gray-800/65"
            : "border-amber-200 bg-amber-50/60"
          : dark
          ? "border-white/10 bg-gray-800"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${
            dark ? "bg-cyan-400/10 text-cyan-200" : "bg-cyan-50 text-cyan-700"
          }`}
        >
          <Icon size={25} />
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            program.comingSoon
              ? dark
                ? "bg-amber-400/10 text-amber-200"
                : "bg-amber-100 text-amber-800"
              : dark
              ? "bg-emerald-400/10 text-emerald-200"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {program.status}
        </span>
      </div>

      <div className="mt-5">
        <h2 className="text-2xl font-bold">{program.title}</h2>
        <p className={`mt-1 text-sm font-semibold ${dark ? "text-cyan-200" : "text-cyan-700"}`}>
          {program.subtitle}
        </p>
        <p className={`mt-4 text-sm leading-6 ${dark ? "text-gray-300" : "text-slate-600"}`}>
          {program.description}
        </p>
      </div>

      <div
        className={`mt-6 rounded-xl border p-4 ${
          dark ? "border-white/10 bg-slate-900/45" : "border-slate-200 bg-slate-50"
        }`}
      >
        <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${dark ? "text-gray-400" : "text-slate-500"}`}>
          Course fee
        </p>
        <div className="mt-2 flex items-center gap-2 text-2xl font-bold">
          {!program.comingSoon && <IndianRupee size={22} className="text-cyan-600" />}
          {program.comingSoon ? "Coming soon" : program.fee}
        </div>
        <p className={`mt-2 text-sm ${dark ? "text-gray-400" : "text-slate-500"}`}>
          {program.audience}
        </p>
      </div>

      <ul className="mt-6 space-y-3">
        {program.outcomes.map((outcome) => (
          <li key={outcome} className="flex gap-3 text-sm leading-6">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-cyan-600" />
            <span className={dark ? "text-gray-300" : "text-slate-600"}>{outcome}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        disabled={program.comingSoon}
        onClick={onBook}
        className={`mt-auto flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
          program.comingSoon
            ? "cursor-not-allowed bg-slate-200 text-slate-500"
            : "bg-blue-600 text-white shadow hover:bg-blue-700"
        }`}
      >
        {program.comingSoon ? "Coming soon" : "Book this course"}
        {!program.comingSoon && <ArrowRight size={17} />}
      </button>
    </Motion.article>
  );
};

const ServicePage = () => {
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") return true;
    if (savedTheme === "light") return false;
    try {
      return savedTheme ? JSON.parse(savedTheme) : false;
    } catch {
      return false;
    }
  });

  const toggleDark = () => {
    setDark((prev) => {
      localStorage.setItem("theme", JSON.stringify(!prev));
      return !prev;
    });
  };

  const navigate = useNavigate();
  const goToBooking = () => navigate("/book-session");

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        dark ? "bg-gray-900 text-gray-200" : "bg-slate-50 text-slate-900"
      }`}
    >
      <Navbar dark={dark} toggleDark={toggleDark} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 via-transparent to-blue-500/25" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <Motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span
              className={`inline-flex rounded-full px-4 py-1.5 text-sm font-semibold ${
                dark ? "bg-cyan-400/10 text-cyan-200" : "bg-white text-cyan-700 shadow-sm"
              }`}
            >
              ManPath services
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Structured wellness courses with clear details.
            </h1>
            <p className={`mt-5 max-w-2xl text-lg leading-8 ${dark ? "text-gray-300" : "text-slate-600"}`}>
              Choose from Brain Gym and Chaitanya now, with Bodh marked as coming soon. Every active course follows a simple online rhythm designed for consistency and care.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={goToBooking}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
              >
                Book session
                <ArrowRight size={18} />
              </button>
              <a
                href="#courses"
                className={`inline-flex items-center justify-center rounded-xl border px-6 py-3 text-sm font-semibold transition ${
                  dark
                    ? "border-white/10 text-gray-200 hover:bg-white/5"
                    : "border-slate-300 text-slate-700 hover:bg-white"
                }`}
              >
                Explore courses
              </a>
            </div>
          </Motion.div>

          <div
            className={`rounded-2xl border p-5 shadow-sm ${
              dark ? "border-white/10 bg-gray-800/80" : "border-slate-200 bg-white"
            }`}
          >
            <div className="grid gap-3">
              {courseFacts.map(({ icon, label, value }) => (
                <div
                  key={label}
                  className={`flex items-center gap-4 rounded-xl p-4 ${
                    dark ? "bg-slate-900/55" : "bg-slate-50"
                  }`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
                    {createElement(icon, { size: 21 })}
                  </span>
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${dark ? "text-gray-400" : "text-slate-500"}`}>
                      {label}
                    </p>
                    <p className="mt-1 font-semibold">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main id="courses" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 max-w-3xl">
          <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${dark ? "text-cyan-200" : "text-cyan-700"}`}>
            Course options
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Fees, duration, and class format in one place
          </h2>
          {/* <p className={`mt-3 leading-7 ${dark ? "text-gray-400" : "text-slate-600"}`}> */}
            {/* Brain Gym and Chaitanya are open for booking. Bodh is intentionally shown as coming soon so users understand it is not currently selectable. */}
          {/* </p> */}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {programs.map((program) => (
            <ServiceCard
              key={program.title}
              program={program}
              dark={dark}
              onBook={goToBooking}
            />
          ))}
        </div>
      </main>

      <section className={dark ? "bg-gray-800" : "bg-white"}>
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h3 className="text-3xl font-bold">Need help choosing a course?</h3>
            <p className={`mt-3 max-w-2xl leading-7 ${dark ? "text-gray-400" : "text-slate-600"}`}>
              Share your basic details and the team will guide you toward the program that fits your current needs.
            </p>
          </div>
          <button
            type="button"
            onClick={goToBooking}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
          >
            Start booking
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <Footer dark={dark} />
    </div>
  );
};

export default ServicePage;
