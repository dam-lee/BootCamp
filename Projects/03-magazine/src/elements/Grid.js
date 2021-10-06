import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { is_flex, justify, width, margin, padding, bg, children } = props;
  const styles = {
    is_flex: is_flex,
    justify: justify,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
  };

  return <GridWrap {...styles}>{children}</GridWrap>;
};

Grid.defaultProps = {
  is_flex: false,
  justify: "flex-start",
  width: "auto",
  margin: "0",
  padding: "0",
  bg: "#fff",
};

const GridWrap = styled.div`
  ${(props) => (props.is_flex ? `display:flex` : "")};
  ${(props) => (props.justify ? `justify-content:${props.justify}` : "")};
  ${(props) => (props.width ? `width:${props.width}` : "")};
  ${(props) => (props.margin ? `margin:${props.margin}` : "")};
  ${(props) => (props.padding ? `padding:${props.padding}` : "")};
  align-items: center;
  ${(props) => (props.bg ? `background-color:${props.bg}` : "")};
`;

export default Grid;
