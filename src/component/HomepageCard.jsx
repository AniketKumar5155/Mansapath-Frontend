import { motion as Motion } from "framer-motion";

const HomepageCard = ({ icon, title, desc, dark }) => (
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

export default HomepageCard;