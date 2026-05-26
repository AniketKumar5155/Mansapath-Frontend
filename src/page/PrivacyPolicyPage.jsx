import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { ClipboardList, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import Navbar from "../component/NavBar";
import Footer from "../component/Footer";

const policySections = [
  {
    icon: ClipboardList,
    title: "Information We Collect",
    text: "We may collect details you submit while booking a session, creating a profile, or using Manpath services. This can include your name, contact details, age-related information, service preferences, and notes needed to provide support.",
  },
  {
    icon: ShieldCheck,
    title: "How We Use Information",
    text: "We use your information to manage appointments, respond to service requests, provide mental fitness support, improve our programs, maintain internal records, and meet operational or legal requirements.",
  },
  {
    icon: LockKeyhole,
    title: "How We Protect Information",
    text: "We use reasonable administrative and technical safeguards to protect personal information from unauthorized access, misuse, disclosure, alteration, or loss.",
  },
  {
    icon: Mail,
    title: "Your Choices",
    text: "You can ask us to update, correct, or review your personal information. You may also request that we limit non-essential communication where applicable.",
  },
];

const PrivacyPolicyPage = () => {
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

      <section className="relative py-24 text-center">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-transparent to-blue-600/10" />
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto px-6"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Privacy <span className="text-blue-600">Policy</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-500">
            How Manpath handles personal information with care and confidentiality.
          </p>
          <p className="mt-4 text-sm text-gray-500">Last updated: May 7, 2026</p>
        </Motion.div>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <Motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`rounded-3xl p-6 sm:p-10 shadow-lg ${
            dark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <p className="text-lg leading-relaxed text-gray-500">
            Manpath respects your privacy. This policy explains what information we
            collect, why we collect it, and how we handle it when you use our website,
            booking forms, and wellness services.
          </p>
        </Motion.section>

        <section className="grid md:grid-cols-2 gap-8 py-12">
          {policySections.map((section) => {
            const SectionIcon = section.icon;

            return (
              <Motion.article
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`p-6 rounded-3xl shadow-md ${
                  dark ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div
                  className={`mb-5 inline-flex p-4 rounded-2xl ${
                    dark ? "bg-blue-600/20" : "bg-blue-100"
                  } text-blue-600`}
                >
                  <SectionIcon size={28} />
                </div>
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                <p className="leading-relaxed text-gray-500">{section.text}</p>
              </Motion.article>
            );
          })}
        </section>

        <Motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`rounded-3xl p-6 sm:p-10 shadow-lg ${
            dark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Sharing and Retention</h2>
          <p className="leading-relaxed text-gray-500">
            We do not sell personal information. We may share information only with
            authorized team members, service providers who help us operate the platform,
            or when required by law. We keep information only for as long as needed for
            the purposes described in this policy, unless a longer period is required by
            law or legitimate service needs.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Policy Updates</h2>
          <p className="leading-relaxed text-gray-500">
            We may update this policy when our practices, services, or legal obligations
            change. The updated date above reflects the latest version available on this
            website.
          </p>
        </Motion.section>
      </main>

      <Footer dark={dark} />
    </div>
  );
};

export default PrivacyPolicyPage;

