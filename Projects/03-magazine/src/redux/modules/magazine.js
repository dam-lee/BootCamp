import { db, storage } from "../../shared/firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import moment from "moment";

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
export function updateMagazine(index, magazine) {
  return { type: UPDATE_MAGAZINE, index, magazine };
}
export function deleteMagazine(index) {
  return { type: DELETE_MAGAZINE, index };
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

export const addMagazineFB = (magazine, file) => {
  return function (dispatch, getState, { history }) {
    const user = getState().user.user;
    const date = moment().format("YYYY-MM-DD hh:mm:ss");
    const _upload = storage.ref(`image/${file.name}`).put(file);

    _upload.then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        const newMagazine = {
          ...magazine,
          date: date,
          like: 0,
          image_url: url,
          user_info: {
            user_name: user.user_name,
            user_profile: url,
            user_id: user.id,
            user_uid: user.uid,
          },
        };
        addDoc(collection(db, "magazine"), newMagazine);
        history.push("/");
      });
    });
  };
};

export const updateMagazineFB = (magazine_id, magazine) => {
  return async function (dispatch, getState, { history }) {
    const getdata = doc(db, "magazine", magazine_id);
    await updateDoc(getdata, magazine);
    const docRef = getState().magazine.list;
    const index = docRef.findIndex((i) => i.id === magazine_id);
    dispatch(updateMagazine(index, magazine));
    history.replace("/");
  };
};

export const deleteMagazineFB = (magazine_id) => {
  return async function (dispatch, getState, { history }) {
    const docref = doc(db, "magazine", magazine_id);
    await deleteDoc(docref);
    const docRef = getState().magazine.list;
    const index = docRef.findIndex((i) => i.id === magazine_id);
    dispatch(deleteMagazine(index));
    history.push("/");
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
      const index = action.index;
      const _list = action.magazine;
      const newlist = state.list.map((item, idx) => {
        return idx === index
          ? { ...item, contents: _list.contents, title: _list.title }
          : item;
      });
      return { ...state, list: newlist };
    }
    case "magazine/DELETE_MAGAZINE": {
      const newlist = state.list.filter((_item, idx) => {
        return idx !== action.index;
      });
      return { ...state, list: newlist };
    }
    default:
      return state;
  }
}
