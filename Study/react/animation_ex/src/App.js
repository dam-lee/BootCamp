import styled, { keyframes } from "styled-components";

function App() {
  return (
    <div className="App">
      <Box></Box>
    </div>
  );
}
// keyframes 만들기
const boxAnimation = keyframes`
 0%{
  border-radius: 0px;
 }

 50%{
  border-radius: 50px;
  top: 400px;
 }
 100%{
  border-radius: 0px;
  top: 20px;
 }
`;
const boxFade = keyframes`
  0% {
    opacity: 1;
    top: 20px;

  }
  50% {
    opacity: 0;
    top: 400px;
  }
  100% {
    opacity: 1;
    top: 20px;
  }
`;
const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: green;
  border-radius: 0px;
  // 어디까지 움직이게 할지
  position: absolute;
  top: 20px;
  left: 20px;
  animation: ${boxAnimation} 2s 1s infinite linear alternate;
`;

export default App;
