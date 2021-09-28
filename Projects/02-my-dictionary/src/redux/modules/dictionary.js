import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const ISLOADING = "dictionary/ISLOADING";
const LOAD = "dictionary/LOAD";
const CREATE = "dictionary/CREATE";
const UPDATE = "dictionary/UPDATE";
const DELETE = "dictionary/DELETE";

const initialState = {
  is_loading: false,
  list: [],
};

export const is_loading = (loading) => {
  return { type: ISLOADING, loading };
};

export const loadDictionary = (dictionary) => {
  return { type: LOAD, dictionary };
};

export const createDictionary = (dictionary) => {
  return { type: CREATE, dictionary };
};

export const updateDictionary = (dictionary) => {
  return { type: UPDATE, dictionary };
};

export const deleteDictionary = (dictionary) => {
  return { type: DELETE, dictionary };
};

export const loadDictionaryFB = () => {
  return async function (dispatch) {
    try {
      dispatch(is_loading(false));

      const dictionary_db = await getDocs(collection(db, "dictionary"));

      const dictionary_list = [];
      dictionary_db.forEach((item) => {
        dictionary_list.push({ ...item.data(), id: item.id });
      });

      dispatch(loadDictionary(dictionary_list));
      dispatch(is_loading(true));
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const createDictionaryFB = (dictionary) => {
  return async function (dispatch) {
    try {
      await addDoc(collection(db, "dictionary"), dictionary);
      // dispatch(createDictionary(new_list));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateDictionaryFB = (dictionary, id) => {
  return async function (dispatch, getState) {
    try {
      const docRef = doc(db, "dictionary", id);

      // 어떤 아이를 바꿀꺼고, 어떤 값을 바꿀건지
      await updateDoc(docRef, {
        word: dictionary.word,
        description: dictionary.description,
        example: dictionary.example,
      });

      // 전체 리스트 가져올때 두번째 매개변수 getState 잊지말자
      const _list = getState().dictionary.list;
      const list = _list.map((item) => {
        return item.id === id ? { ...item, ...dictionary } : item;
      });
      dispatch(updateDictionary(list));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteDictionaryFB = (id) => {
  return async function (dispatch, getState) {
    try {
      // 파이어베이스에서 id값이 일치하는 애 1개를 가져옴
      const docRef = doc(db, "dictionary", id);
      // 그 아이를 서버에서 지워줌
      await deleteDoc(docRef);

      // 두번째 인자 getState로 리덕스의 전체 리스트를 가져옴.
      const _list = getState().dictionary.list;

      // 리덕스에 있는 전체 데이터를 filter로 같지 않은애들만 걸러줌
      // findIndex()로 처리해줘도됨.
      const new_list = _list.filter((item) => {
        return item.id !== id;
      });

      // 걸러낸 애들을 dispatch 를 해서 바꿔줄거라고 명시함!
      dispatch(deleteDictionary(new_list));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "dictionary/ISLOADING":
      return { ...state, is_loading: action.loading };
    case "dictionary/LOAD":
      return { ...state, list: action.dictionary };
    case "dictionary/CREATE":
      const addList = [...state.list, action.dictionary];
      return { ...state, list: addList };
    case "dictionary/UPDATE":
      return { ...state, list: action.dictionary };
    case "dictionary/DELETE":
      return { ...state, list: action.dictionary };
    default:
      return state;
  }
}
