import React from "react";
import Loader from "react-loader-spinner";
const Spinner = () => {
  return (
    <div className="w-100 d-flex justify-content-center">
      <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Spinner;
