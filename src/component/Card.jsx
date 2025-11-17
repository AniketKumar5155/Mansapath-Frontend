import React from "react";

const Card = ({ label, value, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg px-5 w-70 flex items-center gap-4 hover:shadow-xl transition-shadow h-32">
      {icon && <div className="text-[#3B98C4] text-5xl">{icon}</div>}

      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-3xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default Card;
