import React from "react";

const Button = ({ text, type, onClick }) => {
  return (
    <button
      type={type}
      className="py-3 px-9 bg-blue-600 rounded-full mx-auto text-white font-semibold text-md w-full shadow hover:shadow-lg hover:text-gray-400 hover:shadow-blue-300 lg:w-56 lg:px-0"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
