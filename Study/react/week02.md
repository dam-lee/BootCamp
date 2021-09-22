# 가상돔이란?

- DOM은 html 단위 하나하나를 객체로 생각하는 모델.
- 텍스트노드, 자식노드 등등, 노드들로 이루어진 트리 구조

> DOM 트리 중 하나가 수정될 때마다 모든 DOM을 읽어서 수정한걸 찾고 수정하고 하면 필요없는 연산이 너무 많이 일어나기 때문에 가상 돔이 생겨났다.

가상돔은 메모리상에만 존재하고 눈에는 보이지 않으며, 컴포넌트 변경이 일어났을때 가상돔에 전체를 그린 후 진짜 DOM과 비교 후 변경된 부분만 진짜 DOM에 반영하는 것이 **리액트에서의 가상돔 개념**이다.

> ## 어떨 때에 돔을 새로 그릴까?

- 첫 페이지에 들어갔을때 돔이 변경됨. (진짜 돔을 그림.)
- 데이터가 변경되었을때 (가상돔에서 데이터 작업을 하고 마지막에 진짜 돔에 반영)

가상돔을 쓰면 진짜 돔을 매번 업데이트 하는것보다 연산처리가 빨라진다.

## DOM이 정말 그렇게 느릴까?

- 반은 맞고, 반은 틀리다.
- 사이트 구조에 따라 가상돔을 쓰는 것보다 훨씬 성능이 좋을 수 있고(빠를 수 있고), 느릴 수 있다.

# 라이프 사이클이란?

## 컴포넌트의 라이프 사이클은 크게 3가지로 구분 될 수 있다.

1. 생성 될 때 (Mount. 화면에 그려진다.)
2. 업데이트 할 때 (update. 수정할때)
3. 제거 할 때 (unMount 화면에서 사라질때)

### 생성 될 때 과정.

constructor -> render -> componentDid-Mount.

### 수정될 때의 경우

- props가 바뀔 때
- state가 바뀔 때
- 부모 컴포넌트가 업데이트 되었을 때 (리렌더링 되었을 때)
- 강제로 업데이트 했을 경우 (forceUpdate()를 통해 강제로 컴포넌트 업데이트를 할 수 있다.)

### 제거의 경우

- 페이지 이동
- 사용자의 행동(삭제 클릭 등)으로 인해 컴포넌트가 화면에서 사라지는 경우

#### 클래스형 컴포넌트, 함수형 컴포넌트

리액트에서 공식적으로 함수형 컴포넌트를 쓰라고 선언한 상태.

> 라이프 사이클 함수를 배우는 이유 ?
> 라이프 사이클 메소드는 컴포넌트 생애주기를 잘 보여주기 때문이다.
> useEffect는 생애주기를 확 알기 어렵기 때문에.

## 클래스 컴포넌트로 알아보는 라이프 사이클

