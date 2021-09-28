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
  > 객체 대신에 함수를 리턴해주기 때문에, 함수는 어떤 동작을 하는 코드의 모음이기 때문에 **특정 액션이 실제로 수행되기 전에 어떤 조건을 주거나, 행동을 사전 처리** 해줄 수 있다.

## 1.redux-thunk 사용하기

- 1. 프로젝트에 <code>yarn add redux-thunk</code> 설치
- 2. configStore에 rootReducer에 Reducer를 모아놓고, 옵셔널한 것들을 추가해서 **store**를 만드는데 옵셔널한 것들 중 하나가 미들웨어이다.
- 3. 필요한것 <code>applyMiddleware , compose</code>
- 4. redux-thunk에서 thunk를 가져온다.
- 5. 미들웨어들도 하나로 묶어준다. <code>const middlewares = [thunk];</code>
- 6. <code>const enhancer = applyMiddleware(...middlewares);</code>
- 7. 스토어에 추가 <code>const store = createStore(rootReducer, enhancer);</code>

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

# 파이어스토어에서 비동기 통신하기. (미들웨어)

## load할 때 데이터를 가져오기로 알아보는 비동기 통신 (파이어 베이스에서)

- action 타입을 만든다.
- action 생성함수를 만든다.
- 미들웨어(통신하는 함수)를 만든다.
- 리듀서를 고친다. (실제로 수정이 되는것은 리듀서이기 때문에, 리듀서를 고침)
- 컴포넌트에서 dispacth해서 서버의 데이터를 불러온다

#### 파이어베이스랑 통신하는 미들웨어 함수는 리덕스 만든 파일에 만든다.

## 미들웨어 함수 만들고 파이어 베이스랑 연동해보기! (LOAD로 알아보는 순서)

### 1.액션 타입 만들고 액션 생성함수 만든다.

1. 액션 타입 생성
2. 읽기 (액션 생성함수)
3. 파라미터로 모든 리스트를 받아온다.

```javascript
// 1. 액션 타입 생성
const LOAD = "bucket/LOAD";
// 2. 읽기 (액션 생성 함수)
// 2-1. 파이어 베이스에서 데이터를 모두 갖고 있어야 하기 때문에
// 2-2. 파라미터로 모든 리스트를 받아온다.
export function loadBucket(bucket_list) {
  return { type: LOAD, bucket_list };
}
```

### 2. 미들웨어 함수를 만든다.

1. 미들웨어 함수를 만들기 전, **파이어 베이스랑 통신하고 파이어 스토어에서 데이터를 가져오는 함수를 만들 것이기 때문에, import로 파이어 베이스에서 만들었던 db를 가져오고, 데이터를 가지고 오는 파이어 베이스의 내장 함수들을 미리 가져온다.**

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
```

### 3. 미들웨어 함수를 만든다.

1. 미들웨어 함수는 인자로 dispatch를 받아온다 (리덕스 thunk는 이렇게 쓴다고 이해하고 넘어가자)
2. 서버에서 데이터를 가져오는것은 비동기 통신이기 때문에 async await 를 사용
3. 데이터를 가져올때 파이어 베이스 내장 함수인 getDocs()를 사용해서 한 콜렉션에 있는 데이터를 전부 가져올 수 있다.

- <code>getDocs(1. 어떤 콜렉션을 가져올것인지 2. 어떤 디비에서 가져올것인지. 3. 콜렉션 이름을 적는다.)</code>
- <code>getDocs(collection(db, "bucket"))</code>

4. Promise로 내려오는 데이터를 결과로 받아보고 싶으면 await을 사용한다.
5. 파이어 베이스에서 받은 data를 배열로 받아보기 위해서 forEach()를 쓰는데, 여기서 forEach는 배열의 고차함수가 아니라 파이어 베이스에서 제공해주는 메소드.
6. 리스트에 파이어 베이스에서 받아온 데이터를 넣어주기 위해 빈 배열을 하나 만들고, push해준다.
7. 파이어 베이스에서 받아온 배열을 dispatch로 리덕스에 넣어준다.

```javascript
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

