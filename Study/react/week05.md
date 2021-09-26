# 미들웨어

- 파이어스토어(서버)에서 데이터 가져올때 미들웨어 필요함 (비동기 통신)
- 파이어스토어에서 데이터를 가져왔는지 안왔는지 확인할 수 없다.
- 그래서 비동기 통신을 한다.
- <code>yarn add redux-thunk</code>
- 미들웨어는 action dispatch와 reducer의 중간다리 역할을 한다.
- 미리 사전 작업을 할 수 있다.
- action이 일어나고 미들웨어가 자기 할일(비동기 통신)을 하고, 리듀서에서 그 일을 처리한다.

# redux-thunk

- **객체 대신 함수를 생성하는 액션 생성함수**를 작성할 수 있게 해준다.
  > 객체 대신에 함수를 리턴해주기 때문에, 함수는 어떤 동작을 하는 코드의 모음이기 때문에 특정 액션이 실제로 수행되기 전에 어떤 조건을 주거나, 행동을 사전 처리 해줄 수 있다.

## 1.redux-thunk 사용하기

- 프로젝트에 <code>yarn add redux-thunk</code> 설치
- configStore에 rootReducer에 Reducer를 모아놓고, 옵셔널한 것들을 추가해서 **store**를 만드는데 옵셔널한 것들 중 하나가 미들웨어이다.

```javascript
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import quiz from "./modules/quiz";
import user from "./modules/user";
import ranking from "./modules/ranking";

// 미들웨어도 하나로 적용할 수 있다.
const middlewares = [thunk];
// 리듀서말고 옵셔널한 것들의 모음 enhancer. 미들웨어들을 풀어서 추가해줄 수 있다.
const enhancer = applyMiddleware(...middlewares);

//const rootReducer = combineReducers({ 리듀서모음 });
const rootReducer = combineReducers({ quiz, user, ranking });

// 스토어에 리듀서와 옵셔널한 것들을 추가해서 스토어를 만든다.
const store = createStore(rootReducer, enhancer);

export default store;
```

## 파이어스토어에서 비동기 통신하기.

### 1. load할 때 데이터를 가져오기

- action 타입을 만든다.
- action 생성함수를 만든다.
- 미들웨어(통신하는 함수)를 만든다.
- 리듀서를 고친다.
- 컴포넌트에서 dispacth해서 서버의 데이터를 불러온다

#### 파이어베이스랑 통신하는 함수는 리덕스 만든 파일에 만든다.

#### 미들웨어 함수 만들기.

```javascript
// bucket.js
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
// 액션 타입 생성
const LOAD = "bucket/LOAD";
// 읽기 (액션 생성 함수)
export function loadBucket(bucket_list) {
  return { type: LOAD, bucket_list };
}
// 미들웨어 함수 만들기 (실제 서버에서 먼저 비동기 통신)
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

// Reducer 실제 서버에 잘 반영이 된다면 그 다음 리덕스에 저장
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/LOAD":
      return { list: action.bucket_list };

    default:
      return state;
  }
}
```

## 순서 기억.

1. 액션 타입, 액션 생성함수 만든다.
2. 미들웨어 함수를 만든다.
3. 미들웨어 함수 안에서 서버에 제대로 반영되었는지 확인한다.
4. 제대로 서버에 반영 되었으면, 그 값을 리덕스에 저장해준다.

```javascript
// 등록 액션 생성 함수
export function createBucket(bucket) {
  return { type: CREATE, bucket };
}
// 등록하는 미들웨어 함수
export const addBucketFB = (bucket) => {
  return async function (dispatch) {
    // 1. 내 db를 먼저 넣고, 2. db의 콜렉션 이름 적고 3. 바꿔줄 데이터
    const docRef = await addDoc(collection(db, "bucket"), bucket);
    // 서버에 제대로 반영되었는지 확인 후 리덕스에 저장할 내용
    // id 만 필요할 경우. 이미 필요한 내용들이 다 bucket에 있다.
    const bucket_data = { id: docRef.id, ...bucket };
    // 찾은 데이터를 리덕스에 반영해준다.
    dispatch(createBucket(bucket_data));
  };
};

// 리덕스 리듀서
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/CREATE": {
      // 새로운 배열에 기존 값인 list와 새로운 데이터인 action의 bucket을 추가해준다.
      const new_bucket_list = [...state.list, action.bucket];
      return { list: new_bucket_list };
    }

    default:
      return state;
  }
}

// 등록 버튼 클릭했을 때 일어나는 함수
const createTodo = () => {
  dispatch(addBucketFB({ text: text.current.value, done: false }));
};
```

# 머테리얼 UI

- 이미 만들어진 예쁜 UI를 가져다가 쓰는 것
- <code>yarn add @material-ui/core @material-ui/icons</code>
- <code>import Button from "@material-ui/core/Button";</code>

# 페이지 의도적으로 가릴 때

- 네트워크 느린 경우 테스트
- 네트워크 - no throtting -> slow 3g로 변경
  > 로딩 스피너를 만들어 둔다.

## 로딩 스피너 만들기

```javascript
// 액션을 하나 만들어주고
const ISLOADED = "bucket/ISLOADED";
export function isLoaded(loaded) {
  return { type: ISLOADED, loaded };
}
// 필요한 미들웨어 함수에서, 서버 데이터 호출 전에 띄워주고
export const addBucketFB = (bucket) => {
  return async function (dispatch) {
    dispatch(isLoaded(false));
    const docRef = await addDoc(collection(db, "bucket"), bucket);
    const bucket_data = { id: docRef.id, ...bucket };
    dispatch(createBucket(bucket_data));
  };
};

// 서버랑 통신이 끝나면 리덕스에 상태가 저장되니까
/// 필요한 곳에 상태 값을 바꿔준다.
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/ISLOADED":
      return { ...state, is_loaded: action.loaded };
    case "bucket/LOAD":
      return { list: action.bucket_list, is_loaded: true };
    case "bucket/CREATE": {
      const new_bucket_list = [...state.list, action.bucket];
      return { ...state, list: new_bucket_list, is_loaded: true };
    }
    default:
      return state;
  }
}

// 필요한 컴포넌트
{
  !is_loaded && <Spinner />;
}
```

# AWS S3 버킷

## S3(Simple Storage Service) 버킷이란?

- 단순 스토리지 서비스

* 클라우드 상에 어떤 폴더같은것을 만든다고 생각하면 된다. (폴더같은게 버킷)
* 폴더을 만들고 img , text 같은것을 저장해 놓을 수 있다.
* html, css, js 같은 정적 자원을 버킷에다가 저장하고, 정적 웹 사이트를 호스팅할 수 있다.
* aws 콘솔 -> s3 -> 버킷만들기 ->AWS 리전(서버 컴퓨터가 있는 위치)
* 버킷 버전 관리는, 파일 a에서 오타나서 수정후 a를 다시 올릴때 보통 기존 a가 사라지는데 버전관리는 a1 이런식으로 어딘가에 남겨져있다.

## 정적 웹 사이트란?

- 웹 사이트는 서버 측 스크립트 사용 유무를 기준으로 동적 웹 사이트와 정적 웹사이트로 나눌 수 있다.
- 정적 웹 사이트는 html, css, js로 만든 사이트이다. (리액트도)

## S3 버킷 설정

### 도메인 구입했을 경우

- https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/WebsiteHosting.html

## 5주차 숙제

- 파이어 베이스 연결
- 스피너 연결
- 완성된 사이트 s3에 배포
-
