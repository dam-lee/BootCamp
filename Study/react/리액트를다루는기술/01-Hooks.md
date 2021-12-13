# useState

```javascript
import React, { useState } from "react";

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

- setCount의 인자로 초기값을 넣어준다.
- count 변수, 해당 변수를 갱신할 수 있는 함수 이 두 가지 쌍을 반환한다.
- React는 해당 count를 리렌더링할 때 기억하고, 가장 최근에 갱신된 값을 제공하며. count 변수의 값을 갱신하려면 setCount를 호출한다.
- 아홉 번째 줄: 사용자가 버튼 클릭을 하면 setCount 함수를 호출하여 state 변수를 갱신.
- React는 새로운 count 변수를 Example 컴포넌트에 넘기며 **해당 컴포넌트를 리렌더링**한다.

# useEffect

- useEffect Hook을 마운트가 될때, 특정값이 업데이트가 될때, 뒷정리 함수가 합쳐진 것으로 생각한다.
- 마운트가 될때만 실행하려면 deps([])를 비어 있는 배열로 넣어주면 된다.
- 특정 값이 업데이트가 될때 실행하고 싶으면, deps에 특정 값을 넣어준다.
- 뒷정리 함수는 **언마운트되기 전이나, 업데이트 되기 직전에 작업을 수행할때 쓴다.**

## 1. 정리(Clean-up)를 이용하지 않는 Effects

- React가 DOM을 업데이트한 뒤 추가로 코드를 실행해야 하는 경우
- 네트워크 리퀘스트, DOM 수동 조작, 로깅 등은 정리(clean-up)가 필요 없는 경우들.

### 1-1. useEffect가 하는 일

- 컴포넌트 렌더링 이후에 어떤일을 수행하는지 정의
- **DOM 업데이트를 수행한 이후**에 데이터를 가져오거나 API를 불러내는 일 등 다양한 일을 할 수 있다.

### 1-2. useEffect를 컴포넌트 안에서 불러내는 이유

- useEffect를 컴포넌트 내부에 둠으로써 effect를 통해 count state 변수(또는 그 어떤 prop에도)에 접근할 수 있게 된다.

* 함수 범위 안에 존재하기 때문에 특별한 API 없이도 값을 얻을 수 있는 것

### 1-3. useEffect는 렌더링 이후에 매번 수행되는가?

- 기본적으로 첫번째 렌더링과 이후의 모든 업데이트에서 수행된다.

* React는 **effect가 수행되는 시점에 이미 DOM이 업데이트되었음**을 보장한다.

## 2. 정리(clean-up)를 이용하는 Effects

- 외부 데이터에 구독(subscription)을 설정해야 하는 경우

* 메모리 누수가 발생하지 않도록 정리(clean-up)하는 것은 매우 중요하다.

```javascript
import React, { useState, useEffect } from "react";

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // effect 이후에 어떻게 정리(clean-up)할 것인지 표시.
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return "Loading...";
  }
  return isOnline ? "Online" : "Offline";
}
```

### 2-1. effect에서 함수를 반환하는 이유?

- 모든 effect는 정리를 위한 함수를 반환할 수 있다.
- 이 점이 구독의 추가와 제거를 위한 로직을 가까이 묶어 둘 수 있게 합니다. 구독의 추가와 제거가 모두 하나의 effect를 구성하는 것이다.

### 2-2. effect를 정리(clean-up)하는 시점은 정확히 언제일까?

- 컴포넌트가 마운트 해제될때에 정리(clean-up)를 실행한다.
- 하지만 effect는 한번이 아니라, 렌더링이 실행되는 때마다 실행이 된다. 이 또한 정리하는 이유이다.

## effect가 업데이트 시마다 실행되는 이유

- 왜 effect 정리(clean-up)가 마운트 해제되는 때에 한번만이 아니라 모든 리렌더링 시에 실행되는가? -> class 의 componentDidUpdate를 제대로 다루지 않기 때문이다.

* useEffect가 기본적으로 업데이트를 다루기 때문에 더는 업데이트를 위한 특별한 코드가 필요 없다.

## 성능 최적화

- 모든 렌더링 이후에 effect를 정리(clean-up)하거나 적용하는 것이 가끔 성능 저하를 발생시키는 경우도 있다.
- useEffect의 선택적 인수인 두번째 인수에 배열을 넘긴다.

```javascript
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // count가 바뀔 때만 effect를 재실행
```

1. count가 5이고 컴포넌트가 리렌더링 된 후에도 여전히 5라면 react는 이저너 렌더링시의 값 5를 그다음 렌더링때의 5와 비교한다.
2. 배열내의 모든 값이 같기 때문에(5===5) react는 effect를 건너뛰면서 최적화가 가능해진다.
3. count가 6으로 업데이트 된 뒤에 렌더링하면 react는 이전에 렌더링된 값 5를 그다음 렌더링시의 6과 비교한다.
4. 이 때, 5 !== 6 이기 때문에 react는 effect를 재실행한다.
5. 배열 내에 여러개의 값이 있다면 그중의 단 하나만 다를지라도 react는 effect를 재실행한다.

- 정리(clean-up)를 사용하는 effect의 경우에도 동일하게 작용

# useMemo

- 메모이제이션된 값을 반환한다.

```javascript
const memoizedValue = useMemo(() => sum(a, b), [a, b]);
```

- 생성 함수와 생성함수의 의존성 값의 배열을 전달한다.
- useMemo는 **의존성 값이 변경되었을 때에만 메모이제이션된 값을 다시 계산**한다.
- useMemo를 사용함으로써, 모든 렌더링시의 고비용 계산을 방지한다.
- useMemo로 전달된 함수는 **렌더링 중에 실행**된다.
- 사이드 이펙트는 useEffect에서 하고, useMemo에서 하는 일이 아니다.
- 의존성 배열이 없는 경우 매 렌더링 때마다 새 값을 계산한다.
- 의존성 값의 배열은 함수에 인자로 전달되지 않는다. 함수 안에서 참조되는 모든 값은 의존성 값의 배열에 나타나야 한다.

* 의존성 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용한다.

> ## 메모이제이션이란?
>
> 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술

# useCallback

- 메모이제이션된 콜백을 반환한다.

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

- 인라인 콜백과 의존성 값의 배열을 전달한다.
- 컴포넌트가 리렌더링 될 때마다 함수들이 새로 생성되는데 useCallback을 사용하면, 콜백의 의존성 값이 변경되었을때에만 변경된다.
- 불필요한 렌더링을 방지하기 위한 방법으로, 배열을 빈값으로 넣어주면 컴포넌트가 렌더링될 때 단 한번만 함수가 생성된다.
- 함수 내부에서 상태값에 의존해야 할 때는 반드시 두번째 파라미터에 포함시켜줘야 한다.
- 예를들어 onChange의 경우 기존의 값을 조회하지 않고 바로 설정만 함으로, 배열이 비어있어도 되지만, 기존의 값을 조회해서 새로운 값을 반환할때에는 배열안에 의존성값을 넣어줘야한다.

```javascript
useCallback(() => {
  console.log("hello world"); // useCallback은 함수를 재사용할때 사용
}, []); // 의존성 값을 넣어준다. 비어있으면 렌더링시 단 한번만 함수가 생성됨.

