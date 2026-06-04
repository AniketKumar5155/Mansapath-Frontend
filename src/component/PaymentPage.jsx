import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Copy, CheckCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import paymentQR from "../assets/manpath-course-payment-QR.jpeg";

const PaymentPage = ({ isOpen, onPaymentComplete, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const UPI_ID = "abhabinay1@okaxis";
  const AMOUNT = "₹999.00";

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast.success("UPI ID copied to clipboard!");
  };

  const handleDone = async () => {
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Payment confirmed!");
      onPaymentComplete();
    } catch (error) {
      toast.error("Failed to process payment");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative my-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>

        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Complete Payment</h2>
          <p className="text-gray-600 text-xs mt-1">
            Scan QR to complete enrollment
          </p>
        </div>

        <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl p-4 mb-3 border border-blue-100">
          <div className="flex flex-col items-center">
            <div className="bg-white p-3 rounded-lg shadow-md mb-3">
              <img
                src={paymentQR}
                alt="Payment QR Code"
                className="w-40 h-40 object-contain"
              />
            </div>
            <p className="text-xs text-gray-600 text-center mt-1 font-medium">
              Scan with any UPI app
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 mb-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium text-sm">UPI ID:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-gray-800 font-semibold text-sm">{UPI_ID}</span>
              <button
                onClick={handleCopyUPI}
                className="p-1.5 hover:bg-gray-200 rounded-md transition"
                title="Copy UPI ID"
              >
                <Copy size={14} className="text-blue-600" />
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
            <span className="text-gray-600 font-medium text-sm">Amount:</span>
            <span className="text-base font-bold text-green-600">{AMOUNT}</span>
          </div>
        </div>

        <div className="flex gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg mb-3">
          <AlertCircle size={16} className="text-orange-600 shrink-0 mt-0.5" />
          <p className="text-xs text-orange-800">
            After completing payment send the screenshot to this number 9288101818.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
            disabled={isProcessing}
          >
            Back
          </button>
          <button
            onClick={handleDone}
            disabled={isProcessing}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
              isProcessing
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isProcessing ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </>
            ) : (
              <>
                <CheckCircle size={18} />
                Done
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PaymentPage;