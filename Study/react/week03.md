> 리액트 기본 강의 3주차 내용 정리.
> 리덕스는 형제관계의 컴포넌트는 데이터를 주고 받을 수 없고,
> 자식 컴포넌트가 엄청 많이 생겼을때 무수히 많이 넘겨줘야 하는 일이 발생함.

# EventListener

- 이벤트는 사용자가 어떤 행동을 했을 때 일어나는 사건. (마우스 클릭, 키보드 누름 등)
- 이벤트 리스너를 추가한다는 것을 구독한다고도 한다.
- <code>e.target</code> 이벤트가 발생한 요소
- <code>.addEventListener(어떤 이벤트, 어떤 행동을 할게)</code>라는 인자 두개를 넘겨줘야함.
- 컴포넌트가 사라졌다가 다시 생기면 이벤트 리스너가 또 생김. 무한 반복
- **이벤트를 등록했으면, 컴포넌트가 사라질때 이벤트를 해지해줘야 한다.** (마우스오버 같은 경우 해제를 안하면, 계속 이벤트가 여러번 발생됨)
- 컴포넌트가 사라질 때의 라이프 사이클인 componentWillUnmount()에 해지해줌 (이 과정을 클린업이라고 부른다.)
- 개발자 도구에서 elements -> Event Listener에서 확인 할 수 있다.

## 함수형 컴포넌트에서 EventListener 구독하기

- <code>React.useEffect(() => {},[])</code>

* 컴포넌트가 렌더링이 되면 화살표 함수를 실행한다.
* 실행될 때 조건이 있으며, 1번째에는 무조건 화살표 함수가 실행되며, 2번째 부터(리렌더링)는 []인 디펜던시 어레이 (의존성 배열)에 들어가 있는 요소를 확인한다.
* 디펜던시 어레이 요소가 바뀐 것이 있는지 확인하고, 바뀐게 있을때만 화살표 함수를 실행한다.
* 디펜더시 어레이가 비어있으면 컴포넌트 didMount처럼 움직임. (다시 화살표 함수를 실행하지 않는다.)
* 예를 들어 a라는 값이 디펜더시 어레이에 있으면, a가 값이 바뀔때마다 화살표 함수가 다시 실행된다.
* <code>React.useEffect(() => { return () => 여기가 clean up 부분, 컴포넌트가 사라질 때 일어날 동작을 여기다가 적는다.},[])<</code>

```javascript
// 첫번째 인자는 익숙하죠! 화살표 함수! 넵, 렌더링 시 실행할 함수가 여기에 들어갑니다.
// 두번째 인자의 []! 디펜던시 어레이라고 불러요. 여기 넣어준 값이 변하면 첫번째 인자인 콜백함수를 실행합니다.
React.useEffect(() => {
  // 여기가 rendering 때 실행될 구문이 들어가는 부분입니다.
  // componentDidMount, componentDidUpdate일 때 동작하는 부분이 여기예요.
  // do something ...

  return () => {
    // 여기가 clean up 부분입니다.
    // componentWillUnmount 때 동작하는 부분이 여기예요.
    //do something ...
  };
}, []);

// (2) 어떤 행동(=이벤트 발생!) 뒤에 실행할 함수 먼저 만들어요.
const hoverEvent = (e) => {
  // 콘솔로 이 이벤트가 누구에게서 일어났는 지 확인할 수 있습니다.
  console.log(e.target);
  // ref랑 같은 녀석인 지 확인해봐요!
  console.log(text.current);

  text.current.style.background = "yellow";
};
```

# 라우팅

- 페이지에서 페이지로 이동하는 방법
- MPA 방식 : 멀티 페이지 어플리케이션 (HTML을 여러개 가지고 있는 어플리케이션)
- SPA 방식 : 싱글 페이지 어플리케이션 (HTML을 한개 가지고 있는 어플리케이션) - 리액트

## SPA의 장점

- 보통 헤더랑 푸터는 똑같다. 변하지 않는 영역들이 있다.
- 바뀌는 부분만 가상돔에서 진짜 돔으로 갈아치기만 하면 되기 때문이다.
- MPA는 상태 값을 유지하는게 어렵다. (상태 값 : 그 페이지에서 가지고 있는 데이터)
  예를들면, 회원가입 페이지같은경우 입력칸을 모두 입력했는데 위에 뭔가를 빠트렸을때, 내가 입력한 모든 정보가 날아가는 경우가 있다. 이것이 상태 값이 유지되지 않기 때문에 일어난다.
