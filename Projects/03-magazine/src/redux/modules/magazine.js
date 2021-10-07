import { db } from "../../shard/firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useHistory } from "react-router";

const GET_MAGAZINE = "magazine/GET_MAGAZINE";
const ADD_MAGAZINE = "magazine/ADD_MAGAZINE";
const UPDATE_MAGAZINE = "magazine/UPDATE_MAGAZINE";
const DELETE_MAGAZINE = "magazine/DELETE_MAGAZINE";

// const user = {
//   id: "",
//   date: "",
//   title: "",
//   contents: "",
//   like: 0,
//   image_url: "",
//   user_info: {
//     user_id: "",
//     user_name: "",
//   },
// };

// 초기값
const initialState = {
  list: [],
};

// 액션 생성 함수
export function getMagazine(list) {
  return { type: GET_MAGAZINE, list };
}
export function addMagazine(magazine) {
  return { type: ADD_MAGAZINE, magazine };
}
export function updateMagazine(magazine_id, magazine) {
  return { type: UPDATE_MAGAZINE, magazine_id, magazine };
}
export function deleteMagazine(magazine) {
  return { type: DELETE_MAGAZINE, magazine };
}

// 미들웨어 함수 만들기
export const getMagazineFB = () => {
  return async function (dispatch) {
    const _data = await getDocs(collection(db, "magazine"));

    let data = [];
    _data.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    dispatch(getMagazine(data));
  };
};

export const addMagazineFB = (magazine) => {
  return async function () {
    await addDoc(collection(db, "magazine"), magazine);
  };
};

export const updateMagazineFB = (magazine_id, magazine) => {
  return async function (dispatch, getState) {
    const getdata = doc(db, "magazine", magazine_id);
    await updateDoc(getdata, magazine);
    dispatch(updateMagazine(magazine_id, magazine));
  };
};

export const deleteMagazineFB = (magazine_id) => {
  return async function (dispatch, getState) {
    const docref = doc(db, "magazine", magazine_id);
    await deleteDoc(docref);
    const list = getState().magazine.list;
    const newlist = list.filter((item) => item.id !== magazine_id);
    dispatch(deleteMagazine(newlist));
  };
};

// 리듀서
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "magazine/GET_MAGAZINE": {
      return { list: action.list };
    }
    case "magazine/ADD_MAGAZINE": {
      const new_list = [...state.list, action.magazine];
      return { ...state, list: new_list };
    }
    case "magazine/UPDATE_MAGAZINE": {
      return state;
    }
    case "magazine/DELETE_MAGAZINE": {
      return { list: action.magazine };
    }
    default:
      return state;
  }
}
