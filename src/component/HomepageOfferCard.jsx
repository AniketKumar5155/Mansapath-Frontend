import { motion as Motion } from "framer-motion";
import { ArrowRight, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomepageOfferCard = ({ title, desc, dark, fee, meta, status, onClick }) => {
  const navigate = useNavigate();

  return (
    <Motion.div
      whileHover={{ scale: 1.02 }}
      role="link"
      tabIndex={0}
      onClick={onClick}
      className={`flex min-h-64 cursor-pointer flex-col rounded-2xl p-8 shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${
        dark ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <h4 className="text-xl font-semibold">{title}</h4>
        {status && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              status === "Coming soon"
                ? dark
                  ? "bg-amber-400/10 text-amber-200"
                  : "bg-amber-50 text-amber-700"
                : dark
                ? "bg-emerald-400/10 text-emerald-200"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {status}
          </span>
        )}
      </div>
      <p className="mt-4 text-gray-500 text-sm leading-6">{desc}</p>
      <div className="mt-auto pt-6">
        <div
          className={`flex items-center gap-2 text-sm ${
            dark ? "text-gray-300" : "text-slate-700"
          }`}
        >
          <IndianRupee size={16} className="text-cyan-600" />
          <span>{fee === "Coming soon" ? fee : `Course fee Rs. ${fee}`}</span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 text-sm font-semibold text-blue-600">
          <span>{meta}</span>
          <ArrowRight size={17} />
        </div>
      </div>
    </Motion.div>
  );
};

export default HomepageOfferCard;