useMemo(() => {
  const fn = () => {
    console.log("hello world"); // useMemo는 값을 재사용할때 사용.
  };
  return fn;
}, []); // 의존성 값을 넣어준다. 비어있으면 렌더링시 값을 매번 새로 연산한다.
// 함수 안에 참조되는 값들은 의존성 배열에 넣어줘야 한다.
// 의존성 값이 바뀌지 않았다면 이전의 값들을 다시 사용한다.
```

## **숫자, 문자열, 객체처럼 일반 값을 재사용하려면 useMemo를 사용하고, 함수를 재사용하려면 useCallback을 사용**한다.

# useRef

- .current 프로퍼티에 변경 가능한 ref 객체를 반환.

* useRef는 **매번 렌더링을 할 때마다 동일한 ref 객체를 제공**한다.
* useRef는 내용이 변경될 때 변경된 내용을 알려주지 않는다.
* useRef를 사용하여 ref를 설정하면, useRef를 통해 만든 객체 안의 current값이 실제 엘리먼트를 가리킨다.
* useRef는 로컬 변수로도 사용할 수 있고, 로컬변수는 렌더링과 상관없이 바뀔 수 있는 값을 의미한다. 이때, ref안의 값이 바뀌어도 컴포넌트가 렌더링 되지 않는다는 점에 주의해야 한다.

```javascript
useImperativeHandle(ref, createHandle, [deps])
// ref를 사용할때 부모 컴포넌트에 노출되는 값은 forwardRef 와 같이 사용한다.
// React.forwardRef 는 전달받은 ref를 하부 트리 내의 다른 컴포넌트로 전달한다.


function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

- 위의 예시에서 <FancyInput ref={inputRef} />를 렌더링한 부모 컴포넌트는 inputRef.current.focus()를 호출할 수 있다.
