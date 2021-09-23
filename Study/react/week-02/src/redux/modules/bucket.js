// bucket.js

// Actions type 정해주는것
// my-app 프로젝트명
// widgets 모듈명
// LOAD 어떤 액션인지
// const LOAD = "my-app/widgets/LOAD";
// const CREATE = "my-app/widgets/CREATE";
// const UPDATE = "my-app/widgets/UPDATE";
// const REMOVE = "my-app/widgets/REMOVE";

const CREATE = "bucket/CREATE";
const REMOVE = "bucket/REMOVE";
const DELETE = "bucket/DELETE";
// 맨처음 초기값
const initialState = {
  list: ["항해99 끝내기", "취업하기", "여행가기", "redux"],
};

// Action Creators
export function createBucket(bucket) {
  // console.log("액션을 실행할고양!");
  return { type: CREATE, bucket };
}
// 내가 한거
export function removeBucket(bucket) {
  console.log("삭제 액션을 실행할고양! = ", bucket);
  return { type: REMOVE, bucket };
}
// 튜터님이 한거
export function deleteBucket(bucket_index) {
  console.log("지울 버킷 인덱스 === ", bucket_index);
  return { type: DELETE, bucket_index };
}
// Reducer
export default function reducer(state = initialState, action = {}) {
  // console.log("이제 값을 바꿀꺼야");
  switch (action.type) {
    case "bucket/CREATE": {
      // 새로운 배열에 기존 값인 list와 새로운 데이터인 action의 bucket을 추가해준다.
      const new_bucket_list = [...state.list, action.bucket];
      return { list: new_bucket_list };
    }
    // 내가 한거
    case "bucket/REMOVE": {
      // 새로운 배열에 기존 값인 list와 새로운 데이터인 action의 bucket을 추가해준다.
      const remove_bucket_list = [...action.bucket];
      console.log("remove_bucket_list === ", action.bucket);
      return { list: remove_bucket_list };
    }
    // 튜터님이 한것 filter를 여기서 한다.
    case "bucket/DELETE": {
      // console.log(state, action);
      const new_bucket_list = state.list.filter((item, idx) => {
        return parseInt(action.bucket_index) !== idx;
      });
      return { list: new_bucket_list };
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