- MAP에서는 회원가입에 성공해야 다른 페이지로 보낸다. 실패하면 다시 회원가입 페이지로 보내는 경우가 있다, 회원가입 페이지로 다시 보내면 HTML을 다시 받아오니까 입력 값이 모두 날라간다. (상태 값이 유지가 안됨)

## SPA의 단점

- 다른 MAP 방식 같은 경우 유저가 그 페이지에 방문해야 그 페이지에 대한 데이터(HTML,CSS,JS)를 받는다. SPA의 경우는 모든 정적 자원이 하나로 통으로 있기 때문에, 유저가 회원가입을 할지 안할지 모르지만 회원가입 페이지에 대한 모든 것을 다 불러온다. (즉 사용자가 안볼 모든 페이지까지 모두 가져오기 때문에, 첫 방문할때 로딩 속도가 굉장히 느려질 수 있다.) - 모든 정적 자원을 다 가지고 오기 때문에 필요한 정보들만 쪼개서 보여주고 하기 때문에, 첫번째 로딩은 조금 느릴지라도 그 이후 페이지 이동은 속도가 빠르다.

## 라우팅

- 이렇게 SPA에서 쪼개서 보여주는 것을 라우팅 방법이다.
- 어떻게 컴포넌트를 구성할지 보여주는 것
- 이미 만들어진 라우팅 라이브러리를 사용한다.

## react-router-dom 패키지

- 리액트 사용하는 사람들의 대부분이 사용하는 라이브러리

## BrowserRouter

- 파일 안에서 페이지가 실제로 주소창을 참고해서 이동되도록 해줌.
- 주소창을 보고 컴포넌트를 분기처리 해주는 것

## Route

- 분기점을 알려줌
- 예를 들어 <code><Route path="">컴포넌트</Route></code> path에 맞게 자식 컴포넌트를 보여주는게 Route

## 1. index.js

- 프로젝트의 시작점

```javascript
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  document.getElementById("root") // 어디에
);

function App() {
  // 여기까지 하고 확인해보면 localhost:3000/cat을 치면, home내용도 들어가있다.
  // 그 이유는 /가 이미 home이기 때문에 이걸 포함해서 보여줌
  // 주소창에 cat을 쳤을때 cat 화면만 보여주고 싶을때 route에 exact 를 입력한다.
  // exact가 없을땐, 포함하면 다 보여줘라 이고, exact가 포함되면 완전히 똑같을때만 보여줘라로 변경된다.
  return (
    <>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/cat">
        <Cat />
      </Route>
      <Route path="/dog">
        <Dog />
      </Route>
    </>
  );
}
```

```javascript
function App() {
  // route 자식 컴포넌트에 props넘겨주는거
  return (
    <>
      <Route exact path="/">
        <Home data={"im data"} />
      </Route>
      <Route path="/cat">
        <Cat />
      </Route>
      <Route path="/dog">
        <Dog />
      </Route>
    </>
  );
}
```

# URL 파라미터

- 웹사이트 주소에 파라미터와 쿼리가 있다.
- 파라미터 : /cat/nabi
- 쿼리 : /cat?name=nabi

```javascript
function App() {
  return (
    <>
      <Route exact path="/">
        <Home data={"im data"} />
      </Route>
      // cat에서 계속 파라미터가 바뀔것이다. // 동적으로 cat_name 이 계속 바뀌는
      것을 동적 라우팅이라고 부른다. // :변수명(파라미터명) 으로 받아오면 된다.
      <Route path="/cat/:cat_name">
        <Cat />
      </Route>
      <Route path="/dog">
        <Dog />
      </Route>
    </>
  );
}
```

- <code>import { useParams } from "react-router-dom";</code>로 컴포넌트에서 uesParams를 불러온다.
- const cat_name = useParams(); 컴포넌트에서 파라미터 값을 받아올 수 있다.
- <code><Route path="/cat/:cat_name" exact component={Cat}></Route></code> 이렇게도 사용가능하다.
- <code><Route path="/cat/:cat_name" exact component={Cat}></Route></code>로 컴포넌트를 넘겨줄때 cat컴포넌트에서 props를 콘솔찍으면, history, location, match등 여러가지 속성을 받아 올 수 있다.

