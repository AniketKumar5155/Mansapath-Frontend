import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Building2, Quote, Target, User } from "lucide-react";
import Navbar from "../component/NavBar";
import Footer from "../component/Footer";

const sections = [
  {
    icon: Building2,
    title: "Who We Are",
    text: "Manaspath creates a safe, structured, and compassionate space where mental well-being can be supported through practical tools and human connection.",
    detail: "We focus on listening first, understanding the concern, and helping people take the next step with clarity.",
  },
  {
    icon: Target,
    title: "Our Vision & Goals",
    text: "Our goal is to make mental wellness accessible across age groups, from children developing emotional awareness to seniors preserving cognitive vitality.",
    detail: "We believe support should feel approachable, stigma-free, and useful in daily life.",
  },
  {
    icon: User,
    title: "Founder",
    text: "Manaspath was shaped with the belief that empathy and expertise should work together. The foundation rests on trust, integrity, and personalized care.",
    detail: "Every program is designed to help people feel understood before they are guided.",
  },
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
        <Motion.div
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
        </Motion.div>
      </section>

      {sections.map((section, index) => {
        const SectionIcon = section.icon;

        return (
          <Section
            key={section.title}
            dark={dark}
            icon={<SectionIcon size={32} />}
            title={section.title}
            detail={section.detail}
            reverse={index % 2 === 1}
          >
            {section.text}
          </Section>
        );
      })}

      <section className="py-24 relative">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 via-transparent to-blue-600/20" />
        <Motion.div
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
            Healing begins when understanding meets compassion.
          </p>
          <p className="mt-6 font-semibold text-blue-600">
            Manaspath care principle
          </p>
        </Motion.div>
      </section>

      <Footer dark={dark} />
    </div>
  );
};

const Section = ({ icon, title, children, detail, dark, reverse }) => (
  <Motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center ${
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
          {icon}
        </div>
        <h2 className="text-3xl font-semibold">{title}</h2>
      </div>

      <p className="text-lg leading-relaxed text-gray-500">{children}</p>
    </div>

    <div className={`rounded-3xl p-8 shadow-lg ${dark ? "bg-gray-800" : "bg-white"}`}>
      <p className="text-gray-500 leading-relaxed">{detail}</p>
    </div>
  </Motion.section>
);

export default AboutPage;