```javascript
import React from "react";

// 클래스형 컴포넌트는 이렇게 생겼습니다!
class LifecycleEx extends React.Component {
  // 생성자 함수, 초기 값 설정
  constructor(props) {
    super(props);

    this.state = {
      cat_name: "나비",
    };

    console.log("in constructor!"); // 1번. 초기값 설정이 먼저 찍힘
  }

  changeCatName = () => {
    // 다음 강의에서 배울, state 업데이트 하는 방법입니다!
    // 지금은 componentDidUpdate()를 보기 위해 쓰는 거니까, 처음보는 거라고 당황하지 말기!
    this.setState({ cat_name: "바둑이" });

    console.log("고양이 이름을 바꾼다!"); // 버튼을 클릭했을 때 1번째로 찍힘.
  };

  // 가상돔이 실제 돔에 올라가는 메소드
  componentDidMount() {
    // 3번째로 콘솔에 찍힘
    // 화면에 나타나는게 끝났다.
    // dom에 완벽하게 올라갔을 때. 딱 맨처음 1번만 생김. 딱 한번만 생성될 테니까
    // 리렌더링될 때 실행되지 않는다.
    // 보통 ajax나 event를 여기서 많이 한다.
    console.log("in componentDidMount!");
  }

  componentDidUpdate(prevProps, prevState) {
    // 버튼을 클릭했을 때 3번째로 찍힘
    // 이전에 내가 갖고 있던 값과 새롭게 변경될 값을 찍어줌
    // 부모한테 받은 props가 없어서 안찍힘,
    // 리렌더링이 끝난 다음에 호출이 되는 라이프 사이클 메소드 함수이다.
    console.log(prevProps, prevState);
    console.log("in componentDidUpdate!");
  }

  componentWillUnmount() {
    // 컴포넌트가 사라졌을 때 호출되는 라이프 사이클 메소드
    // 화면에서 완전히 사라지기 직전에 호출됨.
    console.log("in componentWillUnmount!");
  }

  // 랜더 함수 안에 리액트 엘리먼트를 넣어줍니다!
  render() {
    console.log("in render!"); // 2번째로 콘솔에 찍힘.
    // 생성 된 다음에 render에 들어왔다는 것은 생성된 컴포넌트를 DOM에다가 붙일 거야!
    // 붙일 dom은 return안에 내용들.
    // 버튼을 클릭했을 때 2번째로 찍힘

    return (
      <div>
        {/* render 안에서 컴포넌트의 데이터 state를 참조할 수 있습니다. */}
        <h1>제 고양이 이름은 {this.state.cat_name}입니다.</h1>
        <button onClick={this.changeCatName}>고양이 이름 바꾸기</button>
      </div>
    );
  }
}

export default LifecycleEx;
```

## 컴포넌트가 처음 실행 되었을때 순서

1. <code>constructor()</code> 가 제일 먼저 실행됨

- 초기값을 설정해주는 함수이기 때문에 <code>console.log</code>에 제일 먼저 찍힌다.

2. <code>render()</code> 함수가 두번째로 실행됨.

- <code>constructor()</code>가 생성된 다음 <code>render()</code>에 들어왔다는 것은 생성된 컴포넌트를 DOM에 붙일거라는 의미.
- 붙일 DOM은 <code>return</code>안의 내용들이다.
- 리액트 요소들이 가상돔에서 진짜돔으로 올라간다.
- <code>render()</code>안에 들어갈 내용은 컴포넌트 모양에만 관여하는 것이 가장 좋다. 즉 state나 props를 건드려 데이터를 수정하려고 하면 안된다.

3. <code>componentDidMount()</code>가 세번째로 실행됨.

- 실제 DOM에 완벽하게 올라갔을 때 찍힘. (컴포넌트가 화면에 나타났을 때)
- 딱 한번만 생성되기 때문에 맨 처음 1번만 찍힌다.
- 리렌더링 될 때에는 실행되지 않는다.
- 보통 <code>ajax, event</code>를 여기서 실행한다.

## 컴포넌트에서 사건(event), 또는 수정이 일어났을 때 순서

1. <code>changeCatName()</code> 함수가 실행된다.
2. <code>render()</code>함수가 실행된다.
3. <code>componentDidUpdate()</code> 업데이트 함수가 실행된다. **리렌더링이 끝난 다음에 호출되는 라이프 사이클 메소드 함수.**

- 업데이트 되기 전 props, state를 보여준다. 이때 부모한테 받은 props가 없어서 {}가 찍히고 내 데이터인 state가 찍힌다.
- **현재 데이터와 이전 데이터를 비교**하려면 여기서 비교한다.
- <code>componentDidUpdate()</code>도 가상돔이 실제 돔으로 올라간 뒤이기 때문에 DOM관련 처리도 가능

## 컴포넌트가 사라졌을 때

- <code>componentWillUnmount()</code>가 호출된다.
- 컴포넌트가 사라졌을 때 호출되는 라이프 사이클 메소드
- **화면에서 완전히 사라지기 직전에 호출됨.**
- 스크롤 위치를 추적하거나, 어떤 이벤트 리스너를 등록했다면 **여기서 해제를 해줘야 한다.**

# Component

리액트는 레고이며 컴포넌트는 조각이라고 표현할 수 있다.
조각 하나하나를 얼마나 잘 쌓는가도 굉장히 중요하다.
**웹 사이트를 잘 조각낼 줄 아는 사람을 리액트를 잘 쓰는 사람**이라고 한다.

# State , Props

## 1. State

