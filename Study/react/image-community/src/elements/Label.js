import React from "react";
import styled from "styled-components";

const Label = (props) => {
  const { size, color, margin, children } = props;
  const styles = {
    size: size,
    color: color,
    marign: margin,
  };
  return <LabelWrap {...styles}>{children}</LabelWrap>;
};

Label.defaultProps = {
  margin: "auto",
  size: "12px",
  color: "#222831",
};
const LabelWrap = styled.label`
  margin: ${(props) => `${props.margin}`};
  font-size: ${(props) => `${props.size}`};
  color: ${(props) => `${props.color}`};
`;
export default Label;
