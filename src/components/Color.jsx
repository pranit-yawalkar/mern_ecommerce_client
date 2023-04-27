import React from "react";

const Color = ({ colorData, setColorData }) => {
  return (
    <ul className="flex gap-2 items-center">
      {colorData &&
        colorData?.map((color) => (
          <li
            onClick={() => setColorData(color?._id)}
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: color?.title }}
            key={color?._id}
          ></li>
        ))}
    </ul>
  );
};

export default Color;
