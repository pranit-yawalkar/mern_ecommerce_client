import React from "react";

const FamousCard = ({ color, textcolor, text1, text2, text3, img }) => {
  return (
    <div className={`${color} text-${textcolor} rounded-lg w-full shadow-md`}>
      <div className="flex flex-col px-5 py-8 gap-2">
        <h6 className="uppercase text-sm font-light">{text1}</h6>
        <h3 className="text-2xl font-semibold">{text2}</h3>
        <p className="text-sm font-light">{text3}</p>
        <img className="w-full" src={img} alt={`${text2}-img`} />
      </div>
    </div>
  );
};

export default FamousCard;
