import React from "react";

const Button = ({ onClick, disabled, className, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-blue-500 text-white px-4 py-2 rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
