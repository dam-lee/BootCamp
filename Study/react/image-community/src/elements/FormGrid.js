import React from "react";
import styled from "styled-components";

const Form = (props) => {
  const { is_flex, justify, margin, padding, children } = props;
  const styles = {
    is_flex: is_flex,
    justify: justify,
    margin: margin,
    padding: padding,
  };
  return <FormWrap {...styles}>{children}</FormWrap>;
};

Form.defaultProps = {
  children: null,
  is_flex: false,
  justify: "start",
  margin: "auto",
  padding: "auto",
};
const FormWrap = styled.div`
  display: ${(props) => (props.is_flex ? "flex" : "")};
  align-items: center;
  justify-content: ${(props) => `${props.justify}`};
  width: 100%;
  margin: ${(props) => `${props.margin}`};
  padding: ${(props) => `${props.padding}`};
  box-sizing: border-box;
`;
export default Form;
