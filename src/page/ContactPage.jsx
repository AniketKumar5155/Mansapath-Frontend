import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../component/NavBar";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
} from "lucide-react";

const ContactPage = () => {
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
            Contact <span className="text-blue-600">Us</span>
          </h1>
          <p className="mt-6 text-xl text-gray-500">
            We’re here to listen, support, and guide you.
          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Let’s Start a Conversation
            </h2>
            <p className="text-gray-500 text-lg">
              Whether you’re seeking guidance, have a question, or simply want
              to understand our programs better — we’re just a message away.
            </p>
          </div>

          <div className="space-y-6">
            <InfoItem
              dark={dark}
              icon={Phone}
              title="Phone"
              value="+91 00000 00000"
            />
            <InfoItem
              dark={dark}
              icon={Mail}
              title="Email"
              value="support@manaspath.com"
            />
            <InfoItem
              dark={dark}
              icon={MapPin}
              title="Location"
              value="Motihari, Bihar, India"
            />
          </div>

          <div
            className={`rounded-3xl p-8 ${
              dark ? "bg-gray-800" : "bg-white"
            } shadow-lg`}
          >
            <MessageCircle className="text-blue-600 mb-4" size={28} />
            <p className="text-lg italic text-gray-500">
              “Sometimes, reaching out is the bravest step towards healing.”
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`rounded-3xl p-10 shadow-xl ${
            dark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-2xl font-semibold mb-8">Send Us a Message</h3>

          <form className="space-y-6">
            <Input dark={dark} placeholder="Your Name" />
            <Input dark={dark} placeholder="Email Address" type="email" />
            <Input dark={dark} placeholder="Phone Number" />
            <Textarea dark={dark} placeholder="Your Message" />

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-2xl font-medium hover:bg-blue-700 transition"
            >
              <Send size={18} />
              Send Message
            </button>
          </form>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div
          className={`h-72 rounded-3xl flex items-center justify-center border-2 border-dashed ${
            dark
              ? "border-gray-700 bg-gray-800"
              : "border-gray-300 bg-white"
          }`}
        >
          <p className="text-gray-500">Map Integration Here</p>
        </div>
      </section>
    </div>
  );
};

const InfoItem = ({ icon: Icon, title, value, dark }) => (
  <div className="flex items-start gap-4">
    <div
      className={`p-4 rounded-2xl ${
        dark ? "bg-blue-600/20" : "bg-blue-100"
      } text-blue-600`}
    >
      <Icon size={22} />
    </div>
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-gray-500">{value}</p>
    </div>
  </div>
);

const Input = ({ placeholder, type = "text", dark }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`w-full px-5 py-4 rounded-2xl border outline-none transition ${
      dark
        ? "bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-500 focus:border-blue-600"
        : "bg-gray-50 border-gray-300 focus:border-blue-600"
    }`}
  />
);

const Textarea = ({ placeholder, dark }) => (
  <textarea
    rows="5"
    placeholder={placeholder}
    className={`w-full px-5 py-4 rounded-2xl border outline-none transition resize-none ${
      dark
        ? "bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-500 focus:border-blue-600"
        : "bg-gray-50 border-gray-300 focus:border-blue-600"
    }`}
  />
);

export default ContactPage;
