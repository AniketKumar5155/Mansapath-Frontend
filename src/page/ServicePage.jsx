import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Brain, Eye, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/NavBar";
import Footer from "../component/Footer";

const programNotes = {
  "Brain Gym": "Focus routines, stress regulation, confidence building, and study support for teenagers and young adults.",
  Bodh: "Self-awareness, emotional regulation, and healthier responses to stress, anger, and overwhelm.",
  Chaitanya: "Gentle practices for older adults that support calm, clarity, confidence, and purposeful daily rhythm.",
};

const Section = ({ icon, title, subtitle, children, reverse, dark }) => (
  <Motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-20 ${
      reverse ? "md:[&>*:first-child]:order-2" : ""
    }`}
  >
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div
          className={`p-4 rounded-2xl ${
            dark ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
          }`}
        >
          {icon}
        </div>

        <div>
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
          <p className={dark ? "text-gray-400" : "text-gray-500"}>
            {subtitle}
          </p>
        </div>
      </div>

      <p className={`text-lg leading-relaxed ${dark ? "text-gray-300" : "text-gray-600"}`}>
        {children}
      </p>
    </div>

    <div
      className={`rounded-3xl border p-8 shadow-lg ${
        dark
          ? "bg-gray-800/70 border-gray-700 text-gray-300"
          : "bg-white border-gray-200 text-gray-600"
      }`}
    >
      <p className="text-lg leading-relaxed">{programNotes[title]}</p>
    </div>
  </Motion.section>
);

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

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
      }`}
    >
      <Navbar dark={dark} toggleDark={toggleDark} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 via-transparent to-blue-500/30" />
        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
          <Motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold"
          >
            Our <span className="text-blue-600">Services</span>
          </Motion.h1>

          <Motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`mt-6 max-w-3xl mx-auto text-xl ${
              dark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Mental wellness support for students, adults, and seniors through
            practical tools, guided sessions, and compassionate follow-up.
          </Motion.p>

          <button
            className="mt-8 px-8 py-3 rounded-2xl bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
            onClick={() => navigate("/book-session")}
          >
            Book Session
          </button>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6">
        <Section icon={<Brain size={32} />} title="Brain Gym" subtitle="Strengthening the mind" dark={dark}>
          Brain Gym 360 supports teenagers in managing academic pressure,
          improving focus, and understanding emotions better. Students learn
          stress regulation, self-confidence, and resilience for exams,
          relationships, and future goals.
        </Section>

        <Section icon={<Eye size={32} />} title="Bodh" subtitle="Awareness and understanding" reverse dark={dark}>
          Bodh cultivates awareness of thoughts, emotions, and behavioral
          patterns. It encourages people to pause, reflect, and respond
          mindfully instead of reacting impulsively.
        </Section>

        <Section icon={<Sparkles size={32} />} title="Chaitanya" subtitle="Awakening inner potential" dark={dark}>
          Chaitanya is a gentle course for older adults. It promotes mental
          clarity, emotional balance, and inner calm through simple daily
          practices that encourage active and fulfilling ageing.
        </Section>
      </main>

      <section className="relative">
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/30 via-blue-500/10 to-blue-500/30" />
        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
          <h3 className="text-4xl font-semibold">Start with one conversation</h3>
          <p className={`mt-4 text-lg ${dark ? "text-gray-400" : "text-gray-600"}`}>
            Share what you are facing and the team will guide the next step.
          </p>
          <button
            className="mt-8 px-10 py-4 rounded-2xl bg-blue-600 text-white font-medium shadow-lg hover:bg-blue-700 transition cursor-pointer"
            onClick={() => navigate("/book-session")}
          >
            Book Session
          </button>
        </div>
      </section>

      <Footer dark={dark} />
    </div>
  );
};

export default ServicePage;
