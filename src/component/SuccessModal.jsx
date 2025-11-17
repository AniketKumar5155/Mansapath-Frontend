import React from "react";
import { CheckCircle } from "lucide-react";

const SuccessModal = ({ isOpen, title, message1, message2, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6">

        <div className="flex justify-center mb-3">
          <CheckCircle size={48} className="text-green-600" />
        </div>

        {title && (
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            {title}
          </h2>
        )}

        {message1 && (
          <p className="mt-2 text-xl text-gray-600 text-center">{message1}</p>
        )}

        {message2 && (
          <p className="mt-2 text-lg text-gray-600 text-center">{message2}</p>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
