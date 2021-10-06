import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const {
    flex,
    width,
    margin,
    padding,
    fontSize,
    placeholder,
    value,
    onChange,
    onSubmit,
    type,
    name,
  } = props;

  const styles = {
    flex: flex,
    width: width,
    margin: margin,
    padding: padding,
    fontSize: fontSize,
    placeholder: placeholder,
    value: value,
    type: type,
    name: name,
  };
  return (
    <>
      <InputText
        type={type}
        {...styles}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </>
  );
};

Input.defaultProps = {
  flex: false,
  width: "auto",
  margin: "0px",
  padding: "5px",
  fontSize: "12px",
  placeholder: false,
  value: "",
  type: "text",
  onChange: () => {},
  onSubmit: () => {},
};

const InputText = styled.input`
  ${(props) => (props.flex ? `flex:${props.flex}` : "")};
  ${(props) => (props.width ? `width:${props.width}` : "")};
  ${(props) => (props.margin ? `margin:${props.margin}` : "")};
  ${(props) => (props.padding ? `padding:${props.padding}` : "")};
  ${(props) => (props.fontSize ? `font-size:${props.fontSize}` : "")};
  border: 1px solid #dee2e6;
  box-sizing: border-box;
  &:focus {
    outline: 1px solid #ff6b6b;
  }
`;

export default Input;
