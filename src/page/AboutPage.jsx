import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../component/NavBar";
import { Quote, Target, Building2, User } from "lucide-react";

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

  const toggleDark = () => {
    setDark((prev) => {
      localStorage.setItem("theme", JSON.stringify(!prev));
      return !prev;
    });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
      }`}
    >
      <Navbar dark={dark} toggleDark={toggleDark} />

      <section className="relative py-28 text-center">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-transparent to-blue-600/10" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto px-6"
        >
          <h1 className="text-5xl font-bold tracking-tight">
            About <span className="text-blue-600">Manaspath</span>
          </h1>
          <p className="mt-6 text-xl text-gray-500">
            Guiding minds. Nurturing growth. Empowering lives.
          </p>
        </motion.div>
      </section>

      <Section
        dark={dark}
        icon={Building2}
        title="Who We Are"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Manaspath was
        founded with a singular mission — to create a safe, structured, and
        compassionate space where mental well-being is nurtured through
        science-backed practices and human connection.
      </Section>

      <Section
        dark={dark}
        icon={Target}
        title="Our Vision & Goals"
        reverse
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Our goal is to
        make mental wellness accessible across all age groups — from children
        developing emotional awareness to seniors preserving cognitive vitality.
        We believe growth is lifelong.
      </Section>

      <Section
        dark={dark}
        icon={User}
        title="Founder"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. The founder of
        Manaspath envisioned a platform where empathy meets expertise. With a
        deep commitment to mental health advocacy, the foundation of Manaspath
        rests on trust, integrity, and personalized care.
      </Section>

      <section className="py-24 relative">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 via-transparent to-blue-600/20" />
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`relative max-w-3xl mx-auto px-8 py-14 rounded-3xl shadow-xl text-center ${
            dark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <Quote className="mx-auto mb-6 text-blue-600" size={40} />
          <p className="text-2xl font-medium leading-relaxed italic">
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Healing
            begins when understanding meets compassion.”
          </p>
          <p className="mt-6 font-semibold text-blue-600">
            — Founder, Manaspath
          </p>
        </motion.div>
      </section>
    </div>
  );
};

const Section = ({ icon: Icon, title, children, dark, reverse }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center ${
      reverse ? "md:[&>*:first-child]:order-2" : ""
    }`}
  >
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div
          className={`p-4 rounded-2xl ${
            dark ? "bg-blue-600/20" : "bg-blue-100"
          } text-blue-600`}
        >
          <Icon size={32} />
        </div>
        <h2 className="text-3xl font-semibold">{title}</h2>
      </div>

      <p className="text-lg leading-relaxed text-gray-500">{children}</p>
    </div>

    <div
      className={`rounded-3xl p-10 shadow-lg ${
        dark ? "bg-gray-800" : "bg-white"
      }`}
    >
      <p className="text-gray-500 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  </motion.section>
);

export default AboutPage;
