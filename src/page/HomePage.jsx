// src\assets\Banner.jpeg --> Banner
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    HeartPulse,
    Brain,
    Users,
    ShieldCheck,
    Phone,
    Mail,
    MapPin,
    Moon,
    Sun
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

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

    return (
        <div
            className={`min-h-screen transition-colors duration-500 scroll-smooth ${dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
                }`}
        >
            <header
                className={`shadow-sm sticky top-0 z-50 transition ${dark ? "bg-gray-800" : "bg-white"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <img
                        src="src/assets/helloUpdated.png"
                        alt="Manasapath Logo"
                        className="h-12 w-12 cursor-pointer"
                        onClick={() => navigate("/")}
                    />

                    <nav className="space-x-8 hidden md:block">
                        <a href="#" className="hover:text-blue-600 hover:font-bold">Home</a>
                        <a href="#services" className="hover:text-blue-600 hover:font-bold">Services</a>
                        <a href="#about" className="hover:text-blue-600 hover:font-bold">About</a>
                        <a href="#contact" className="hover:text-blue-600 hover:font-bold">Contact</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleDark}
                            className={`p-2 rounded-full transition hover:scale-110 ${dark ? "bg-gray-700 text-yellow-400" : "bg-gray-100"
                                }`}
                        >
                            {dark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <a href="#contact">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl shadow hover:bg-blue-700 transition">
                                Get Help
                            </button>
                        </a>
                    </div>
                </div>
            </header>

            <section
                className={`py-16 transition ${dark
                        ? "bg-linear-to-r from-gray-900 to-gray-800"
                        : "bg-linear-to-r from-blue-50 to-blue-100"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                    <div className="flex justify-center items-center order-1">
                        <div
                            className={`h-64 md:h-100 rounded-2xl flex items-center justify-center ${dark ? "bg-gray-800" : "bg-white"
                                }`}
                        >
                            <img
                                src="src\assets\Homepage_Image.jpeg"
                                alt="Mental health illustration"
                                className="w-full h-full object-contain rounded-2xl"
                            />
                        </div>
                    </div>

                    <motion.div
                        className="order-2"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold leading-tight mb-6">
                            You Deserve Peace of Mind
                        </h2>
                        <p className="mb-4 text-gray-500 leading-relaxed">
                            Our learning philosophy is lifelong. From childhood to senior years, education evolves with the mind. बोध (Bodha) nurtures foundational understanding and curiosity in children. Brain Gym 360 strengthens cognitive fitness, critical thinking, and adaptability in teenagers. चैतन्य (Chaitanya) supports seniors through memory revitalization, mental alertness, and conscious living. Together, these programs reflect our belief that learning is a continuous journey—custom-designed for every stage of life.
                        </p>
                    </motion.div>
                </div>
                <hr
                    className={`my-10 border-0 h-px ${dark
                            ? "bg-linear-to-r from-transparent via-gray-600 to-transparent"
                            : "bg-linear-to-r from-transparent via-gray-400 to-transparent"
                        }`}
                />

                <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-col md:flex-row gap-4 justify-center">
                    <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-blue-700 transition cursor-pointer"
                        onClick={() => navigate("/book-session")}
                    >
                        Book Session
                    </button>

                    <a href="#services">
                        <button
                            className={`border px-6 py-3 rounded-2xl shadow transition cursor-pointer ${dark
                                    ? "border-gray-600 text-gray-200 hover:bg-gray-700"
                                    : "border-blue-600 text-blue-600 hover:bg-blue-50"
                                }`}
                        >
                            Learn More
                        </button>
                    </a>
                </div>
            </section>

            <section
                id="about"
                className={`py-20 transition ${dark ? "bg-gray-800" : "bg-white"}`}
            >
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h3 className="text-3xl font-bold mb-4">Why Choose Us</h3>
                    <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
                        Our approach blends empathy, experience and personalized care.
                    </p>

                    <div className="grid md:grid-cols-4 gap-8">
                        <Card dark={dark} icon={<Brain size={28} />} title="Expert Therapists" desc="Certified professionals dedicated to your wellbeing." />
                        <Card dark={dark} icon={<ShieldCheck size={28} />} title="Safe & Confidential" desc="Your privacy and comfort come first." />
                        <Card dark={dark} icon={<HeartPulse size={28} />} title="Holistic Support" desc="Tailored guidance for emotional and mental balance." />
                        <Card dark={dark} icon={<Users size={28} />} title="Supportive Community" desc="A space that truly listens and understands." />
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
                        <OfferCard dark={dark} title="Individual Therapy" />
                        <OfferCard dark={dark} title="Group Counseling" />
                        <OfferCard dark={dark} title="Stress & Anxiety Management" />
                        <OfferCard dark={dark} title="Career & Academic Guidance" />
                        <OfferCard dark={dark} title="Mindfulness & Meditation" />
                        <OfferCard dark={dark} title="Emotional Support Programs" />
                    </div>
                </div>
            </section>

            <section className={`py-20 transition ${dark ? "bg-gray-800" : "bg-white"}`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div
                        className={`h-72 rounded-2xl flex items-center justify-center ${dark ? "bg-gray-900" : "bg-gray-100"
                            }`}
                    >
                        <img
                            src="src/assets/M.png"
                            alt="Illustration"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                </div>
            </section>

            <section
                id="contact"
                className={`py-20 transition ${dark ? "bg-gray-900" : "bg-blue-50"}`}
            >
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
                    <div>
                        <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
                        <p className="text-gray-500 mb-6">
                            If someone is struggling, reach out. We're here to help.
                        </p>

                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <Phone size={18} /> +91 00000 00000
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} /> support@manasapath.com
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin size={18} /> Motihari, Bihar, India
                            </li>
                        </ul>
                    </div>

                    <div
                        className={`h-64 border-2 border-dashed rounded-2xl flex items-center justify-center ${dark ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"
                            }`}
                    >
                        Map
                    </div>
                </div>
            </section>

            <Footer dark={dark} />
        </div>
    );
};

const Card = ({ icon, title, desc, dark }) => (
    <motion.div
        whileHover={{ y: -6 }}
        className={`p-6 rounded-2xl shadow-md transition ${dark ? "bg-gray-700" : "bg-white"
            }`}
    >
        <div className="text-blue-600 mb-4">{icon}</div>
        <h4 className="font-semibold mb-2">{title}</h4>
        <p className="text-gray-500 text-sm">{desc}</p>
    </motion.div>
);

const OfferCard = ({ title, dark }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className={`p-8 rounded-2xl shadow-md transition ${dark ? "bg-gray-800" : "bg-white"
            }`}
    >
        <h4 className="font-semibold mb-3">{title}</h4>
        <p className="text-gray-500 text-sm">Detailed description placeholder.</p>

        <div
            className={`mt-6 h-32 rounded-xl flex items-center justify-center ${dark ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-300"
                }`}
        >
           <img
    src="src\assets\Banner.jpeg"
    alt="Manasapath Logo"
    className="object-contain h-full"
/>
        </div>
    </motion.div>
);

const Footer = ({ dark }) => (
    <footer
        className={`transition ${dark ? "bg-black text-gray-400" : "bg-gray-900 text-gray-300"
            } mt-10`}
    >
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
            <div>
                <h4 className="text-lg font-semibold mb-4">Manasapath</h4>
                <p className="text-sm">
                    Dedicated to improving mental health with compassionate support.
                </p>
            </div>

            <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                    <li>Home</li>
                    <li>Services</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>

            <div>
                <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                <div className="flex gap-2">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-2 rounded-xl w-full text-gray-800"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
                        Join
                    </button>
                </div>
            </div>
        </div>

        <div className="text-center py-2 border-t border-gray-700 text-sm">
            <a
                href="/operator-login"
                className={`underline decoration-dotted hover:text-blue-500 transition ${dark ? "text-gray-400" : "text-gray-300"
                    }`}
            >
                Operator Login
            </a>
        </div>

        <div className="text-center py-2 border-t border-gray-700 text-sm">
            © 2025 Manasapath. All rights reserved.
        </div>
    </footer>
);

export default HomePage;
