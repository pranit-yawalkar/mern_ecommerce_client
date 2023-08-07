import React, { useState } from "react";

const Color = ({ colorData, setColorData }) => {
  const [selected, setSelected] = useState(null);
  return (
    <ul className="flex gap-2 items-center">
      {colorData &&
        colorData?.map((color) => (
          <li
            onClick={() => {
              setColorData(color?._id);
              setSelected(color?._id);
            }}
            className={`w-5 h-5 rounded-full ${
              color?._id === selected
                ? `p-1 border-2 ${
                    color?.title.toLowerCase() === "black"
                      ? "border-color-8"
                      : "border-black"
                  }`
                : ""
            }`}
            style={{ backgroundColor: color?.title }}
            key={color?._id}
          ></li>
        ))}
    </ul>
  );
};

export default Color;
