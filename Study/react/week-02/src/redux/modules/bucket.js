// bucket.js

// Actions type 정해주는것
// my-app 프로젝트명
// widgets 모듈명
// LOAD 어떤 액션인지
// const LOAD = "my-app/widgets/LOAD";
// const CREATE = "my-app/widgets/CREATE";
// const UPDATE = "my-app/widgets/UPDATE";
// const REMOVE = "my-app/widgets/REMOVE";

import { db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const CREATE = "bucket/CREATE";
const REMOVE = "bucket/REMOVE";
// 튜터님
const DELETE = "bucket/DELETE";
const UPDATE = "bucket/UPDATE";
const LOAD = "bucket/LOAD";

const ISLOADED = "bucket/ISLOADED";
// 맨처음 초기값
const initialState = {
  is_loaded: false,
  list: [],
  // list: ["항해99 끝내기", "취업하기", "여행가기", "redux"],
};

export function isLoaded(loaded) {
  return { type: ISLOADED, loaded };
}

// 읽기
export function loadBucket(bucket_list) {
  return { type: LOAD, bucket_list };
}
// 등록
export function createBucket(bucket) {
  return { type: CREATE, bucket };
}
// 업데이트 (할일 완료하기)
export function updateBucket(bucket_index) {
  return { type: UPDATE, bucket_index };
}
// 튜터님이 한거 삭제
export function deleteBucket(bucket_index) {
  return { type: DELETE, bucket_index };
}

// 미들웨어 함수 만들기
export const loadBucketFB = () => {
  // 미들웨어는 함수를 리턴 (매개변수로 dispatch)
  return async function (dispatch) {
    const bucket_data = await getDocs(collection(db, "bucket"));

    let bucket_list = [];
    bucket_data.forEach((bucket) => {
      // 이렇게 하거나
      //  bucket_list = [...bucket_list, { ...bucket.data() }];
      // 배열 내장함수로 하거나
      bucket_list.push({ id: bucket.id, ...bucket.data() });
    });

    dispatch(loadBucket(bucket_list));
  };
};

export const addBucketFB = (bucket) => {
  return async function (dispatch) {
    dispatch(isLoaded(false));
    const docRef = await addDoc(collection(db, "bucket"), bucket);
    // id 만 필요할 경우. 이미 필요한 내용들이 다 bucket에 있다.
    const bucket_data = { id: docRef.id, ...bucket };

    // const _bucket = await getDoc(docRef);
    // const bucket_data = { id: _bucket.id, ..._bucket.data() };

    dispatch(createBucket(bucket_data));

    //  docRef.data(), 는 error
    // 그 이유는 type이 doc이다. doc의 레퍼런스(참조값)이다.
    // console.log("docRef = ", (await getDoc(docRef)).data());
  };
};

// 버킷리스트의 수정은 done:false => true만 변경하기 때문에 데이터를 안받아옴
export const updateBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    // console.log("bucket_id = ", bucket_id);
    const docRef = doc(db, "bucket", bucket_id);
    // 어떤 아이를 바꿀꺼고, 어떤 값을 바꿀건지
    await updateDoc(docRef, { done: true });
    // 서버에 업데이트 된 내용이 잘 반영되었으니 리덕스의 값도 변경해준다.

    // 버킷 리스트의 데이터를 전체 갖고온다. dispatch 두번째 인자
    // console.log(getState().bucket);
    const _bucket_list = getState().bucket.list;
    // 전체 list index찾기
    const bucket_index = _bucket_list.findIndex((item) => {
      return item.id === bucket_id;
    });
    dispatch(updateBucket(bucket_index));
    // console.log("bucket_index = ", bucket_index);
  };
};

// 삭제될 미들웨어
// 서버에 있는 데이터가 바뀐게 확실할때 리덕스의 값을 바꾼다.

export const deleteBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    if (!bucket_id) {
      window.alert("아이디가 없어요");
      return;
    }
    // 1. 어떤 도큐먼트를 지워줄 건지 가져온다.
    const docRef = doc(db, "bucket", bucket_id);
    // 2. 서버에서 어떤 도큐먼트 지울지
    await deleteDoc(docRef);
    // 3. 전체 버킷 리스트를 가져오기
    const _bucket_list = getState().bucket.list;
    // 4. 전체 버킷 리스트들 중에서 내가 파라미터로 받아온 버킷 아이디와 같은 것을 찾고
    // 같다면 그 아이의 인덱스를 가져온다.
    const bucket_index = _bucket_list.findIndex((item) => {
      return item.id === bucket_id;
    });
    dispatch(deleteBucket(bucket_index));
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/ISLOADED":
      return { ...state, is_loaded: action.loaded };
    case "bucket/LOAD":
      return { list: action.bucket_list, is_loaded: true };

    case "bucket/CREATE": {
      // 새로운 배열에 기존 값인 list와 새로운 데이터인 action의 bucket을 추가해준다.
      const new_bucket_list = [...state.list, action.bucket];
      return { ...state, list: new_bucket_list, is_loaded: true };
    }
    // 내가 한거
    // case "bucket/REMOVE": {
    //   // 새로운 배열에 기존 값인 list와 새로운 데이터인 action의 bucket을 추가해준다.
    //   const remove_bucket_list = [...action.bucket];
    //   console.log("remove_bucket_list === ", action.bucket);
    //   return { list: remove_bucket_list };
    // }
    case "bucket/UPDATE": {
      const new_bucket_list = state.list.map((item, index) => {
        return parseInt(action.bucket_index) === index
          ? { ...item, done: true }
          : item;
      });
      return { ...state, list: new_bucket_list };
    }
    // 튜터님이 한것 filter를 여기서 한다.
    case "bucket/DELETE": {
      // console.log(state, action);
      const new_bucket_list = state.list.filter((item, idx) => {
        return parseInt(action.bucket_index) !== idx;
      });
      return { ...state, list: new_bucket_list };
    }

    default:
      return state;
  }
}

// 미들웨어
// 서버에서 데이터를 가져와야 할 때 시간이 걸려서 보통 비동기 통신을 한다.
// 데이터를 바로 리듀서에 넘겨줄 수 없다. 아직 데이터를 서버에서 안가져왔으니까
// 그럴때 미들웨어라는 중간다리를 놓는다.
// 이것은 미들웨어를 이렇게 쓰라는 예시
// side effects, only as applicable
// e.g. thunks, epics, etc
// export function getWidget() {
//   return (dispatch) =>
//     get("/widget").then((widget) => dispatch(updateWidget(widget)));
// }
// export function updateWidget(widget) {
// 딕셔너리인데 key:value외에 파라미터 widget가 있는데
// 자바스크립트는 key와 value 이름이 똑같으면 생략 가능
//   return { type: UPDATE, widget };
// }
