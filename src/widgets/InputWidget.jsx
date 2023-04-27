import React from "react";

const InputWidget = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  isError = false,
  errorMsg,
}) => {
  return (
    <div>
      <input
        className={`outline-none border-2 w-full rounded-md px-2 py-1 text-black focus:border-2 focus:border-color-2 ${
          isError ? "border-red-300" : ""
        } `}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className={`text-xs text-color-8 ml-2`}>{errorMsg ?? " "} </div>
    </div>
  );
};

export default InputWidget;
