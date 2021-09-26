const ISLOADING = "dictionary/ISLOADING";
const LOAD = "dictionary/LOAD";
const CREATE = "dictionary/CREATE";
const UPDATE = "dictionary/UPDATE";
const DELETE = "dictionary/DELETE";

const initialState = {
  is_loading: true,
  list: [],
};

export const is_loading = (loading) => {
  return { type: ISLOADING, loading };
};

export const loadDictionary = () => {
  return { type: LOAD };
};

export const createDictionary = (createlist) => {
  return { type: CREATE, createlist };
};

export const updateDictionary = (dictionary, index) => {
  return { type: UPDATE, dictionary, index };
};

export const deleteDictionary = (dictionary, index) => {
  console.log("여기는 삭제 액션 생성 함수!");
  return { type: DELETE, dictionary, index };
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "dictionary/ISLOADING":
      console.log("isloading = ", action);
      return { ...state, is_loading: action.loading };
    case "dictionary/LOAD":
      console.log("state ", state);
      return state;
    case "dictionary/CREATE":
      const addList = [...state.list, action.createlist];
      return { ...state, list: addList, is_loading: false };
    case "dictionary/UPDATE":
      const updateList = state.list.map((item, idx) => {
        return idx === action.index
          ? {
              ...item,
              ...action.dictionary,
            }
          : item;
      });
      return { ...state, list: updateList };
    case "dictionary/DELETE":
      console.log("여기는 삭제 리듀서~");
      const deleteList = state.list.filter((item, idx) => {
        console.log(idx !== action.index);
        return idx !== action.index;
      });
      console.log("deleteList = ", deleteList);
      return { ...state, list: deleteList };
    default:
      return state;
  }
}
