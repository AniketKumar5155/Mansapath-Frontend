import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Sparkles, Eye } from "lucide-react";
import Navbar from "../component/NavBar";
import { useNavigate } from "react-router-dom";

const Section = ({ icon: Icon, title, subtitle, children, reverse, dark }) => (
  <motion.section
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
        {Icon && (
          <div
            className={`p-4 rounded-2xl ${
              dark ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
            }`}
          >
            <Icon size={32} />
          </div>
        )}

        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            {title}
          </h2>
          <p className={dark ? "text-gray-400" : "text-gray-500"}>
            {subtitle}
          </p>
        </div>
      </div>

      <p className={`text-lg leading-relaxed ${dark ? "text-gray-300" : "text-gray-600"}`}>
        {children}
      </p>
    </div>

    <div className="relative">
      <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-blue-500/20 via-transparent to-blue-500/30 blur-2xl" />
      <div
        className={`relative rounded-3xl border p-10 shadow-xl backdrop-blur ${
          dark
            ? "bg-gray-800/70 border-gray-700 text-gray-300"
            : "bg-white/70 border-gray-200 text-gray-600"
        }`}
      >
        <p className="text-lg leading-relaxed">
          Our programs are thoughtfully designed to combine practical tools,
          reflective exercises, and guided sessions that support emotional
          well-being. Each experience is structured to be simple, accessible,
          and meaningful — helping individuals grow with clarity and confidence.
        </p>
      </div>
    </div>
  </motion.section>
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
    setDark(prev => {
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

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 via-transparent to-blue-500/30" />
        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold"
          >
            Our <span className="text-blue-600">Services</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`mt-6 max-w-3xl mx-auto text-xl ${
              dark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            We are dedicated to nurturing mental wellness across every stage of life.
            Our programs are built on empathy, science-backed practices, and
            practical techniques that help individuals develop clarity,
            confidence, and emotional strength.
          </motion.p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6">
        {/* Brain Gym */}
        <Section
          icon={Brain}
          title="Brain Gym"
          subtitle="Strengthening the mind"
          dark={dark}
        >
          Brain Gym 360 supports teenagers in managing academic pressure,
          improving focus, and understanding their emotions better.
          Through structured activities and interactive sessions, students
          learn how to regulate stress, build self-confidence, and develop
          resilience. The program equips them with lifelong mental skills
          to navigate exams, relationships, and future ambitions calmly and confidently.
        </Section>

        {/* Bodh */}
        <Section
          icon={Eye}
          title="Bodh"
          subtitle="Awareness and understanding"
          reverse
          dark={dark}
        >
          Bodh focuses on cultivating awareness — of thoughts, emotions,
          and behavioral patterns. It encourages individuals to pause,
          reflect, and respond mindfully rather than react impulsively.
          By strengthening emotional intelligence and self-understanding,
          Bodh empowers participants to build healthier relationships
          and make balanced, thoughtful decisions in everyday life.
        </Section>

        {/* Chaitanya */}
        <Section
          icon={Sparkles}
          title="Chaitanya"
          subtitle="Awakening inner potential"
          dark={dark}
        >
          Chaitanya is a gentle and supportive mental wellness course
          designed especially for older adults. It promotes mental clarity,
          emotional balance, and inner calm through simple daily practices.
          Participants experience improved confidence, reduced anxiety,
          and a renewed sense of purpose — encouraging peaceful,
          active, and fulfilling ageing.
        </Section>
      </main>

      {/* CTA Section */}
      <section className="relative mt-32">
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/30 via-blue-500/10 to-blue-500/30" />
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <h3 className="text-4xl font-semibold">
            Experience the Transformation
          </h3>

          <p className={`mt-4 text-lg ${dark ? "text-gray-400" : "text-gray-600"}`}>
            Begin your journey toward mental clarity, emotional balance,
            and personal growth. Small daily practices can create
            meaningful lifelong change.
          </p>

          <button
            className="mt-10 px-10 py-4 rounded-2xl bg-blue-600 text-white font-medium shadow-lg hover:scale-[1.03] transition cursor-pointer"
            onClick={() => navigate("/")}
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
