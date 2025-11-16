import React from "react";

const SuccessModal = ({ isOpen, title, messageline1, messageline2, buttonText, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 text-center">

        {title && (
          <h2 className="text-2xl font-semibold text-green-600">{title}</h2>
        )}

        {messageline1 && (
          <p className="mt-3 text-gray-700 text-xl">{messageline1}</p>
        )}

        {messageline2 && (
          <p className="text-gray-700 text-[18px]">{messageline2}</p>
        )}

        <button
          onClick={onClose}
          className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          {buttonText || "OK"}
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
