import styled from "styled-components";

export const SpinnerContainer = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
`;
export const Mida = styled.span`
  padding-left: 10px;
  font-size: 16px;
  font-family: "Cafe24SsurroundAir";
  color: #003b73; ;
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #f1f3f5;
`;

export const DictionaryWrap = styled.div`
  position: relative;
  width: 28vw;
  height: 90vh;
  margin: auto;
  padding: 30px 30px 0;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 10px 10px 10px #e9ecef;
  @media only screen and (max-width: 768px) {
    width: 85%;
    padding: 20px 20px 0;
  }
`;
export const DictionaryTitle = styled.h1`
  margin-bottom: 20px;
  text-align: center;
  color: #0074b7;
  @media only screen and (max-width: 768px) {
    font-size: 30px;
  }
`;
export const DictionaryListWrap = styled.div`
  height: 70vh;
  padding-top: 10px;
  overflow-y: auto;
  div {
    &:nth-child(4) {
      margin-bottom: 0;
    }
  }
`;
export const CreateButton = styled.button`
  position: absolute;
  right: 20px;
  bottom: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #084075;
  border: 1px solid #084075;
  box-shadow: 5px 5px 10px #adb5bd;
  cursor: pointer;
`;
export const DictionaryItemContainer = styled.div`
  margin: 0px 0px 20px;
`;
export const DictionaryItemWrap = styled.div`
  position: relative;
  width: 100%;
  padding: 20px;
  box-shadow: 5px 5px 10px #e9ecef;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  @media only screen and (max-width: 768px) {
    padding: 15px;
  }
`;
export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px dotted #e9ecef;
  &:last-child {
    margin-bottom: 0;
  }
`;
export const ItemTitle = styled.h2`
  width: 60px;
  font-size: 15px;
`;
export const ItemText = styled.p`
  flex: 1;
  font-size: 12px;
  line-height: 1.5;
  white-space: pre-line;
`;
export const SubTitle = styled.h3`
  margin-bottom: 20px;
  padding-bottom: 10px;
  font-family: "Cafe24Ssurround";
  font-size: 20px;
  color: #003b73;
  border-bottom: 1px solid #e9ecef;
`;
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  white-space: pre-line;
  &::placeholder {
    font-family: "Cafe24SsurroundAir";
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-family: "Cafe24SsurroundAir";
  white-space: pre-line;
  line-height: 1.5;
  border: 1px solid #ddd;
`;
export const CreateWrap = styled.div`
  margin-bottom: 20px;

  h2 {
    margin-bottom: 10px;
  }
  textarea {
    padding: 10px;
    border: 1px solid #ddd;
    resize: none;
  }
  textarea::placeholder {
    font-family: "Cafe24SsurroundAir";
  }
`;
export const EditButton = styled.button`
  position: absolute;
  top: -10px;
  right: 43px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #eceaea;
  border: 1px solid #eceaea;
  cursor: pointer;
  z-index: 90;
  svg {
    color: "#084075";
    font-size: 12;
    vertical-align: "text-top";
  }
  &:hover {
    background-color: #084075;
    border: 1px solid #084075;
    svg {
      color: #fff;
      font-size: 12;
    }
  }
`;
export const DeleteButton = styled.button`
  position: absolute;
  top: -10px;
  right: 6px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #fa5252;
  border: 1px solid #fa5252;
  z-index: 90;
  cursor: pointer;
  svg {
    color: "#fff";
    font-size: 30;
    transform: rotate(45deg);
  }
  &:hover {
    background-color: #e03131;
    border: 1px solid #e03131;
    svg {
      color: #fff;
    }
  }
`;

export const HelperText = styled.h4`
  color: #f03e3e;
`;