```javascript
import React from "react";
import { Link, Route } from "react-router-dom";
import Home from "./Home";
import Cat from "./Cat";
import Dog from "./Dog";
function App() {
  return (
    <>
      <div>
        <Link to="/">HOME</Link>
        <Link to="/cat">Cat</Link>
        <Link to="/dog">Dog</Link>
      </div>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/cat" component={Cat}>
        {/* <Cat />/ */}
      </Route>
      <Route path="/dog">
        <Dog />
      </Route>
    </>
  );
}

export default App;
```

#### Link 를 사용 못할 때? history 객체를 사용할 수 있다.

```javascript
import React from "react";

const Dog = (props) => {
  console.log("dog props = ", props);
  // props.history.push("/home") 여기서 push는 페이지로 이동하는것
  return (
    <>
      <h1 onClick={() => props.history.push("/home")}>
        여기는 강아지 페이지입니다.
      </h1>
    </>
  );
};

export default Dog;
```

## route에서 component 로 설정 안했을 경우 훅스 써서 이동

```javascript
// app.js
<Route path="/dog">
  <Dog />
</Route>;

// dog.js
import React from "react";
import { useHistory } from "react-router";
// useHistory 훅을 불러온다.

const Dog = (props) => {
  console.log("dog props = ", props);
  // // useHistory 훅을 사용한다.
  const history = useHistory();
  return (
    <>
      <h1 onClick={() => history.push("/")}>여기는 강아지 페이지입니다.</h1>
    </>
  );
};

export default Dog;
```

## 라우팅, 조금 더 꼼꼼히 사용하기

- 없는 페이지로 들어갔을때

```javascript
<Switch>
  <Route path={"/"} exact>
    <BucketList list={state.list} />
  </Route>
  <Route path={"/detail"} exact>
    <Detail />
  </Route>
  <Route>
    <NotFound />
  </Route>
</Switch>
```

- <code><Switch></Switch></code>는 하나씩 확인하면서 맞는 것을 찾고 끝난다. 모두가 안맞으면 맨 마지막이 뜬다.
- path 지정을 안한 마지막이 뜬다.
- <code>history.goBack()</code> 여기서 goBack은 뒤로가기 이다.

# 리덕스

- 전역 상태 관리 라이브러리 (전역 저장소)

## 1. 상태 관리 흐름

- Store
- Action
- Reducer
- Component

#### 1. 전역으로 볼 수 있는 데이터가 있다.

#### 2. 그 데이터를 참조(구독)와 수정할 수 있는 무언가가 있다.

#### 3. 그 데이터를 참조하는 애들 중 누군가는 이 데이터를 수정하고 싶어한다. (참조하는 애와 수정하는 애가 있다.)

#### 4. 바뀐 값을 모두(구독한 컴포넌트들)가 볼 수 있게 해줘야 한다.

1. 액션을 일으키면 리듀서가 실제로 값이 변하는 곳이기 때문에 (1-2로 값이 변경되는 것은 리듀서에서 이루어짐, 리듀서가 스토어에 있는 값을 변경함) 새로운 데이터를 받아옴으로 컴포넌트들이 렌더링이 다시 된다.
2. 우리 눈에도 새로운 데이터가 보인다.

# 리액트의 상태관리 흐름

1. 컴포넌트들이 스토어에서 데이터 받아가는것 (구독)
2. 참조하는애가 있으면, 데이터를 바꾸고 싶어하는애가 있다. 데이터를 바꿔주는 것을 action을 dispatch했다고 표현한다.
3. action을 일으킨것은 수정을 할거다 라고 알려준 것이다.
4. 리덕스에서는 리듀서가 데이터를 실제적으로 바꿔버린다. (스토어에 저장된 데이터를 변경함)
5. 스토어(리덕스)는 데이터가 바뀌면 스토어의 값이 바뀌었다고 알려준다.
6. 컴포넌트들은 새로운 데이터(수정된 데이터)를 가져 온다.
7. 새로운 데이터를 가져왔기 때문에 리렌더링 된다.
   (데이터를 바꿀거야 하고 알리고, 데이터를 바꾸고, 데이터 바뀐것을 알려준다.)

```javascript
yarn add redux react-redux

// 여러가지 패키지 설치할때는 띄어쓰기로 여러개 설치가 가능하다.
```

- 리덕스는 리액트 뿐만 아니라 뷰나 앵귤러등 프론트엔드 프레임워크 라이브러리에서 사용할 수 있다.
- ko.redux.js.org

# 리덕스 개념과 용어

## 1. State

