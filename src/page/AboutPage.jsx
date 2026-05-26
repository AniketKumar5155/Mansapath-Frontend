import { createElement, useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  HeartHandshake,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/NavBar";
import Footer from "../component/Footer";
import founderPhoto from "../assets/founder-updated-crop.jpg";

const principles = [
  {
    icon: Building2,
    title: "Who We Are",
    text: "Manpath creates a structured, compassionate space where mental fitness is supported through practical tools, guided reflection, and human connection.",
  },
  {
    icon: Target,
    title: "Our Vision",
    text: "Our goal is to make mental fitness approachable across age groups, from children building emotional awareness to seniors preserving cognitive vitality.",
  },
  {
    icon: ShieldCheck,
    title: "How We Guide",
    text: "We listen first, understand the concern, and help each person take the next step with clarity, confidence, and trust.",
  },
];

const highlights = [
  "Neuroscience-based mindset practices",
  "Personalized guidance with empathy",
  "Confidence, focus, and transformation",
];

const stats = [
  { label: "Approach", value: "Practical" },
  { label: "Focus", value: "Mindset" },
  { label: "Support", value: "Guided" },
];

const AboutPage = () => {
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

  const navigate = useNavigate();

  const toggleDark = () => {
    setDark((prev) => {
      localStorage.setItem("theme", JSON.stringify(!prev));
      return !prev;
    });
  };

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
              About Manpath
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Building mental fitness with clarity, care, and science.
            </h1>
            <p className={`mt-5 max-w-2xl text-lg leading-8 ${dark ? "text-gray-300" : "text-slate-600"}`}>
              Guiding individuals toward confidence, focus, and transformation
              through neuroscience-based mindset practices.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/book-session")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
              >
                Book session
                <ArrowRight size={18} />
              </button>
              <a
                href="#founder"
                className={`inline-flex items-center justify-center rounded-xl border px-6 py-3 text-sm font-semibold transition ${
                  dark
                    ? "border-white/10 text-gray-200 hover:bg-white/5"
                    : "border-slate-300 text-slate-700 hover:bg-white"
                }`}
              >
                Meet the founder
              </a>
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className={`rounded-2xl border p-5 shadow-sm ${
              dark ? "border-white/10 bg-gray-800/80" : "border-slate-200 bg-white"
            }`}
          >
            <div className="grid gap-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className={`flex items-center gap-4 rounded-xl p-4 ${
                    dark ? "bg-slate-900/55" : "bg-slate-50"
                  }`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
                    <CheckCircle2 size={21} />
                  </span>
                  <p className="font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </Motion.div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 max-w-3xl">
          <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${dark ? "text-cyan-200" : "text-cyan-700"}`}>
            Our foundation
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            A modern approach to mind training and emotional growth
          </h2>
          <p className={`mt-3 leading-7 ${dark ? "text-gray-400" : "text-slate-600"}`}>
            Manpath combines empathy with structured practice so support feels
            practical, stigma-free, and useful in daily life.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {principles.map(({ icon, title, text }) => (
            <Motion.article
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className={`rounded-2xl border p-6 shadow-sm ${
                dark ? "border-white/10 bg-gray-800" : "border-slate-200 bg-white"
              }`}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  dark ? "bg-cyan-400/10 text-cyan-200" : "bg-cyan-50 text-cyan-700"
                }`}
              >
                {createElement(icon, { size: 25 })}
              </span>
              <h3 className="mt-5 text-2xl font-bold">{title}</h3>
              <p className={`mt-4 text-sm leading-6 ${dark ? "text-gray-300" : "text-slate-600"}`}>
                {text}
              </p>
            </Motion.article>
          ))}
        </div>
      </main>

      <FounderSection dark={dark} />

      <section className={dark ? "bg-gray-800" : "bg-white"}>
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${dark ? "text-cyan-200" : "text-cyan-700"}`}>
              Care principle
            </p>
            <h3 className="mt-3 text-3xl font-bold">
              Healing begins when understanding meets compassion.
            </h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`rounded-xl border px-5 py-4 ${
                  dark ? "border-white/10 bg-slate-900/45" : "border-slate-200 bg-slate-50"
                }`}
              >
                <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${dark ? "text-gray-400" : "text-slate-500"}`}>
                  {stat.label}
                </p>
                <p className="mt-1 text-xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer dark={dark} />
    </div>
  );
};

const FounderSection = ({ dark }) => (
  <section id="founder" className="mx-auto max-w-7xl px-6 py-16">
    <Motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`grid overflow-hidden rounded-2xl border shadow-sm lg:grid-cols-[0.95fr_1.05fr] ${
        dark ? "border-white/10 bg-gray-800" : "border-slate-200 bg-white"
      }`}
    >
      <div className="min-h-[360px] bg-slate-100 lg:min-h-[520px]">
        <img
          src={founderPhoto}
          alt="B.BINAY, founder of Manpath"
          className="h-full w-full object-cover object-top"
        />
      </div>

      <div className="flex flex-col justify-center p-6 md:p-10">
        <span
          className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${
            dark ? "bg-cyan-400/10 text-cyan-200" : "bg-cyan-50 text-cyan-700"
          }`}
        >
          <HeartHandshake size={25} />
        </span>
        <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${dark ? "text-cyan-200" : "text-cyan-700"}`}>
          Founder
        </p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">B.BINAY</h2>
        <p className={`mt-2 text-lg font-semibold ${dark ? "text-gray-300" : "text-slate-600"}`}>
          Mental fitness coach and NLP trainer
        </p>

        <blockquote
          className={`mt-8 rounded-xl border p-6 text-xl font-semibold italic leading-8 ${
            dark ? "border-white/10 bg-slate-900/45 text-gray-200" : "border-slate-200 bg-slate-50 text-slate-700"
          }`}
        >
          <Quote className="mb-4 text-cyan-600" size={26} />
          "True transformation begins when the mind feels safe enough to focus,
          learn, and grow."
        </blockquote>

        <p className={`mt-7 leading-7 ${dark ? "text-gray-400" : "text-slate-600"}`}>
          Manpath was shaped with the belief that empathy and expertise should
          work together. Every program is designed to help people feel
          understood before they are guided toward clarity, confidence, and
          meaningful change.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          {["Empathy-led", "Science-backed", "Practice-focused"].map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${
                dark ? "bg-cyan-400/10 text-cyan-200" : "bg-cyan-50 text-cyan-700"
              }`}
            >
              <Sparkles size={15} />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Motion.div>
  </section>
);

export default AboutPage;
