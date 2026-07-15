import React from "react";

const Button = ({ type, onClick, children, name }) => {
  return (
    <>
      <button
        type={type ? type : "button"}
        onClick={onClick}
        name={name}
        className="border-2 border-black"
      >
        {children}
      </button>
    </>
  );
};

export default Button;
