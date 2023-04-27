import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";

const PrivacyPolicy = () => {
  return (
    <>
      <Meta title="Privacy Policy" />
      <BreadCrumb title="Privacy Policy" />
      <div className="bg-gray-100 py-4">
        <div className="max-w-[1300px] w-full bg-white pb-10 md:pb-20 mx-auto"></div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
