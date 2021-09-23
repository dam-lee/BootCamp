import React from "react"; // 클래스형 컴포넌트로 할때 불러와야함.
import BucketList from "./BucketList";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import Detail from "./Detail.js";
import NotFound from "./NotFound";
// 스토어에 있는 state를 수정하기 위해 dispatch로 수정할거야! 라고 선언.
import { useDispatch } from "react-redux";
// 액션 생성함수를 불러온다
import { createBucket } from "./redux/modules/bucket";

function App() {
  const text = React.useRef(null);
  // useDispatch()함수에서 리턴하는 어떤 객체가 dispatch에 들어간다.
  const dispatch = useDispatch();

  const createTodo = () => {
    const newTodo = text.current.value;
    // 액션을 일으킨다.
    dispatch(createBucket(newTodo));
    text.current.value = "";
  };
  return (
    <>
      <Wrap>
        <Container>
          <Title>버킷 리스트</Title>
          <Line />
          <Switch>
            <Route path={"/"} exact>
              <BucketList />
            </Route>
            <Route path={"/detail/:index"}>
              <Detail />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Container>

        <CreateWrap>
          <Input type="text" ref={text} placeholder="할일을 입력해주세요." />
          <Button onClick={createTodo}>등록</Button>
        </CreateWrap>
      </Wrap>
    </>
  );
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
