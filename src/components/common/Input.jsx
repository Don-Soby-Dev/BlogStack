import React from "react";

const Input = ({ type, onChange, placeHolder, value, name }) => {
  return (
    <>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeHolder}
        value={value}
        name={name}
        className="border-2 border-black"
      />
    </>
  );
};

export default Input;
