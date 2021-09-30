import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const {
    value,
    placeholder,
    placeholderColor,
    border,
    flex,
    width,
    size,
    name,
    padding,
    type,
    _onChange,
  } = props;
  const styles = {
    flex: flex,
    width: width,
    size: size,
    placeholder: placeholder,
    placeholderColor: placeholderColor,
    border: border,
    padding: padding,
    type: type,
  };
  return (
    <>
      <TextInput
        {...styles}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
      />
    </>
  );
};

Input.defaultProps = {
  value: "",
  placeholder: `입력해주세요`,
  placeholderColor: "#C4C4C4",
  size: 14,
  width: "100%",
  border: "1px solid #C4C4C4",
  padding: "10px",
  type: "text",
  display: false,
  _onChange: () => {},
};

const TextInput = styled.input`
  display: ${(props) => (props.display ? `${props.display}` : "inline-block")};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  font-size: ${(props) => props.size};
  box-sizing: border-box;
  &::placeholder {
    color: ${(props) =>
      props.placeholderColor ? props.placeholderColor : "#C4C4C4"};
    font-size: 12px;
  }
`;
export default Input;
