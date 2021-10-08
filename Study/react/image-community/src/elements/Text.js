import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { bold, color, size, margin, padding, children, flex } = props;
  const styles = {
    bold: bold,
    color: color,
    size: size,
    margin: margin,
    flex: flex,
    padding: padding,
  };
  return <P {...styles}>{children}</P>;
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "14px",
  margin: "0px",
  padding: "0px",
};

const P = styled.p`
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  ${(props) => (props.flex ? `flex:${props.flex}` : "")};
  line-height: 1.5;
`;

export default Text;
