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
  return (
    <>
      <GridBox {...styles}>{children}</GridBox>
    </>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  justify: "space-between",
  width: "auto",
  padding: false,
  margin: false,
  bg: false,
};

const GridBox = styled.div`
  display: ${(props) => (props.is_flex ? `flex` : "")};
  justify-content: ${(props) => props.justify};
  align-items: center;
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding:${props.padding};` : "")};
  ${(props) => (props.margin ? `margin:${props.margin};` : "")};
  ${(props) => (props.bg ? `background-color:${props.bg};` : "")}
`;

export default Grid;
