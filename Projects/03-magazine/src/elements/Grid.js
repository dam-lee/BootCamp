import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    justify,
    width,
    margin,
    padding,
    bg,
    border,
    onClick,
    children,
  } = props;
  const styles = {
    is_flex: is_flex,
    justify: justify,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    border: border,
  };

  return (
    <GridWrap {...styles} onClick={onClick}>
      {children}
    </GridWrap>
  );
};

Grid.defaultProps = {
  is_flex: false,
  justify: "flex-start",
  width: "auto",
  margin: "0",
  padding: "0",
  bg: "#fff",
  border: "0px solid #fff",
  onClick: () => {},
};

const GridWrap = styled.div`
  ${(props) => (props.is_flex ? `display:flex` : "")};
  ${(props) => (props.justify ? `justify-content:${props.justify}` : "")};
  ${(props) => (props.width ? `width:${props.width}` : "")};
  ${(props) => (props.margin ? `margin:${props.margin}` : "")};
  ${(props) => (props.padding ? `padding:${props.padding}` : "")};
  align-items: center;
  ${(props) => (props.bg ? `background-color:${props.bg}` : "")};
  ${(props) => props.border && `border:${props.border}`};
`;

export default Grid;
