import React from "react";

import errorimage from "../assets/error.webp";

const ErrorScreen = ({ text }) => {
  return (
    <>
      <img src={errorimage} alt="404 nem talált" className="d-block mx-auto img-fluid" style={{ maxWidth: "400px" }} />
      <h3 className="text-danger text-center m-5">{text}</h3>
    </>
  );
};

export default ErrorScreen;
