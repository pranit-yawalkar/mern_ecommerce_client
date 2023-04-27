import React from "react";

const ButtonWidget = ({
  color,
  textcolor,
  hovercolor,
  text,
  size,
  icon,
  width,
  type,
  handleClick,
}) => {
  return (
    <button
      type={type}
      className={`py-2 ${color} text-${textcolor} ${width} rounded-full px-4 hover:bg-${hovercolor} text-${size}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default ButtonWidget;
