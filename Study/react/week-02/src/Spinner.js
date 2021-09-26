import React from "react";
import styled from "styled-components";
import { Eco } from "@material-ui/icons";

const Spinner = () => {
  return (
    <Outter>
      <Eco style={{ color: "#fff", fontSize: "150px" }} />
    </Outter>
  );
};

const Outter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #baaffa;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Spinner;