## 등록으로 알아보는 미들웨어와 파이어 베이스 연동 순서!

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
    // 중요
    // console.log(docRef.data())는 에러가 나온다
    // 이렇게 가져온거는 doc의 참조값이다. 참조하기 위한 값이기 때문에 데이터를 못가져온다.
    // 데이터를 가져올때는 내가 이 내장함수를 쓸수 있는 애인지 알아야한다.
    // 이 모든 내용은 도큐먼트에 있어서 한번씩 읽어보는 것이 좋다.
    // (await getDoc(docRef)).data()
    // const _bucket = await getDoc(docRef);

    // 서버에 제대로 반영되었는지 확인 후 리덕스에 저장할 내용
    // const bucket_data = { id: _bucket.id, ..._bucket.data() };
    // id 만 필요할 경우. 이미 필요한 내용들이 다 bucket에 있다.
    // docRef에서 이미 데이터를 모두 받아왔다.
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

## 업데이트로 알아보는 미들웨어

### 업데이트에서 새로고침 했을때 에러나는 이유

- 비동기 통신을 하는데에는 시간 소요가 된다.
- 그래서 돔을 그릴때 먼저 그려져서 데이터가 없기 때문에 에러가 발생하는 것이다.
- 이 에러를 해결하고 싶을 경우 data가 있으면 보여주고, 없으면 보여주지 않는 조건처리를 해준다.
- 버킷 리스트를 리덕스에서 가져온다. 리덕스에서 가져오는게 먼저 돔에 그려지고 그다음에 비동기 처리가 일어났다.

```javascript
export const updateDictionary = (dictionary, index) => {
  return { type: UPDATE, dictionary, index};
};

export const updateDictionaryFB = (dictionary, id) => {
  return async function (dispatch, getState) {
    try {
      // 1. 어떤것을 해줄것인지 그 도큐먼트 하나를 가져온다.
      const docRef = doc(db, "dictionary", id);

      // 2. 어떤 도큐먼트를 바꿀꺼고, 어떻게 수정해줄건지
      await updateDoc(docRef, {
        word: dictionary.word,
        description: dictionary.description,
        example: dictionary.example,
      });

      // 3. 파이어 베이스에서 업데이트가 끝났으면 리덕스 데이터를 수정
      // 4. findeIndex로 찾아도 되고 docRef에서 받아온 아이디로 해도된다. 강의에서는 index를찾는다.

      // 전체 리스트 가져올때 두번째 매개변수 getState 잊지말자
      const _list = getState().dictionary.list;
      //(findeIndex로 찾아도 되고 docRef에서 받아온 아이디로 해도된다.)
      //item.id와 dictionary id가 같으면 new_index에 일치하는 index를 넣어줌
      const new_index = _list.findIndex((item) => {
        return item.id === id;
      });
      dispatch(updateDictionary(dictionary, new_index));
    } catch (error) {
      console.log(error);
    }
  };
};


case "dictionary/UPDATE":
  const new_list = state.list.map((item, index) => {
    return action.id === item.id
      ? {
          ...item,
          word: action.dictionary.wrod,
          description: action.dictionary.description,
          example: action.description.example,
        }
      : item;
  });
```

## 삭제로 알아보는 미들웨어

-

```javascript
export const deleteDictionary = (dictionary) => {
  return { type: DELETE, dictionary };
};

export const deleteDictionaryFB = (id) => {
  return async function (dispatch, getState) {
    if(!id){
      alert("id가 없다")
      return;
    }
    try {
      // 파이어베이스에서 id값이 일치하는 애 1개를 가져옴
      const docRef = doc(db, "dictionary", id);
      // 그 아이를 서버에서 지워줌
      await deleteDoc(docRef);

      // 파이어 베이스에서 지워진게 확인되었으니 리덕스에서도 지워준다.
      // 두번째 인자 getState로 리덕스의 전체 리스트를 가져옴.
      const _list = getState().dictionary.list;

      // 리덕스에 있는 전체 데이터를 filter로 같지 않은애들만 걸러줌
      const new_list = _list.filter((i) => {
        return i.id !== id;
      });

      // 걸러낸 애들을 dispatch 를 해서 바꿔줄거라고 명시함!
      dispatch(deleteDictionary(new_list));
    } catch (error) {
      console.log(error);
    }
  };
};
    case "dictionary/DELETE":
      return { ...state, list: action.dictionary };
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

미다님 파이에버에스에 단어 추가할떄 dispatch를 주석처리하라고했던게 생성페이지에서 파이어베이스에서 생성하고 메인페이지로 돌아오면서 useEffect에의해 파이어베이스에서 데이터를 가져와서 생성된것도 포함시켜서 스토어에넣으니까 생성하면서까지 스토어에 넣게되면 중복이되서 그런것같네요.
