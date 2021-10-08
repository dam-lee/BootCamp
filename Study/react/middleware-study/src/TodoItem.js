import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTodoFB } from "./redux/modules/todo";

const TodoItem = ({ todo, id, index }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onUpdate = (index) => {
    history.push(`/update/${index}`);
  };

  const onDelete = (id) => {
    dispatch(deleteTodoFB(id));
  };

  return (
    <>
      <TodoItemWrap>
        <p>{todo.text}</p>
        <button onClick={() => onUpdate(index)}>수정</button>
        <button onClick={() => onDelete(id)}>삭제</button>
      </TodoItemWrap>
    </>
  );
};

const TodoItemWrap = styled.div`
  display: flex;
  margin-bottom: 10px;
  border: 1px solid #eee;

  p {
    flex: 1;
  }
  button {
    &:last-child {
      margin-left: 10px;
    }
  }
`;

export default TodoItem;
