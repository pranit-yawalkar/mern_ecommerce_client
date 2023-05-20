import React from "react";
import { ScaleLoader } from "react-spinners";

const Loader = ({ show }) => {
  return (
    show && (
      <div className="loader">
        <ScaleLoader
          color="#4F46E5"
          loading={true}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <h3 className="text-lg mt-3">Loading...</h3>
      </div>
    )
  );
};

export default Loader;
