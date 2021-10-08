import React from "react";
import styled from "styled-components";

const TextArea = (props) => {
  const { value, margin, padding, rows, resize, onChange } = props;
  const styles = {
    margin: margin,
    padding: padding,
    rows: rows,
    resize: resize,
  };
  return (
    <TextBox
      rows={rows}
      {...styles}
      onChange={onChange}
      value={value}
    ></TextBox>
  );
};

TextArea.defaultProps = {
  children: null,
  margin: "0px",
  padding: "10px",
  rows: 5,
  resize: "none",
  value: "",
  onChange: () => {},
};

const TextBox = styled.textarea`
  width: 100% !important;
  box-sizing: border-box;
  resize: ${(props) => (props.resize ? props.resize : "none")};
  margin: ${(props) => (props.margin ? props.margin : 0)};
  padding: ${(props) => (props.padding ? props.padding : "10px")};
`;

export default TextArea;
