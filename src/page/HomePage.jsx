import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/NavBar";
import Footer from "../component/Footer";
import {
  HeartPulse,
  Brain,
  Users,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import homepageImage from "../assets/Homepage_Image.jpeg";
import bannerImage from "../assets/M.png";
import instagramIcon from "../assets/icons8-instagram-logo-94.png";
import facebookIcon from "../assets/icons8-facebook-48.png";

const HomePage = () => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") return true;
    if (savedTheme === "light") return false;
    return false;
  });

  const toggleDark = () => {
    setDark((prev) => {
      localStorage.setItem("theme", prev ? "light" : "dark");
      return !prev;
    });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 scroll-smooth ${dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
        }`}
    >
      <Navbar dark={dark} toggleDark={toggleDark} />

      {/* Hero Section */}
      <section
        className={`py-16 transition ${dark
            ? "bg-linear-to-br from-blue-500/20 via-transparent to-blue-500/30"
            : "bg-linear-to-br from-blue-50 to-blue-100"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center items-center order-1">
            <div
              className={`h-64 md:h-96 rounded-2xl flex items-center justify-center ${dark ? "bg-gray-800" : "bg-white"
                }`}
            >
              <img
                src={homepageImage}
                alt="Mental health illustration"
                className="w-full h-full object-contain rounded-2xl"
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
              You Deserve Peace of Mind
            </h2>
            <p className="mb-4 text-gray-500 leading-relaxed">
              At ManasPath, we believe mental wellness is for every stage of life. Our programs are
              tailored to help children, teenagers, and seniors enhance cognitive abilities,
              emotional balance, and holistic well-being. Discover a supportive journey towards
              clarity, focus, and inner peace.
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
            meaningful mental wellness support.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            <Card
              dark={dark}
              icon={<Brain size={28} />}
              title="Expert Therapists"
              desc="Certified professionals guiding every step of your mental wellness journey."
            />
            <Card
              dark={dark}
              icon={<ShieldCheck size={28} />}
              title="Safe & Confidential"
              desc="Your privacy and comfort are our top priorities."
            />
            <Card
              dark={dark}
              icon={<HeartPulse size={28} />}
              title="Holistic Support"
              desc="Comprehensive care addressing emotional, cognitive, and social well-being."
            />
            <Card
              dark={dark}
              icon={<Users size={28} />}
              title="Supportive Community"
              desc="Join a community that listens, understands, and grows together."
            />
          </div>
        </div>
      </section>

      <section
        id="services"
        className={`py-20 transition ${dark ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">What We Offer</h3>

          <div className="grid md:grid-cols-3 gap-10">
            <OfferCard
              dark={dark}
              title="Individual Therapy"
              desc="One-on-one sessions tailored to your needs for mental clarity and balance."
            />
            <OfferCard
              dark={dark}
              title="Group Counseling"
              desc="Interactive group sessions promoting shared growth and emotional support."
            />
            <OfferCard
              dark={dark}
              title="Stress & Anxiety Management"
              desc="Techniques and guidance to reduce stress and improve mental resilience."
            />
            <OfferCard
              dark={dark}
              title="Career & Academic Guidance"
              desc="Support for students and professionals to enhance decision-making and focus."
            />
            <OfferCard
              dark={dark}
              title="Mindfulness & Meditation"
              desc="Practices to improve concentration, emotional regulation, and inner peace."
            />
            <OfferCard
              dark={dark}
              title="Emotional Support Programs"
              desc="Tailored programs helping individuals cope with life challenges effectively."
            />
          </div>
        </div>
      </section>

      <section className={`hidden lg:block py-20 transition ${dark ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`h-72 md:h-96 rounded-2xl flex items-center justify-center ${dark ? "bg-gray-900" : "bg-gray-100"
              }`}
          >
              <img
              src={bannerImage}
              alt="Mental wellness illustration"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section
        id="contact"
        className={`py-20 transition ${dark ? "bg-gray-900" : "bg-blue-50"}`}
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
            <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
              If someone is struggling, reach out. We're here to help.
            </p>

            <ul className="grid gap-4 md:grid-cols-3">
              <li className={`flex items-center justify-center gap-3 rounded-2xl p-4 ${dark ? "bg-gray-800" : "bg-white"}`}>
                <Phone size={18} /> +91 00000 00000
              </li>
              <li className={`flex items-center justify-center gap-3 rounded-2xl p-4 ${dark ? "bg-gray-800" : "bg-white"}`}>
                <Mail size={18} /> support@manaspath.com
              </li>
              <li className={`flex items-center justify-center gap-3 rounded-2xl p-4 ${dark ? "bg-gray-800" : "bg-white"}`}>
                <MapPin size={18} /> Motihari, Bihar, India
              </li>
            </ul>

            <div className="mt-8">
              <p
                className={`text-xl font-bold mb-3 ${dark ? "text-gray-300" : "text-gray-800"
                  }`}
              >
                Follow Us
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://www.instagram.com/manaspath25/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <img
                    src={instagramIcon}
                    alt="Instagram"
                    className="h-7 w-7"
                  />
                  <span className="text-sm font-semibold">Instagram</span>
                </a>

                <a
                  href="https://www.facebook.com/manaspath25/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <img
                    src={facebookIcon}
                    alt="Facebook"
                    className="h-7 w-7"
                  />
                  <span className="text-sm font-semibold">Facebook</span>
                </a>
              </div>
            </div>
        </div>
      </section>

      <Footer dark={dark} />
    </div>
  );
};

const Card = ({ icon, title, desc, dark }) => (
  <Motion.div
    whileHover={{ y: -6 }}
    className={`p-6 rounded-2xl shadow-md transition ${dark ? "bg-gray-700" : "bg-white"
      }`}
  >
    <div className="text-blue-600 mb-4">{icon}</div>
    <h4 className="font-semibold mb-2">{title}</h4>
    <p className="text-gray-400 text-sm">{desc}</p>
  </Motion.div>
);

const OfferCard = ({ title, desc, dark }) => (
  <Motion.div
    whileHover={{ scale: 1.02 }}
    className={`p-8 rounded-2xl shadow-md transition ${dark ? "bg-gray-800" : "bg-white"
      }`}
  >
    <h4 className="font-semibold mb-3">{title}</h4>
    <p className="text-gray-500 text-sm">{desc}</p>
  </Motion.div>
);

export default HomePage;
