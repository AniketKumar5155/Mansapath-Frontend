import { Link, useNavigate } from "react-router-dom";
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
          <h4 className="text-lg font-semibold mb-4">Manaspath</h4>
          <p className="text-sm">
            Dedicated to improving mental health with compassionate support.
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
              <Link className="hover:text-blue-400 transition" to="/contact">
                Contact
              </Link>
            </li>
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
        &copy; 2025 Manaspath. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
