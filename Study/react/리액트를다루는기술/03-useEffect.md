# useEffect 완벽가이드
> https://overreacted.io/ko/a-complete-guide-to-useeffect/

## 1. 모든 렌더링은 고유의 Prop과 State가 있다.
```javascript
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

// count의 값이 변경될 때 (state에 값이 변화될때의 동작)
// 처음 랜더링 시
function Counter() {
  const count = 0; // useState() 로부터 리턴
  // ...
  <p>You clicked {count} times</p>
  // ...
}

// 클릭하면 함수가 다시 호출된다
function Counter() {
  const count = 1; // useState() 로부터 리턴
  // ...
  <p>You clicked {count} times</p>
  // ...
}

// 또 한번 클릭하면, 다시 함수가 호출된다
function Counter() {
  const count = 2; // useState() 로부터 리턴
  // ...
  <p>You clicked {count} times</p>
  // ...
}
```
* **state를 업데이트 할때마다 컴포넌트를 호춣하며, 랜더 결과물은 counter의 상태값을 살펴본다.**
* **state함수 안의 값은 상수로서 존재하는 값**이며 독립적인 값이다(특정 렌더링시의 상태로 존재).
* 따라서 {count}는 어떠한 데이터 바인딩도 수행하지 않는다.
* `<p>You clicked {count} times</p>` 는 **렌더링 결과물에 숫자 값을 내장하는 것에 불과**하다.
* 어느 특정 렌더링시 그 안의 `count` **상수는 시간이 지나도 바뀌는 것이 아니라 `count`값을 보는 것**이다.

## 2. 모든 렌더링은 고유의 이벤트 핸들러를 가진다.
```javascript
function sayHi(person) {
  const name = person.name;
  setTimeout(() => {
    alert('Hello, ' + name);
  }, 3000);
}

let someone = {name: 'Dan'};
sayHi(someone);

someone = {name: 'Yuzhi'};
sayHi(someone);
```
* `sayHi` 내부에서 특정 호출마다 person 과 name 이라는 지역 상수가 존재한다.
* setTimeout 이벤트가 실행될 때마다가 고유의 name을 기억한다.

```javascript
// 처음 랜더링 시
function Counter() {
  const count = 0; // useState() 로부터 리턴
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }
  // ...
}

// 클릭하면 함수가 다시 호출된다
function Counter() {
  const count = 1; // useState() 로부터 리턴
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }
  // ...
}

// 또 한번 클릭하면, 다시 함수가 호출된다
function Counter() {
  const count = 2; // useState() 로부터 리턴
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }
  // ...
}


// 처음 랜더링 시
function Counter() {
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + 0);
    }, 3000);
  }
  // ...
  <button onClick={handleAlertClick} /> // 0이 안에 들어있음
  // ...
}

// 클릭하면 함수가 다시 호출된다
function Counter() {
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + 1);
    }, 3000);
  }
  // ...
  <button onClick={handleAlertClick} /> // 1이 안에 들어있음
  // ...
}

// 또 한번 클릭하면, 다시 함수가 호출된다
function Counter() {
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + 2);
    }, 3000);
  }
  // ...
  <button onClick={handleAlertClick} /> // 2가 안에 들어있음
  // ...
}
```
* 각각의 렌더링은 **고유한 버전의 `handleAlertClick`을 리턴하며, 고유의 `count`를 기억한다.**
* 특정 렌더링시 내부에서 props와 state는 영원히 같은 상태로 유지된다.
* **이벤트 핸들러 내부의 비동기 함수라 할지라도 같은 count값을 보게된다.**


## 3. 모든 랜더링은 고유의 이펙트를 가진다
* effect가 최신의 state 상태를 읽을 수 있는 것은 변하지 않는 effect안에서 state변수가 임의로 변경되는 것이 아니라, effect 함수 자체가 매 랜더링마다 별도로 존재하기 때문이다.
```javascript
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
* 즉 각각의 effect는 매번 렌더링에 속한 count값을 보는 것이다.
```javascript
// 최초 랜더링 시
function Counter() {
  // ...
  useEffect(
    // 첫 번째 랜더링의 이펙트 함수
    () => {
      document.title = `You clicked ${0} times`;
    }
  );
  // ...
}

// 클릭하면 함수가 다시 호출된다
function Counter() {
  // ...
  useEffect(
    // 두 번째 랜더링의 이펙트 함수
    () => {
      document.title = `You clicked ${1} times`;
    }
  );
  // ...
}

// 또 한번 클릭하면, 다시 함수가 호출된다
function Counter() {
  // ...
  useEffect(
    // 세 번째 랜더링의 이펙트 함수
    () => {
      document.title = `You clicked ${2} times`;
    }
  );
  // ..
}
```
* 리액트는 effect 함수를 기억해 뒀다가 **DOM의 변화를 처리하고 브라우저가 그리고 난 뒤 실행**한다.
* **사실 effect는 매 랜더링마다 다른 함수라는 뜻**
* 개념적으로 effect는 랜더링 결과의 일부라고 생각할 수 있다.

### 코드 실행 과정
1. 리액트는 state가 0일때의 ui를 보여준다.
2. 컴포넌트가 랜더링 결과물인 `<p>You clicked 0 times</p>` 를 그린다.
3. 컴포넌트는 effect를 실행한다. `() => { document.title = 'You clicked 0 times' }`
4. 리액트는 ui를 업데이트 하기 위해 dom에 변경된 값을 그린다.
5. 버튼을 클릭하면, 컴포넌트는 리액트에게 상태값을 1로 변경해달라고 요청한다.
6. 리액트는 상태가 1일때의 ui를 그린다.
7. 그리고 effect의 값을 다시 실행한다

