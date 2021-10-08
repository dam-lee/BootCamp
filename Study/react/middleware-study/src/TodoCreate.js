import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createTodoFB } from "./redux/modules/todo";
const TodoCreate = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({ text: "" });
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onCreate = () => {
    dispatch(createTodoFB(state));
    history.goBack();
  };

  return (
    <>
      <Container>
        <Wrap>
          <h1>TodoCreate</h1>
          <CreateWrap>
            <input
              name="text"
              value={state.text}
              onChange={onChange}
              type="text"
              placeholder="할일을 등록해주세요"
            />
            <button onClick={onCreate}>등록</button>
          </CreateWrap>

          <button onClick={() => history.goBack()}>뒤로</button>
        </Wrap>
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
const Wrap = styled.div`
  width: 40vw;
  height: 60vh;
  margin: auto;
  padding: 20px;
  border: 1px solid #eee;
`;
const CreateWrap = styled.div`
  display: flex;
  margin-bottom: 20px;

  input {
    flex: 1;
    padding: 8px;
  }
  button {
    padding: 8px 15px;
    background-color: #fff;
    border: 1px solid #333;
    cursor: pointer;
  }
`;
export default TodoCreate;
