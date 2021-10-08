import { db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const LOAD = "todo/LOAD";
const CREATE = "todo/CREATE";
const UPDATE = "todo/UPDATE";
const DELETE = "todo/DELETE";

const initialState = {
  list: [],
};

export const loadTodos = (todos) => {
  return { type: LOAD, todos };
};

export const createTodo = (todo) => {
  return { type: CREATE, todo };
};

export const updateTodo = (todo, id) => {
  return { type: UPDATE, todo, id };
};

export const deleteTodo = (id) => {
  return { type: DELETE, id };
};

export const loadTodosFB = () => {
  return async function (dispatch) {
    const _data = await getDocs(collection(db, "todos"));
    let data = [];
    _data.forEach((item) => {
      data.push({ id: item.id, ...item.data() });
    });
    dispatch(loadTodos(data));
  };
};

export const createTodoFB = (todo) => {
  return async function () {
    await addDoc(collection(db, "todos"), todo);
  };
};

export const updateTodoFB = (todo, id) => {
  return async function (dispatch) {
    const getTodo = await doc(collection(db, "todos"), id);
    await updateDoc(getTodo, { ...todo });
    dispatch(updateTodo(todo, id));
  };
};

export const deleteTodoFB = (id) => {
  return async function (dispatch) {
    const _data = await doc(collection(db, "todos"), id);
    await deleteDoc(_data);
    dispatch(deleteTodo(id));
  };
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "todo/LOAD":
      return { list: action.todos };
    case "todo/CREATE":
      const createTodo = [...state.list, action.todo];
      return { list: createTodo };
    case "todo/UPDATE":
      const updateTodo = state.list.map((item) => {
        return item.id === action.id ? { ...item, ...action.todo } : item;
      });
      return { ...state, list: updateTodo };
    case "todo/DELETE":
      const deleteTodo = state.list.filter((item) => {
        return item.id !== action.id;
      });
      return { ...state, list: deleteTodo };
    default:
      return state;
  }
}
