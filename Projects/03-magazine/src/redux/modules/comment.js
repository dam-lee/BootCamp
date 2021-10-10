import { db } from "../../shared/firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import moment from "moment";

const GET_COMMENT = "comment/GET_COMMENT";
const ADD_COMMENT = "comment/ADD_COMMENT";
const DELETE_COMMENT = "comment/DELETE_COMMENT";

const initialState = {
  list: [],
};

const get_comment = (comment_list) => {
  return { type: GET_COMMENT, comment_list };
};

const add_comment = (comment) => {
  return { type: ADD_COMMENT, comment };
};

const delete_comment = (comment_id) => {
  return { type: DELETE_COMMENT, comment_id };
};

export const getCommentFB = (magazine_id) => {
  return async function (dispatch) {
    const _list = await getDocs(collection(db, "comment"));
    const list = [];
    _list.forEach((item) => {
      list.push({
        comment_id: item.id,
        magazine_id: magazine_id,
        ...item.data(),
      });
    });
    dispatch(get_comment(list));
  };
};

export const addCommentFB = (comment) => {
  return async function (dispatch) {
    const date = moment().format("YYYY-MM-DD");
    const date_sort = moment().format("YYYYMMDDhhmmss");
    const newComment = {
      ...comment,
      date,
      date_sort,
    };
    const test = await addDoc(collection(db, "comment"), newComment);
    dispatch(add_comment({ ...newComment, comment_id: test.id }));
  };
};

export const deleteCommentFB = (comment_id) => {
  return async function (dispatch) {
    const docref = doc(db, "comment", comment_id);
    await deleteDoc(docref);
    dispatch(delete_comment(comment_id));
  };
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "comment/GET_COMMENT": {
      return { list: action.comment_list };
    }
    case "comment/ADD_COMMENT": {
      const newList = [...state.list, action.comment];
      return { list: newList };
    }
    case "comment/DELETE_COMMENT": {
      const newList = state.list.filter(
        (item) => item.comment_id !== action.comment_id
      );
      return { list: newList };
    }
    default:
      return state;
  }
}
