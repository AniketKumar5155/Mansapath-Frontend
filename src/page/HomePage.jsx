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
const HomePage = (theme) => {
    const navigate = useNavigate();

    const [dark, setDark] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    const toggleDark = () => {
        setDark(prev => {
            localStorage.setItem("theme", JSON.stringify(!prev));
            return !prev;
        });
    };



    return (
<div className={`min-h-screen transition-colors duration-500 scroll-smooth ${dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
                }`}
        >
            <header
                className={`shadow-sm sticky top-0 z-50 transition ${dark ? "bg-gray-800" : "bg-white"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold tracking-wide text-blue-600">
                        Manasapath
                    </h1>

                    <nav className="space-x-8 hidden md:block">
                        <a href="#" className="hover:text-blue-600 cursor-pointer hover:font-bold">
                            Home
                        </a>
                        <a href="#services" className="hover:text-blue-600 cursor-pointer hover:font-bold">
                            Services
                        </a>
                        <a href="#about" className="hover:text-blue-600 cursor-pointer hover:font-bold">
                            About
                        </a>
                        <a href="#contact" className="hover:text-blue-600 cursor-pointer hover:font-bold">
                            Contact
                        </a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleDark}
                            className={`p-2 rounded-full transition hover:scale-110 cursor-pointer ${dark ? "bg-gray-700 text-yellow-400" : "bg-gray-100"
                                }`}
                        >
                            {dark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl shadow hover:bg-blue-700 transition cursor-pointer">
                            Get Help
                        </button>
                        
                    </div>
                </div>
            </header>

            <section
                className={`py-20 transition ${dark
                    ? "bg-linear-to-r from-gray-900 to-gray-800"
                    : "bg-linear-to-r from-blue-50 to-blue-50"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold leading-tight mb-6">
                            Your Mental Health Matters
                        </h2>
                        <p className="mb-8 text-gray-500 leading-relaxed">
                            A safe, confidential, and supportive space for your mental
                            well-being. We are here to guide you through every step of your
                            journey.
                        </p>
                        <div className="space-x-4">
                            <button
                                className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-blue-700 transition cursor-pointer"
                                onClick={() => navigate("/form")}
                            >
                                Book Session
                            </button>

                            <button
                                className={`border px-6 py-3 rounded-2xl shadow transition cursor-pointer ${dark
                                    ? "border-gray-600 text-gray-200 hover:bg-gray-700"
                                    : "border-blue-600 text-blue-600 hover:bg-blue-50"
                                    }`}
                            >
                                Learn More
                            </button>
                            
                        </div>
                    </motion.div>

                    <div className="flex justify-center items-center">
                        <div
                            className={`h-64 md:h-80 rounded-2xl flex items-center justify-center ${dark ? "bg-gray-800" : "bg-white"
                                }`}
                        >
                            <img
                                src="src/assets/p.jpg"
                                alt="Mental health illustration"
                                className="w-full h-full object-contain rounded-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section
                className={`py-20 transition ${dark ? "bg-gray-800" : "bg-white"}`}
                id="about"
            >
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h3 className="text-3xl font-bold mb-4">Why Choose Us</h3>

                    <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
                        Our approach combines compassion, science, and experience to
                        provide the best support possible.
                    </p>

                    <div className="grid md:grid-cols-4 gap-8">
                        <Card
                            dark={dark}
                            icon={<Brain size={28} />}
                            title="Expert Therapists"
                            desc="Certified professionals with years of experience."
                        />
                        <Card
                            dark={dark}
                            icon={<ShieldCheck size={28} />}
                            title="Confidential & Safe"
                            desc="Your privacy is our highest priority."
                        />
                        <Card
                            dark={dark}
                            icon={<HeartPulse size={28} />}
                            title="Personalized Care"
                            desc="Tailored plans for your mental wellness."
                        />
                        <Card
                            dark={dark}
                            icon={<Users size={28} />}
                            title="Supportive Community"
                            desc="A network that understands and supports you."
                        />
                    </div>
                </div>
            </section>

            <section
                className={`py-20 transition ${dark ? "bg-gray-900" : "bg-gray-50"
                    }`}
                id="services"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <h3 className="text-3xl font-bold text-center mb-12">
                        What We Offer
                    </h3>

                    <div className="grid md:grid-cols-3 gap-10">
                        <OfferCard dark={dark} title="Individual Therapy" />
                        <OfferCard dark={dark} title="Group Counseling" />
                        <OfferCard dark={dark} title="Stress Management" />
                        <OfferCard dark={dark} title="Career Guidance" />
                        <OfferCard dark={dark} title="Meditation Programs" />
                        <OfferCard dark={dark} title="24/7 Support" />
                    </div>
                </div>
            </section>

            <section
                className={`py-20 transition ${dark ? "bg-gray-800" : "bg-white"}`}
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div
                        className={`h-72 rounded-2xl flex items-center justify-center ${dark ? "bg-gray-900" : "bg-gray-100"
                            }`}
                    >
                        <img
                            src="src/assets/M.png"
                            alt="Mental health illustration"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                </div>
            </section>

            <section
                className={`py-20 transition ${dark ? "bg-gray-900" : "bg-blue-50"
                    }`}
                id="contact"
            >
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
                    <div>
                        <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
                        <p className="text-gray-500 mb-6">
                            If you or someone you know is struggling, do not hesitate to
                            reach out. We are here for you.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <Phone size={18} /> +91 00000 00000
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} /> support@manasapath.com
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin size={18} /> Your City, India
                            </li>
                        </ul>
                    </div>

                    <div
                        className={`h-64 border-2 border-dashed rounded-2xl flex items-center justify-center ${dark
                            ? "border-gray-700 bg-gray-800"
                            : "border-gray-300 bg-white"
                            }`}
                    >
                        Map
                    </div>
                </div>
            </section>
            <footer
    className={`transition ${dark ? "bg-black text-gray-400" : "bg-gray-900 text-gray-300"} mt-10`}
>
    <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* Existing footer content */}
        <div>
            <h4 className="text-lg font-semibold mb-4">Manasapath</h4>
            <p className="text-sm">
                Dedicated to improving mental health through compassionate care
                and professional support.
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
            className={`underline decoration-dotted hover:text-blue-500 transition ${dark ? "text-gray-400" : "text-gray-300"}`}
        >
            Operator Login
        </a>
    </div>

    <div className="text-center py-2 border-t border-gray-700 text-sm">
        © 2025 MindCare. All rights reserved.
    </div>
</footer>

        </div>
    );
}

const Card = ({ icon, title, desc, dark }) => {
    return (
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
};

const OfferCard = ({ title, dark }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-8 rounded-2xl shadow-md transition ${dark ? "bg-gray-800" : "bg-white"
                }`}
        >
            <h4 className="font-semibold mb-3">{title}</h4>
            <p className="text-gray-500 text-sm">
                Detailed description placeholder for this service.
            </p>

            <div
                className={`mt-6 h-32 border-2 border-dashed rounded-xl flex items-center justify-center ${dark
                    ? "bg-gray-900 border-gray-700"
                    : "bg-gray-100 border-gray-300"
                    }`}
            >
                Image to be added
            </div>
        </motion.div>
    );
};

export default HomePage;
