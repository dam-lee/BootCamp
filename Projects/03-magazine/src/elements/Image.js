import React from "react";
import styled, { keyframes } from "styled-components";
const Image = (props) => {
  const { shape, width, height, src } = props;
  const styles = {
    width: width,
    height: height,
  };
  if (shape === "circle") {
    <CircleImage {...styles} src={src} />;
  }
  return (
    <ImageWrap {...styles}>
      <ImageDefault {...styles} src={src} />
    </ImageWrap>
  );
};

Image.defaultProps = {
  width: "100%",
  height: "auto",
};
const boxFade = keyframes`
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
`;
const ImageDefault = styled.img`
  ${(props) => (props.width ? `width:${props.width}` : "")};
  ${(props) => (props.height ? `height:${props.height}` : "")};
  object-fit: cover;
  z-index: -1;
  opacity: 0.6;
  &:hover {
    z-index: 1;
    cursor: pointer;
    animation-duration: 1s;
    animation-name: ${boxFade};
    animation-fill-mode: forwards;
  }
`;
const ImageWrap = styled.div`
  ${(props) => (props.height ? `height:${props.height}` : "")};
  background-color: #000;
`;
const CircleImage = styled.img`
  border-radius: 50%;
  object-fit: cover;
`;

export default Image;
