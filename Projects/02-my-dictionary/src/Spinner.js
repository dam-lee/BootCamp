import React from "react";
import { FaSpinner } from "react-icons/fa";
import { SpinnerContainer } from "./Style";

const Spinner = () => {
  return (
    <SpinnerContainer>
      <FaSpinner className="spinner" style={{ color: "#fff", fontSize: 80 }} />
    </SpinnerContainer>
  );
};

export default Spinner;
