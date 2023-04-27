import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";

const ShippingPolicy = () => {
  return (
    <>
      <Meta title="Shipping Policy" />
      <BreadCrumb title="Shipping Policy" />
      <div className="bg-gray-100 py-4">
        <div className="max-w-[1300px] w-full bg-white pb-10 md:pb-20 mx-auto"></div>
      </div>
    </>
  );
};

export default ShippingPolicy;
