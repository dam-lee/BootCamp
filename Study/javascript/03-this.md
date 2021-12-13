# this

- 자바스크립트의 모든 변수는 특정 객체(렉시컬환경)의 프로퍼티로 인식한다.

* 실행컨텍스트는 변수를 수집해서 렉시컬 환경의 프로퍼티로 저장하고, 전역 변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로 할당한다.

# this의 결정

- this는 **함수를 호출할 때 결정**된다.
- 함수 실행컨텍스트가 생성되면서 this가 바인딩된다.
- this는 **함수로서 호출되면 this가 지정되지 않고 전역객체가 바인딩**된다.
- this는 **메서드로 호출되면 메서드로 호출한 객체를 바인딩**한다. (.앞의 객체를 가리킴)
- 화살표 함수 내부에서 this는 상위 스코프의 this를 가리킨다.
- 생성자 함수에서 this는 호출할 인스턴스를 가리킨다.
- 메서드 내부 함수에서 this를 우회하려면 **this를 변수에 할당**하면 된다.

* 콜백 함수에서의 this는 무조건 이거다! 라고 정의할 수 없다. **콜백 함수에서의 this는 특별히 정의하지 않는 경우에는 기본적으로 함수와 마찬가지로 전역객체를 바라본다.**

```javascript
var obj = {
  logThis: function () {
    console.log(this);
    console.log(this === window);
  },
  logThisLater1: function () {
    setTimeout(this.logThis, 500); // callback함수에서의 this
  },
  logThisLater2: function () {
    setTimeout(this.logThis.bind(this), 1000);
    // setTimeout에서의 this는 window를 가르킨다.
    // 그 이유는 callback함수에서의 this는 따로 바인딩하지 않으면 전역객체를 가르키기 때문이다.
  },
};
obj.logThisLater1(); //window , true
obj.logThisLater2(); // {logThis:f ...}, false
```

## 명시적으로 this를 바인딩하는 방법

### 1. call 메서드

- 함수를 즉시 실행하도록 하는 명령어이며, call 메서드의 첫번째 인자를 this로 바인딩하고 그 이후의 인자들을 매개변수로 한다.
- call 메서드를 사용한 this는 임의의 객체가 된다.

### 2. apply 메서드

- call 메서드와 동일하지만 apply메서드는 두번째 인자를 배열로 받아 그 배열의 요소들을 호출할 함수의 매개변수로 지정한다는 차이점이 있다.

```javascript
var numbers = [10, 20, 3, 16, 45];
var max = Math.max.apply(null, numbers);
var min = Math.min.apply(null, numbers);

// es6 스프레드 연산자 활용
const max = Math.max(...numbers);
const min = Math.min(...numbers);
```

### 3. bind 메서드

- call과 비슷하지만 즉시 호출하지 않고, **넘겨 받은 this 및 인수들을 바탕으로 새로운 함수를 반환**하기만 하는 메서드.
- bind 메서드는 함수에 this를 미리 적용하는 것과 부분 적용 함수를 구현하는 두가지 목적을 모두 지닌다.

# 정리

## 1. 명시적 this 바인딩이 없는 경우

1. 전역공간에서 this는 전역객체(브라우저는 window, node.js는 global)를 참조한다.
2. 함수의 메서드로 호출할 경우 this는 메서드 주체(메서드명 앞의 객체)를 참조.
3. 함수로서 호출할 경우 this는 전역객체 참조. 내부함수에서도 마찬가지
4. 콜백 함수 내부에서의 this는 해당 콜백 함수의 제어권을 넘겨받은 함수에 따르고, **정의하지 않은 경우 전역객체를 참조**
5. 생성자 함수에서의 this는 생성될 인스턴스를 참조

## 2. 명시적 this 바인딩일 경우

1. call, apply 메서드는 this를 명시적으로 지정하고, 함수 또는 메서드를 호출
2. bind 메서드는 this 및 함수에 넘길 인수를 일부 지정해서 새로운 함술ㄹ 만듬.
3. 요소를 순회하면서 콜백함수를 반복 호추할 경우의 일부 메서드는 별도의 인자로 this를 받기도 한다.

```javascript
// 콜백 함수와 함께 thisArg를 인자로 받는 메서드
Array.prototype.forEach(callback[,thisArg])
Array.prototype.map(callback[,thisArg])
Array.prototype.filter(callback[,thisArg])
Array.prototype.some(callback[,thisArg])
Array.prototype.every(callback[,thisArg])
Array.prototype.find(callback[,thisArg])
Array.prototype.findIndex(callback[,thisArg])
Array.prototype.flatMap(callback[,thisArg])
Array.prototype.from(callback[,thisArg])
Set.prototype.forEach(callback[,thisArg])
Map.prototype.forEach(callback[,thisArg])
```
