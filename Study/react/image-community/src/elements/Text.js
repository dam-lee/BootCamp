import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { bold, color, size, margin, children, flex } = props;
  const styles = {
    bold: bold,
    color: color,
    size: size,
    margin: margin,
    flex: flex,
  };
  return <P {...styles}>{children}</P>;
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "14px",
  margin: "0px",
};

const P = styled.p`
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  ${(props) => (props.flex ? `flex:${props.flex}` : "")}
`;

export default Text;
