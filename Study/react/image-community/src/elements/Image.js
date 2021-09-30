import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { shape, src, size } = props;
  const styles = {
    src: src,
    size: size,
  };
  if (shape === "circle") {
    return <ImageCircle {...styles} />;
  }
  if (shape === "rectangle") {
    return (
      <AspectOutter>
        <AspectInner {...styles} />
      </AspectOutter>
    );
  }
  return <></>;
};

Image.defaultProps = {
  shape: "circle",
  src: "https://midadictionary.s3.ap-northeast-2.amazonaws.com/cat.jpg",
  size: 36,
};

// 네모 이미지 디바이스별 사이즈 비율을 위해 padding-top을 이용
const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`;
const AspectInner = styled.div`
  position: relative;
  padding-top: 75%; // 넓이가 100프로로 되어있어서 넓이의 4:3으로 맞추기 위해 75%
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;
const ImageCircle = styled.div`
  // width, height, border-radius 는 값이 똑같다.
  // --size라는 변수를 만든다.
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
`;

export default Image;
