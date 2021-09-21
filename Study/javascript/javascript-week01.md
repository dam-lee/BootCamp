# Javascript 기초

```javascript
const todoList = document.getElementsByClassName("todo-list");
const todoBtn = document.getElementsByClassName("todo-btn");
console.log(aa);
// 함수 선언문 , 호이스팅 발생
function aa() {
  console.log("A");
}
// 함수 표현식 , 호이스팅 미발생
const sayHello = () => {
  console.log("hello");
};
console.log(sayHello);
const changeBtnBg = (btn) => {
  btn.style.backgroundColor = "red";
};
for (let i = 0; i < todoList.length; i++) {
  todoList[i].addEventListener("click", () => sayHello());
}
for (let i = 0; i < todoBtn.length; i++) {
  todoBtn[i].addEventListener("click", () => changeBtnBg(todoBtn[i]));
}

const newDiv = document.createElement("div");
const box = document.getElementsByClassName("container")[0];
newDiv.style.backgroundColor = "blue";
newDiv.style.width = "100px";
newDiv.style.height = "100px";
console.log("box = ", box);
box.appendChild(newDiv);

// 클래스는 비슷한 여러 객체를 만들때 편리함.
class Cat {
  // // constructor는 초기화
  constructor(name) {
    // 여기서 this는 이 클래스 자체.(Cat)
    this.name = name;
  }

  // 함수
  showName() {
    console.log(this.name);
  }
}

let cat = new Cat("perl"); // cat 이라는 변수에 Cat 클래스를 생성한다. (new 키워드로 만든 생성자 함수)
cat.showName();
console.log(cat);

// Cat과 비슷하지만 조금 다른 형태의 클래스가 필요할때
// 부모 클래스를 상속받는 새로운 클래스를 만들 수 있다.
class myCat extends Cat {
  // constructor는 초기화
  constructor(name, age) {
    super(name); // 부모 클래스인 Cat의 name을 받아올때 super를 씀.
    this.age = age;
  }
  // 자식 클래스에 있는걸 우선적으로 먼저 쓴다.
  showName() {
    console.log(this.name + "입니다");
  }
  showAge() {
    console.log(this.age);
  }
}
let my_cat = new myCat("perl", 4);

my_cat.showAge();
my_cat.showName(); // 자식 클래스인 myCat 의 showName을 불러옴

// 스프레드 연산자, 불변성때문에 많이 씀.
let a1 = [1, 2, 3];
let a2 = [3, 4, 5];
let a3 = [...a1, ...a2];

// Array의 내장 함수
const array_num = [0, 1, 2, 3, 4, 5];
// 1. map , 원본 배열을 건드리지 않고 새로운 배열을 반환. (갯수가 똑같다)
const new_array = array_num.map((item) => {
  return item + 1;
});
console.log(`map ${new_array}`);
console.log(`원본 배열 ${array_num}`);

// 2. filter , 원본 배열을 건드리지 않고 조건을 만족하는 배열을 반환
const filter_array = array_num.filter((item) => {
  return item > 2;
});
console.log(`filter ${filter_array}`);

// 3. concat , 원본 배열을 건드리지 않고 배열을 합쳐줄 때, 중복 요소 제거를 해주지 않는다.
const merge = array_num.concat(new_array);
console.log(`merge concat = ${merge}`);
console.log(`원본 배열 = ${array_num}`);

const array_num01 = [0, 1, 2, 3];
const array_num02 = [3, 4, 5];
// Set은 자바스크립트의 자료형 중 하나로,
// 중복되지 않는 값을 가지는 리스트입니다. :)!
// ... <- 이 점 3개는 스프레드 문법이라고 불러요.
// 배열 안에 있는 항목들(요소들)을 전부 꺼내준다는 뜻입니다.
// 즉 [...array_num01]은 array_num01에 있는 항목을 전부 꺼내
// 새로운 배열([] 이 껍데기가 새로운 배열을 뜻하죠!)에 넣어주겠단 말입니다!
const new_merge = [...new Set([...array_num01, ...array_num02])];

// 중복 항목(숫자 3)이 제거되었나요? 아니면 그대로 있나요? :)
console.log(`중복 제거 new_merge = ${new_merge}`);

// 4. from ,
// 4-1. 유사 배열은 map, filter 등 배열의 내장 함수를 쓸 수 없는데, 유사 배열을 배열로 만들어 줄 때 사용한다.
// 4-2. 배열의 어떤 요소가 들어갈지 확실하진 않지만 길이가 10자리인 배열을 만들고 싶을때도 사용.
const my_name = "mida";
const my_name_array = Array.from(my_name);
console.log(`from my_name_array = ${my_name_array}`);

// from 으로 했을 때 스펠링 하나 하나가 아닌 숫자로 넣고 싶을 때
// 콜백함수로 받아서 사용할 수 있다.
const num_array = Array.from(my_name, (item, index) => {
  return index;
});
console.log(num_array);

// 정해진 요소가 있진 않지만 길이가 6인 배열을 만들고 싶을 때
// {속성값을 넣어줄 수 있다. length 외에도 다른 다양한 속성을 넣을 수 있음. MDN참고}
const newArray = Array.from({ length: 6 }, (item, index) => {
  return index;
});
console.log(newArray);

// Quiz
const animals = [
  "강아지",
  "고양이",
  "햄스터",
  "강아지",
  "고양이",
  "고양이",
  "토끼",
];

let count = 0;
// const newMyCat = animals.filter((item) => {
//   if (item === "고양이") {
//     count += 1;
//   }
// });
// console.log(count);

const newMyCat = animals.map((item) => {
  item === "고양이" && (count += 1);
  // item === "고양이" && count += 1;
  // 추측으로는 = 는 대입 연산자이기 때문이 아닐까 싶습니다.
});
console.log(count);

const animalss = [
  "복슬 강아지",
  "검정 고양이",
  "노란 햄스터",
  "강아지",
  "노랑 고양이",
  "고양이",
  "흰 토끼",
];
// indexOf는 파라미터로 넘겨준 텍스트가 몇 번째 위치에 있는 지 알려준다.
// 파라미터로 넘겨준 텍스트가 없으면 -1을 반환함
// 즉 아래 구문은 고양이라는 단어를 포함하고 있니? 라고 묻는 구문이다.
const newani = animalss.filter((item) => {
  return item.indexOf("고양이") !== -1;
});
console.log("newani = ", newani);
const dogs = ["검은 강아지", "노란 강아지", "흰 강아지"];
const cats = ["검은 고양이", "복슬 고양이", "노란 고양이"];
const newAnimals = dogs.concat(cats);
console.log(newAnimals);
```
