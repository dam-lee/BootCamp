import React from "react"; // 클래스형 컴포넌트로 할때 불러와야함.
import BucketList from "./BucketList";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import Detail from "./Detail.js";
import NotFound from "./NotFound";
// 스토어에 있는 state를 수정하기 위해 dispatch로 수정할거야! 라고 선언.
import { useDispatch, useSelector } from "react-redux";
// 액션 생성함수를 불러온다
import { loadBucketFB, addBucketFB } from "./redux/modules/bucket";
import Progress from "./Progress";
import Spinner from "./Spinner";

function App() {
  const text = React.useRef(null);
  // useDispatch()함수에서 리턴하는 어떤 객체가 dispatch에 들어간다.
  const dispatch = useDispatch();
  const is_loaded = useSelector((state) => state.bucket.is_loaded);
  const createTodo = () => {
    const newTodo = text.current.value;
    // 액션을 일으킨다.
    // dispatch(createBucket({text:newTodo, done:false}));
    // dispatch(createBucket({ text: newTodo, done: false }));
    // addBucketFB;
    dispatch(addBucketFB({ text: newTodo, done: false }));
    text.current.value = "";
  };

  // React.useEffect(async () => {
  //   console.log("Db === ", db);
  //   const query = await getDocs(collection(db, "bucket"));
  //   console.log(query);
  //   query.forEach((doc) => {
  //     console.log("doc = ", doc.id, doc.data());
  //   });
  // }, []);

  React.useEffect(() => {
    dispatch(loadBucketFB());
  }, []);

  return (
    <>
      {!is_loaded && <Spinner />}

      <Wrap>
        <Container>
          <Title>버킷 리스트</Title>
          <Progress />
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
        {/* <TopButton onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}>위로가기</TopButton> */}
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  width: 50vh;
  max-width: 350px;
  max-height: 60vh;
  height: 60vh;
  margin: 50px auto 0;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  overflow-y: auto;
  overflow-x: hidden;
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
  & input:focus {
    outline: none;
    border: 1px solid slateblue;
  }
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
// const TopButton = styled.button`
//   width: 60px;
//   height: 60px;
//   font-size: 11px;
//   border-radius: 50%;
//   border: 1px solid black;
// `;
export default App;
