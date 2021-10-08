import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateTodoFB } from "./redux/modules/todo";
const TodoUpdate = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const todo_list = useSelector((state) => state.todo.list);
  const todo_index = parseInt(params.index);
  const [state, setState] = React.useState({ text: "" });

  const onLoad = () => {
    setState({ text: todo_list[todo_index].text });
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onClick = () => {
    dispatch(updateTodoFB(state, todo_list[todo_index].id));
    history.push("/");
  };

  React.useEffect(() => {
    if (todo_list.length === 0) {
      history.push("/");
    } else {
      onLoad();
    }
  }, []);

  return (
    <>
      <Container>
        <Wrap>
          <h1>updateTodo</h1>
          <CreateWrap>
            <input
              name="text"
              value={state.text}
              type="text"
              onChange={onChange}
            />
            <button onClick={() => onClick()}>수정</button>
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
export default TodoUpdate;