- <code>state</code>는 Component가 가지고 있는 데이터이다.
- 내가 가지고 있는 데이터이기 때문에 수정할 수 있다.

## 2. Props

- 부모 Component가 가지고 있는 데이터.
- 부모 Component의 데이터를 가져다가 쓸 수 있다.
- **props로 받은 데이터는 수정할 수 없다.** 부모의 값이기 때문에 자식이 변경 불가.

# 버킷리스트

컨트롤 c로 서버를 꺼놨어도 리액트가 보이는 이유
서버와 클라이언트는 요청과 응답으로 이루어져 있다.
서버를 꺼놨는데 리액트가 돌아가는 이유는 서버가 클라이언트에 html css js 파일을 이미 보내줬기 때문에 보여주는 것이다.
클라이언트가 새로고침을 한다거나, 무언가를 요청할때는 연결할 수 없다고 나온다.

마진병합상세
자식요소의 마진이 부모영역으로 넘어간 상태를 말함.
display: flex; 으로 변경

## styled-components

styled-components는 프로젝트 안에서 설치해줘야 한다.
package.json의 dependencies는 프로젝트에서 쓰이는 모든 패키지들을 기록해준다.

#### 장점

- class 이름 짓기에서 해방된다.
- 컴포넌트에 스타일을 적기 때문에, 간단하고 직관적이다.
- css-in-js 라이브러리 중 하나.
- props를 줘서 사용할 수 있다.

```javascript
<MyStyled bg_color={"black"} />;
const MyStyled = styled.div`
  width: 50vw;
  height: 150px;
  background-color: ${(props) => (props.bg_color ? "red" : "blue")};
  p {
    color: #fff;
  }
  &:hover {
    background-color: yellow;
  }
`;
```

scss 문법
중괄호 안에다가 중괄호 또 쓰는 기법을 레스팅 기법이라 한다.

## Ref

리액트에서 돔요소를 가져올때 사용한다.
이름표 같은 거라고 생각할 수 있다. ref.current

#### 클래스형 컴포넌트 Ref

<code>this.text = React.createRef();</code>

#### 함수형 컴포넌트 Ref

<code>React.useRef()</code>

# State

리액트는 단방향 데이터 흐름이다. (데이터가 위에서 아래로, 부모에서 자식으로 넘겨준다)

#### 단방향으로 쓰는 이유

라이프 사이클과 엮어서 생각해보면, 데이터는 위에서 아래로 넘겨주는데 , 라이프 사이클에서 생성될때까지는 상관이 없지만, 업데이트 되었을때 부모의 state가 있고, 이 값을 자식한테 그대로 넘겨줘야 할 경우
부모 데이터 state
자식은 부모 데이터 props로 받아옴
자식이 리렌더링 되면 여기서 작업은 끝이난다.
자식이 부모한테 데이터를 줘야 하는 경우
줘야하는 데이터가 props나, state처럼 무언가에 영향을 줘야 할 경우
자식이 부모한테 영향이 가기 때문에, 자식이 부모의 렌더링을 일으킨다.
부모가 재렌더링이 되었기 때문에 자식도 같이 재렌더링이 된다.
이런식으로 무한루프에 빠지게 된다.
이런 이유 때문에 양방향보다 단방향으로 쓰는 것이 좋다.

React.useState(3); // 리액트 훅을 써서 State를 만듬.
const [count, setCount] = React.useState(3);
count는 현재값 setCount는 변경할때사용

## ... 스프레드 문법

```javascript
// [...this.state.list, 넣고 싶었던 어떤 값]
list: [...this.state.list, this.text.current.value];

createTodo = () => {
  const new_item = this.text.current.value;
  this.setState({
    list: [...this.state.list, new_item],
  });
  this.text.current.value = "";
};
```

# 정리

- 컴포넌트의 라이프 사이클은 크게 나누면 3가지 (생성,수정,삭제)
- 리렌더링 되는 경우

1. 부모컴포넌트가 리렌더링되면 자식도 같이 리렌더링 됨.
2. 컴포넌트 자체의 state나 받아온 props가 변했을때)
3. 강제 업데이트 되는 경우 (최대한 안하는게 좋아서 안알려줌)

- DOM에 직접 접근하는 방법 Ref
-
