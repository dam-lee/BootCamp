import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    width,
    margin,
    padding,
    fontSize,
    color,
    bg,
    border,
    is_hover,
    hoverColor,
    hoverBorder,
    disabled,
    children,
    onClick,
  } = props;
  const styles = {
    width: width,
    margin: margin,
    padding: padding,
    fontSize: fontSize,
    color: color,
    bg: bg,
    border: border,
    is_hover: is_hover,
    hoverColor: hoverColor,
    hoverBorder: hoverBorder,
    disabled: disabled,
  };

  return (
    <>
      <ButtonWrap {...styles} onClick={onClick}>
        {children}
      </ButtonWrap>
    </>
  );
};

Button.defaultProps = {
  width: "auto",
  margin: "0",
  padding: "5px 10px",
  fontSize: "12px",
  color: "#343a40",
  bg: "#fff",
  border: "none",
  is_hover: false,
  hoverColor: "#fff",
  hoverBorder: "#fff",
  disabled: false,
  onClick: () => {},
};

const ButtonWrap = styled.button`
  ${(props) => (props.width ? `width:${props.width}` : "")};
  ${(props) => (props.margin ? `margin:${props.margin}` : "")};
  ${(props) => (props.padding ? `padding:${props.padding}` : "")};
  ${(props) => (props.fontSize ? `font-size:${props.fontSize}` : "")};
  ${(props) => (props.color ? `color:${props.color}` : "")};
  ${(props) => (props.bg ? `background-color:${props.bg}` : "")};
  ${(props) => (props.border ? `border:${props.border}` : "")};
  cursor: pointer;
  ${(props) =>
    props.disabled &&
    `background-color:#f8f9fa; color:#ced4da;border:1px solid #ced4da`}
`;
export default Button;
