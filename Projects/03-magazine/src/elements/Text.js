import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { is_flex, margin, padding, fontSize, bold, light, color, children } =
    props;
  const styles = {
    is_flex: is_flex,
    margin: margin,
    padding: padding,
    fontSize: fontSize,
    color: color,
    bold: bold,
    light: light,
  };
  return <TextWrap {...styles}>{children}</TextWrap>;
};

Text.defaultProps = {
  is_flex: false,
  margin: "0px",
  padding: "0px",
  fontSize: "13px",
  color: "#343a40",
  bold: false,
  light: false,
};

const TextWrap = styled.p`
  ${(props) => (props.is_flex ? `flex:1` : "")};
  ${(props) => (props.margin ? `margin:${props.margin}` : "")};
  ${(props) => (props.padding ? `padding:${props.padding}` : "")};
  ${(props) => (props.fontSize ? `font-size:${props.fontSize}` : "")};
  ${(props) => (props.color ? `color:${props.color}` : "")};
  ${(props) => (props.bold ? `font-weight:bold` : "")};
  ${(props) => (props.light ? `font-weight:300px` : "")};
  white-space: pre-wrap;
`;
export default Text;
