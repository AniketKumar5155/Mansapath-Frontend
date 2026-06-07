import { Link, useNavigate } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import useAuthStore from "../store/useAuthStore";

const Footer = ({ dark }) => {
  const { user, accessToken } = useAuthStore();
  const navigate = useNavigate();

  return (
    <footer
      className={`transition ${
        dark ? "bg-black text-gray-400" : "bg-gray-900 text-gray-300"
      } mt-10`}
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-4">Manpath</h4>
          <p className="text-sm leading-6">
            Dedicated to improving mental health with compassionate,
            confidential support for every stage of life.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link className="hover:text-blue-400 transition" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-400 transition" to="/services">
                Services
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-400 transition" to="/about-us">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-400 transition" to="/privacy-policy">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-3">
              <Phone size={16} /> +91 00000 00000
            </p>
            <p className="flex items-center gap-3">
              <Mail size={16} /> support@manpath.com
            </p>
            <p className="flex items-center gap-3">
              <MapPin size={16} /> Motihari, Bihar, India
            </p>
          </div>
        </div>
      </div>

      <div className="text-center py-2 border-t border-gray-700 text-sm">
        <button
          type="button"
          className={`underline decoration-dotted hover:text-blue-500 transition ${
            dark ? "text-gray-400" : "text-gray-300"
          }`}
          onClick={
            user && accessToken
              ? () => navigate("/admin/submissions")
              : () => navigate("/operator-login")
          }
        >
          Operator Login
        </button>
      </div>

      <div className="text-center py-2 border-t border-gray-700 text-sm">
        &copy; {new Date().getFullYear()} Manpath. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
