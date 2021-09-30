import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    padding,
    margin,
    border,
    color,
    width,
    bg,
    fontSize,
    fontWeight,
    onClick,
    children,
  } = props;
  const styles = {
    bg: bg,
    width: width,
    color: color,
    padding: padding,
    margin: margin,
    border: border,
    fontSize: fontSize,
    fontWeight: fontWeight,
  };
  return (
    <ButtonWrap {...styles} onClick={onClick}>
      {children}
    </ButtonWrap>
  );
};
Button.defaultProps = {
  margin: "0",
  padding: "10px 20px",
  color: "#222831",
  bg: "#fff",
  width: "auto",
  fontSize: "14px",
  fontWeight: 400,
  border: "1px solid #222831",
  onClick: () => {},
};
const ButtonWrap = styled.button`
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  border: ${(props) => props.border};
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  cursor: pointer;
  box-sizing: border-box;
`;
export default Button;
