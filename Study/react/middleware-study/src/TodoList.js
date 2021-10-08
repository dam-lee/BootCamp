import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loadTodosFB } from "./redux/modules/todo";
import styled from "styled-components";
import TodoItem from "./TodoItem";
const TodoList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.todo.list);

  React.useEffect(() => {
    dispatch(loadTodosFB(list));
  }, []);
  return (
    <Container>
      <Wrap>
        <h1>여기는 투두리스트</h1>
        {list.length === 0 ? (
          <p>등록된 내용이 없다.</p>
        ) : (
          list.map((item, index) => {
            return (
              <TodoItem todo={item} index={index} id={item.id} key={item.id} />
            );
          })
        )}
        <button onClick={() => history.push("/create")}>등록</button>
      </Wrap>
    </Container>
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
  button {
    padding: 8px 15px;
    background-color: #fff;
    border: 1px solid #333;
    cursor: pointer;
  }
`;
export default TodoList;
