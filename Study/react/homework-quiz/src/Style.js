import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  height: 100vh;
`;
export const Wrap = styled.div`
  width: 60vh;
  height: 65vh;
  padding: 30px;
  margin: auto;
  text-align: center;
  border-radius: 8px;
  background-color: #f1f3f5;
`;
export const Title = styled.h1`
  margin: 30px 0 10px;
  color: #343a40;
  line-height: 1.7;
`;

export const QuizText = styled.h3`
  margin: 0 0 10px;
  color: #343a40;
  line-height: 1.7;
`;
export const ImageWrap = styled.div`
  margin-bottom: 30px;
`;
export const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;
export const Text = styled.p`
  font-weight: 600;
`;
export const ButtonWrap = styled.div`
  margin-top: 30px;
`;
export const Button = styled.button`
  padding: 15px 25px;
  border: 1px solid #fff;
  background-color: #fff;
  &:last-child {
    margin-left: 20px;
  }
`;

export const ProgressBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 20px;
  border-radius: 30px;
  background-color: #e9ecef;
`;
export const ProgressLine = styled.div`
  width: ${(props) => props.width};
  // 몇초동안 어떤거에 효과를 줄것인가 뒤를 생략하면 모든것이다
  transition: 1s;
  height: 20px;
  border-radius: 30px;
  background-color: #495057;
`;

export const Dot = styled.div`
  width: 20px;
  height: 20px;
  margin: 0px 0px 0px -10px;
  background-color: #fff;
  border: 5px solid #495057;
  border-radius: 50%;
`;
export const Name = styled.span`
  padding: 6px 14px;
  border-radius: 30px;
  color: #fff;
  background-color: #495057;
`;

export const Input = styled.input`
  width: 100%;
  margin-top: 50px;
  padding: 15px 20px;
  border-radius: 25px;
  border: 1px solid #f1f3f5;
  background-color: #fff;
  box-sizing: border-box;
`;

export const StartButton = styled.button`
  margin-top: 30px;
  padding: 12px 30px;
  color: #fff;
  border-radius: 25px;
  border: 1px solid #495057;
  background-color: #495057;
`;
export const RankinButton = styled.button`
  margin-top: 40px;
  padding: 10px 20px;
  color: #fff;
  background-color: #495057;
  border: 1px solid #495057;
  border-radius: 30px;
`;

export const RankingWrap = styled.div`
  display: flex;
  height: 50vh;
  flex-direction: column;
  background-color: #fff;
  padding: 10px 20px;
  overflow-y: scroll;
`;
export const RankingList = styled.div`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  box-sizing: border-box;
  /* border: 1px solid black; */
  &:last-child {
    margin-bottom: 0;
  }
`;
export const RankingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid #ced4da;
`;
export const RankingScoreBox = styled.div`
  width: 100px;
`;
export const RankingScore = styled.h2`
  color: orange;
`;
export const RankingName = styled.h3``;
export const RankingText = styled.p``;
export const HomeButton = styled.button`
  margin-top: 30px;
  padding: 10px;
`;