- 저장하고 있는 상태값(데이터)를 state라고 부른다.
- 딕셔너리 형태({key:value})로 보관한다.

## 2. Action

- 데이터를 수정할때 (상태(데이터)에 변화가 필요할때) 발생하는 것,
- 나는 지금 얘를 수정할거야! 를 action을 일으킨다 라고 한다.
- 즉 action은 나 뭐 바꾸고 싶어 하는 것이다.

```javascript
// 액션은 객체이다.
// type은 이름으로 임의의 문자열을 넣는다.
// data는 이 데이터로 변경할거야 이다.
{type:'CHANGE_STATE', data:{...}}
```

## 3. ActionCreator

- 액션 생성 함수. 액션을 만들기 위해 사용한다

```javascript
const changeState = (new_data) => {
  // 액션을 리턴한다. 액션 생성 함수이기 때문에
  return {
    type: "CHANGE_STATE",
    data: new_data,
  };
};
```

## 4. Reducer

- 리덕스에 저장된 상태(데이터)를 변경하는 함수
- 리덕스에서 데이터를 실제로 바꾸는 곳이 reducer이다.
- 데이터를 저장하는 곳이 store고 reducer는 실제로 바꾸는 곳. (액션을 디스패치하면 리듀서가 자동실행되며 리듀서가 스토어에 있는 데이터를 바꿔버린다.)

```javascript
// 기본 상태값을 임의로 정함
const initialState = {
  name: "mida",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    // action의 타입마다 케이스문을 걸어주면,
    // 액션에 따라서 새로운 값을 돌려준다.
    case CHANGE_STATE:
      return { name: "mida lee" };

    default:
      return false;
  }
}
```

## 5. Store

- 사실 store는 리듀서를 묶어서 스토어를 만든다. 즉 스토어 안에 리듀서가 포함되어있다.
- 스토어는 데이터도 갖고 있고 리듀서도 갖고 있다.
- 상태값을 컴포넌트에 보내주기 위한 내장함수들도 갖고 있다.

## 6. dispatch

- 액션을 발생시키는 역할 . 나 이거 바꿔줘! 하고 요청하는 부분

```javascript
// 실제로는 이것보다 코드가 길지만,
// 간단히 표현하자면 이런 식으로 우리가 발생시키고자 하는 액션을 파라미터로 넘겨서 사용.
dispatch(action);
```

# 리덕스의 3가지 특징

1. store는 1개만 쓴다.

- 리덕스는 단일 스토어 규칙을 따르기 때문에 한 프로젝트에 스토어는 하나만 쓴다.
- 단일 스토어에 리듀서는 여러개일 수 있다.

2. store의 state(데이터)는 오직 action으로만 변경할 수 있다.

- a, b, c 컴포넌트가 state를 보고 있다.
- c 가 데이터를 변경했다.
- 다른 컴포넌트들한테 알려줄 수 없다. (누가 바꼈는지 모르니까)
- c 가 원래 값을 +1 -1 할때, 원래 값을 모르니까 데이터가 마구잡이로 변경될 수 있다.
- 그래서 리듀서만 실제로 데이터를 변경할 수 있도록 한다.

3. 어떤 요청이 와도 리듀서는 같은 동작을 해야한다.

#### 리듀서의 규칙

- 리듀서는 순수한 함수여야 한다는 뜻.
- 같은 값을 넣으면 항상 같은 값이 나와야한다.
- 예를들어 파라미터 1를 넣으면 3이 리턴되는 함수를 만들면, 항상 1을 넣었을때는 항상 3이 나와야 한다는 것이다.
- 예를들면 랜덤함수같은경우 1+랜덤어쩌구 하면 1을 넣어도 항상 랜덤된 값이 나올 수 있다. 이런것은 순수한 함수가 아니다. (매번 리턴하는 값이 다르기 때문에)
- 파라미터 외에 값에는 의존하면 안된다. 이 말은, 전역 변수 무언가를 가져와서 쓰면 안된다.
- 내가 파라미터로 받아온 값 외에는 아무것도 참조하면 안된다.
- 이전 상태는 수정하면 안된다. 예를들면, 리듀서에서 state를 직접적으로 건드리면 안된다.
- 오직 리듀서 안에서는 <code>return 2 </code>이런식으로 새로운 state를 반환하는 것만 가능하다.

# 리덕스 써보기

## 1. 덕스(ducks) 구조

