import React from "react";
import styled from "styled-components";

const TextArea = (props) => {
  const { margin, padding, rows, resize, children } = props;
  const styles = {
    margin: margin,
    padding: padding,
    rows: rows,
    resize: resize,
  };
  return (
    <TextBox rows={rows} {...styles}>
      {children}
    </TextBox>
  );
};

TextArea.defaultProps = {
  children: null,
  margin: 0,
  padding: 0,
  rows: 5,
  resize: "none",
};

const TextBox = styled.textarea`
  width: 100% !important;
  box-sizing: border-box;
  resize: ${(props) => (props.resize ? props.resize : "none")};
  margin: ${(props) => (props.margin ? props.margin : 0)};
  padding: ${(props) => (props.padding ? props.padding : 0)};
`;

export default TextArea;
