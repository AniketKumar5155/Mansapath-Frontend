import React from "react";
import { CheckCircle } from "lucide-react";

const SuccessModal = ({ isOpen, title, message1, message2, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative animate-[scaleIn_0.2s_ease-in-out]">

        <div className="flex justify-center -mt-14 mb-4">
          <div className="bg-white p-4 rounded-full shadow-lg">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle size={46} className="text-green-600" />
            </div>
          </div>
        </div>

        {title && (
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {title}
          </h2>
        )}

        {message1 && (
          <p className="mt-3 text-base text-gray-600 text-center leading-relaxed">
            {message1}
          </p>
        )}

        {message2 && (
          <p className="mt-1 text-sm text-gray-500 text-center leading-relaxed">
            {message2}
          </p>
        )}

        <div className="w-full h-px bg-gray-200 my-6" />
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-10 py-2.5 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            OK
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.85);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessModal;