- 보통 리덕스를 사용할 때 모양새대로 분리해서 작성한다. (action, actionCreator,reducer를 분리해서)
- 덕스 구조는 기능으로 묶어서 작성하는 방법<br/>
  (예: 버킷 리스트의 action, actionCreator, reducer를 한 파일에 넣는 것)

## 모듈 만들기~

// 리듀서는 여러개 쓸 수 있기 때문에 리듀서를 싹 다 묶고, 그외 필요한 옵션들을 추가해서 통으로 묶어서 createStore에 넘겨준다.
// 그렇게 store가 만들어진다.

## 리덕스와 컴포넌트 연결하기

index.js
리덕스 스토어를 컴포넌트에 주입한다

```javascript
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// 내가 만든 스토어를 가져옴
import store from "./redux/configStore";
ReactDOM.render(
  // provider로 감싸고 스토어를 넘겨준다.
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
```

## 컴포넌트에서 리덕스 데이터 사용하기

### 1. 리덕스 훅

```javascript
// useDispatch는 데이터를 업데이트할 때,
// useSelector는 데이터를 가져올 때 쓴다.
import { useDispatch, useSelector } from "react-redux";

// 리덕스에 있는 데이터를 가져올 때 쓰는 훅. useSelector
import { useSelector } from "react-redux";
// 화살표 함수가 받는 인자인 (state)는 스토어가 갖고 있는 전체 데이터를 말하고
// => state는 스토어가 갖고 있는 모든 데이터 보려고 함
const data = useSelector((state) => state);

// 수정할 컴포넌트에서
// 스토어에 있는 state를 수정하기 위해 dispatch로 수정할거야! 라고 선언.
import { useDispatch } from "react-redux";
// 액션 생성함수를 불러온다
import { createBucket } from "./redux/modules/bucket";
// useDispatch()함수에서 리턴하는 어떤 객체가 dispatch에 들어간다.
const dispatch = useDispatch();
// 액션을 일으킨다.
dispatch(createBucket(newTodo));
```

#### 순서

1. 액션을 일으킴 <code>dispatch(createBucket(newTodo));</code>
2. 액션 생성 함수가 실행됨

```javascript
export function createBucket(bucket) {
  console.log("액션을 생성할고양!");
  return { type: CREATE, bucket };
}
```

3. 리듀서 함수에서 스토어의 값을 바꿔줌

```javascript
export default function reducer(state = initialState, action = {}) {
  console.log("이제 값을 바꿀꺼야");
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
```

## 퀴즈

1. 몇번째를 눌렀니? -> detail컴포넌트가 알아야한다. url파라미터로 인덱스 번호(useSelector)
2. 누른것을 가져온다. -> 리덕스 스토어의 데이터를 가져와서, 번호가 맞는 것을 가져온다 useParams

```javascript
import React from "react";
import { useParams } from "react-router-dom";
// 리덕스에서 버킷리스트 데이터 가져오기
import { useSelector } from "react-redux";
const Detail = (props) => {
  const params = useParams();
  const bucket_list = useSelector((state) => state.bucket.list);
  const bucket_index = params.index;
  console.log("detail params == ", params);
  console.log("detail index == ", bucket_index);
  console.log("detail bucket_index == ", bucket_list[bucket_index]);
  return (
    <>
      <h1>{bucket_list[bucket_index]}</h1>
    </>
  );
};

export default Detail;
```

# 숙제 퀴즈 만들기

## 순서

0. 라우터설정. 브라우저 라우터
1. 폴더를 만든다
   redux > modules : quiz.js (리듀서정의) / configStore.js (루트 리듀서)

#### quiz.js

- 액션 타입 정의
- 액션 생성 함수 정의 (export)
- state 초기값 생성
- 리듀서 함수 생성 (export default)

#### configStore.js

- store 생성 (createStore) - redux
- rootReducer 상수에 여러 리듀서를 한번에 묶기. combineReducers({리듀서들}) - redux
- store 상수에 createSotre(rootReducer)

2. index.js

- 스토어를 모든 컴포넌트에서 쓰게 하기 위해 Provider를 react-redux에서 가져옴
- configStore에서 만든 store를 Provider에 연결한다.

3. 스토어 데이터 값 가져오기

- 스토어에 있는 데이터를 가져다가 쓸라면?! <code>useSelector()</code>를 react-redux에서 가져옴

4. 스토어의 값 바꾸기 dispatch

- dispatch(액션 함수)
- dispatch로 생성한 액션함수를 갖고온다.
