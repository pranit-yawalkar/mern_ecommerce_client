import React from "react";

const BreadCrumb = ({ title }) => {
  return (
    <div className="w-full py-3 text-center">
      <span>Home</span>
      <span className="mx-3">/</span>
      <span>{title}</span>
    </div>
  );
};

export default BreadCrumb;
