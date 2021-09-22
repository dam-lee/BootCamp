import React from "react"; // 클래스형 컴포넌트로 할때 불러와야함.
import BucketList from "./BucketList";
import styled from "styled-components";
// import "./style.css";
// import {BucketList} from "./BucketList"
// function App() {
//   return (
//     <>
//       <h1>버킷 리스트</h1>
//       <BucketList />
//     </>
//   );
// }

// 클래스형 컴포넌트
class App extends React.Component {
  constructor(props) {
    super(props); // super는 부모 클래스의 데이터들 사용
    this.state = {
      list: ["항해99 끝내기", "취업하기", "여행가기", "잠자기"],
    };
    this.text = React.createRef();
  }

  componentDidMount() {
    console.log("componentDidMount");
  }
  // 내가 푼 퀴즈 (todo한개 더 추가하기)
  // createTodo = () => {
  //   this.setState({
  //     ...this.state,
  //     list: this.state.list.concat(this.state.text),
  //     text: "",
  //   });
  //   this.text.current.value = "";
  //   console.log(this.state);
  // };
  createTodo = () => {
    console.log(this.text.current.value);
    const new_item = this.text.current.value;
    this.setState({
      list: [...this.state.list, new_item],
      // list: [...this.state.list].concat(this.text.current.value),
    });
    this.text.current.value = "";
  };
  // 스프레드 문법
  // [...this.state.list, 넣고 싶었던 어떤 값]
  //  list: [...this.state.list, this.text.current.value]

  render = () => {
    return (
      <Wrap>
        <Container>
          <Title>내 버킷리스트</Title>
          <Line />
          <BucketList list={this.state.list} />
        </Container>
        <CreateWrap>
          <Input
            type="text"
            ref={this.text}
            placeholder="할일을 입력해주세요."
          />
          <Button onClick={this.createTodo}>등록</Button>
        </CreateWrap>
      </Wrap>
    );
  };
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  background-color: #eee;
`;
const Container = styled.div`
  width: 50vh;
  max-width: 350px;
  min-height: 80vh;
  margin: auto;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
`;

const Title = styled.h1`
  text-align: center;
  color: slateblue;
`;

const Line = styled.hr`
  margin: 16px 0;
`;
const CreateWrap = styled.div`
  display: flex;
  width: 50vh;
  max-width: 350px;
  margin: 10px auto;
  padding: 16px;
  background-color: #fff;
`;
const Input = styled.input`
  flex: 1;
  padding: 10px;
`;
const Button = styled.button`
  padding: 10px 15px;
  color: #fff;
  border: 1px solid slateblue;
  background-color: slateblue;
`;
export default App;
