import React from "react";
import styled from "styled-components";

const Container = (props) => {
  return (
    <>
      <ContainerWrap>{props.children}</ContainerWrap>
    </>
  );
};

Container.defaultProps = {};

const ContainerWrap = styled.div`
  width: 35vw;
  height: 100%;
  min-height: 90vh;
  margin: 5vh auto;
  padding: 0;
  background-color: #fff;
  box-shadow: 5px 5px 5px 5px #dee2e6;
`;
export default Container;
