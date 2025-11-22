import React from "react";

const Card = ({ label, value, icon }) => {
  return (
    <div className="
      bg-white shadow-md rounded-lg 
      p-4 sm:p-5 
      w-full 
      flex items-center gap-4 
      hover:shadow-xl transition-shadow
      min-h-[90px] sm:min-h-[110px]
    ">
      {icon && (
        <div className="text-[#3B98C4] text-3xl sm:text-4xl lg:text-5xl">
          {icon}
        </div>
      )}

      <div>
        <p className="text-gray-500 text-xs sm:text-sm">{label}</p>
        <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
          {value}
        </p>
      </div>
    </div>
  );
};

export default Card;
