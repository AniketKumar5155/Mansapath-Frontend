import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/NavBar";
import Footer from "../component/Footer";
import {
  ArrowRight,
  HeartPulse,
  Brain,
  CalendarDays,
  IndianRupee,
  Users,
  ShieldCheck,
} from "lucide-react";
import HomepageCard from "../component/HomepageCard";
import HomepageOfferCard from "../component/HomepageOfferCard";
import Hero_Poster from "../assets/Hero_Poster.jpeg";

const HomePage = () => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") return true;
    if (savedTheme === "light") return false;
    return false;
  });
  const [showEnglishIntro, setShowEnglishIntro] = useState(false);

  const toggleDark = () => {
    setDark((prev) => {
      localStorage.setItem("theme", prev ? "light" : "dark");
      return !prev;
    });
  };

  const HOMEPAGECARD_DATA = [
    { dark: dark, icon: <Brain size={28} />, title: "Expert Therapists", desc: "Certified professionals guiding every step of your mental fitness journey." },
    { dark: dark, icon: <ShieldCheck size={28} />, title: "Safe & Confidential", desc: "Your privacy and comfort are our top priorities." },
    { dark: dark, icon: <HeartPulse size={28} />, title: "Holistic Support", desc: "Comprehensive care addressing emotional, cognitive, and social well-being." },
    { dark: dark, icon: <Users size={28} />, title: "Supportive Community", desc: "Join a community that listens, understands, and grows together." },
  ];

  const HOMEPAGEOFFERCARD_DATA = [
    {
      dark,
      title: "Brain Gym",
      desc: "Students, teenagers, and young adults",
      originalFee: "1999",
      fee: "999",
      meta1: "66 days course",
      meta2: "2 online classes weekly",
      status: "Open",
    },
    {
      dark,
      title: "Chaitanya",
      desc: "Adults and older adults",
      originalFee: "1999",
      fee: "999",
      meta1: "66 days course",
      meta2: "2 online classes weekly",
      status: "Open",
    },
    {
      dark,
      title: "Bodh",
      desc: "Awareness and understanding",
      fee: "Coming soon",
      meta: "Launching soon",
      status: "Coming soon",
    },
  ];
  return (
    <div
      className={`min-h-screen transition-colors duration-500 scroll-smooth ${dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
        }`}
    >
      <Navbar dark={dark} toggleDark={toggleDark} />

      <section
        className={`py-16 transition ${dark
          ? "bg-linear-to-br from-blue-500/20 via-transparent to-blue-500/30"
          : "bg-linear-to-br from-blue-50 to-blue-100"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 grid gap-12 items-center md:grid-cols-[0.9fr_1.1fr] lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex justify-center items-center order-1">
            <div
              className={`w-full max-w-[300px] overflow-hidden rounded-2xl shadow-xl sm:max-w-[340px] lg:max-w-[390px] ${dark ? "bg-gray-800" : "bg-white"
                }`}
            >
              <img
                src={Hero_Poster}
                alt="Mental health illustration"
                className="block w-full object-contain"
              />
            </div>
          </div>

          <Motion.div
            className="order-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold leading-tight mb-6">
              Manpath - मन से मंजिल तक
            </h2>
            <p className="mb-4 text-gray-500 leading-relaxed">
              MANPATH एक ऐसा अभियान है जो मानसिक फिटनेस, सकारात्मक सोच और आत्म-विकास के माध्यम से लोगों को बेहतर जीवन की दिशा देने का प्रयास करता है।
            </p>
            <p className="mb-4 text-gray-500 leading-relaxed">
              At ManPath, we believe mental fitness is for every stage of life.
              {showEnglishIntro && (
                <>
                  {" "}Our programs are tailored to help children, teenagers,
                  and seniors enhance cognitive abilities, emotional balance,
                  and holistic well-being. Discover a supportive journey
                  towards clarity, focus, and inner peace.
                </>
              )}
              <button
                type="button"
                onClick={() => setShowEnglishIntro((prev) => !prev)}
                className="ml-2 font-semibold text-blue-600 transition hover:text-blue-700"
              >
                {showEnglishIntro ? "See less" : "See more"}
              </button>
            </p>

            <div className="flex gap-4 mt-6">
              <button
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-blue-700 transition"
                onClick={() => navigate("/book-session")}
              >
                Book Session
              </button>

              <a
                href="#services"
                className={`flex-1 text-center border px-6 py-3 rounded-2xl shadow transition ${dark
                  ? "border-gray-600 text-gray-200 hover:bg-gray-700"
                  : "border-blue-600 text-blue-600 hover:bg-blue-50"
                  }`}
              >
                Learn More
              </a>
            </div>

          </Motion.div>
        </div>
      </section>

      <section
        id="about"
        className={`py-20 transition ${dark ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">Why Choose Us</h3>
          <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
            Our approach blends empathy, experience, and personalized care to provide
            meaningful mental fitness support.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {HOMEPAGECARD_DATA.map(card => {
              return (
                <HomepageCard
                  key={card.title}
                  dark={card.dark}
                  icon={card.icon}
                  title={card.title}
                  desc={card.desc}
                />
              )
            })}
          </div>
        </div>
      </section>

      <section
        id="services"
        className={`py-20 transition ${dark ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span
              className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold ${dark ? "bg-cyan-400/10 text-cyan-200" : "bg-cyan-50 text-cyan-700"
                }`}
            >
              Explore services
            </span>
            <h3 className="mt-4 text-3xl font-bold">Choose the right ManPath program</h3>
            <p className="mt-3 text-gray-500">
              Course details, fees, duration, and weekly class plans are available on the services page.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {HOMEPAGEOFFERCARD_DATA.map(card => {
              return (
                <HomepageOfferCard
                  key={card.title}
                  dark={card.dark}
                  title={card.title}
                  desc={card.desc}
                  fee={card.fee}
                  originalFee={card.originalFee}
                  meta1={card.meta1}
                  meta2={card.meta2}
                  status={card.status}
                  onClick={() => navigate("/services")}
                />
              )
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/services")}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 transition cursor-pointer"
            >
              View all service details
              <ArrowRight size={18} />
            </button>
          </div>

          <div
            className={`mt-8 grid gap-3 rounded-2xl border p-5 text-sm sm:grid-cols-2 ${dark
                ? "border-white/10 bg-gray-800 text-gray-300"
                : "border-slate-200 bg-white text-slate-600"
              }`}
          >
            <div className="flex items-center gap-3">
              <IndianRupee size={18} className="text-cyan-600" />
              Brain Gym starts at Rs. 1499 and Chaitanya at Rs. 1999.
            </div>
            <div className="flex items-center gap-3">
              <CalendarDays size={18} className="text-cyan-600" />
              Each active course runs for 66 days with 2 online classes each week.
            </div>
          </div>
        </div>
      </section>

      <section className={`hidden lg:block py-20 transition ${dark ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`overflow-hidden rounded-2xl flex items-center justify-center ${dark ? "bg-gray-900" : "bg-gray-100"
              }`}
          >
            {/* <img */}
              {/* src={bannerImage} */}
              {/* alt="mental fitness illustration" */}
              {/* className="block w-full object-contain rounded-2xl" */}
            {/* /> */}
          </div>
        </div>
      </section>

      <Footer dark={dark} />
    </div>
  );
};

export default HomePage;
