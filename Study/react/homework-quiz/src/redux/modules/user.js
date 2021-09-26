import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const initialState = {
  user_name: "",
  ranking: [],
  is_loading: true,
};
const USERNAME = "user/USERNAME";
const ADDRANKING = "user/ADDRANKING";
const RANKINGLIST = "user/RANKINGLIST";
const ISLOADING = "user/ISLOADING";
export const isLoading = (loading) => {
  return { type: ISLOADING, loading };
};
// 2. 액션 생성 함수
export const createUserName = (user_name) => {
  return { type: USERNAME, user_name };
};

// 유저 랭킹 등록
export const createRanking = (user_ranking) => {
  return { type: ADDRANKING, user_ranking };
};

// 유저의 랭킹 목록 불러오기
export const userRankingList = (ranking_list) => {
  return { type: RANKINGLIST, ranking_list };
};

// 유저 랭킹을 서버에 등록하는 미들웨어
export const createRankingFB = (user_ranking) => {
  return async function (dispatch) {
    await addDoc(collection(db, "ranking"), user_ranking);
  };
};
// 유저 랭킹 목록을 서버에서 받아오는 미들웨어
export const userRankingListFB = () => {
  return async function (dispatch) {
    dispatch(isLoading(false));
    const _data = await getDocs(collection(db, "ranking"));
    const data = [];
    _data.forEach((item) => {
      data.push({ id: item.id, ...item.data() });
    });
    dispatch(userRankingList(data));
  };
};

// 3. 리듀서
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ISLOADING:
      return { ...state, is_loading: action.loading };
    case USERNAME:
      return { ...state, user_name: action.user_name };

    case RANKINGLIST:
      return { ...state, ranking: action.ranking_list, is_loading: true };
    default:
      return state;
  }
}
