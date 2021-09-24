# 1. keyframes

- styled-components 안에 이미 포함되어있다.
- transition 은 사이즈를 두배로 키운다던가 할때 일정한 속도로 커지게 할 수 있다.
- animation 은 사이즈를 두배로 키울때 천천히 키우다가 어느 순간 슉 하고 엄청 빠르게 속도 조절을 해줄 수 있다.
- keyframes은 animation을 사용할때 필요한 속성 또는 규칙이라고 생각하면 된다.
- 리액트 첫화면 로고 돌아가는 부분

```css
.App-logo {
  animation: App-logo-spin infinite 20s linear;
}
```

- App-logo-spin : 키프레임 이름, 규칙대로 움직인다.
- infinite : 무한정 돌아간다
- 20s : 몇초동안 지속한다.
- linear: 스무스하게 돌아간다. 애니메이션이 중간에 딱 끊겨져 보이지 않게 계속 이어서 돌아가게 보이는 속성
- animation 은 따로 따로 지정 해줘도 된다.

```css
@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes App-logo-spin {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(240deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

- rotate : 빙글빙글 돌린다 몇도 돌아감. (0deg) 면 원래 그자리
- rotate(360deg); 끝나는 지점에 한바퀴 돌린다.

```javascript
import styled, { keyframes } from "styled-components";

function App() {
  return (
    <div className="App">
      <Box></Box>
    </div>
  );
}
// keyframes 만들기
const boxAnimation = keyframes`
 0%{
  border-radius: 0px;
 }

 50%{
  border-radius: 50px;
  top: 400px;
 }
 100%{
  border-radius: 0px;
  top: 20px;
 }
`;
const boxFade = keyframes`
  0% {
    opacity: 1;
    top: 20px;

  }
  50% {
    opacity: 0;
    top: 400px;
  }
  100% {
    opacity: 1;
    top: 20px;
  }
`;
const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: green;
  border-radius: 0px;
  // 어디까지 움직이게 할지
  position: absolute;
  top: 20px;
  left: 20px;
  animation: ${boxAnimation} 2s 1s infinite linear alternate;
`;

export default App;
```

```javascript
<TopButton
  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
>
  위로가기
</TopButton>
```

# Firebase란?

- 서버는 데이터도 관리하고, 분산처리도 하고, 웹 어플리케이션을 돌리는 등 많은 일을 한다.
- 서버가 하는 일이 많다는건 우리가 해줘야 하는 일도 엄청 많다는 뜻이다.
- 서버 구매 부터 (os어떤거, 램은 어떤거 등등) 할일이 많다.
- 그래서 서버리스 서비스를 사용한다.
- 서버리스 서비스란 , 서버를 이미 구축해놨다는 말이다. (위의 많은 기능들을 미리 구축해둠)
- 우리한테 필요한 서버를 필요한 만큼만 빌려쓰는 것이 서버리스다.
- 그 서버리스 서비스들 중에서 Firebase를 사용한다.
- BaaS(Backend as a Service)는 백엔드 하면 떠올리는 것들을 빌려오는 것이다.
- 파이어베이스를 예로 들면, 데이터 베이스, 소셜 서브시연동 등을 API 형태로 제공해준다.

## Firebase 설정하기

### 애널리틱스란?

- 사이트에서 발생하는 어떤 행동 데이터를 쌓을 수 있는 것을 애널리틱스라고 한다.

- 파이어베이스 사이트에서 새 프로젝트를 만든다.
- 파이어 스토어를 설정한다.

### 파이어 스토어란?

- 파이어베이스에 포함되어있는 서비스 중 하나로, NoSQL 클라우드 데이터베이스 서비스이다.
- 내가 쌓을 버킷리스트의 데이터 같은 것들을 클라우드의 저장소에 저장, 가져오기, 수정할 수 있게 해준다.
- 데이터 하나가 딕셔너리 형태로 생겼고 Collection과, Document 형태로 구성(Document는 JSON 형식의 데이터)

* Collection은 Document의 모임이다.

```javascript
// 데이터 가지고 올때 순서
// 1. Collection 2. Docs
// 1, db, 2, Collection 이름 현재 becket
const query = getDocs(collection(db, "bucket"));
// Promise로 내려온다.
// async await 으로 받는다.

React.useEffect(async () => {
  console.log("Db === ", db);
  const query = await getDocs(collection(db, "bucket"));
  // 도큐먼트 객체 내에 있는 내장함수인 forEach를 쓰는 것이다.
  // 이름이 같지만 다름.
  console.log(query);
  query.forEach((doc) => {
    console.log("doc = ", doc.id, doc.data());
  });
}, []);

React.useEffect(async () => {
  console.log(db);
  // 추가
  addDoc(collection(db, "bucket"), {
    text: "new",
    done: false,
  });
}, []);

React.useEffect(async () => {
  console.log(db);
  // 수정 마지막은 id
  const docRef = doc(db, "bucket", "mdxhk9d41PowdbxEEnCt");
  updateDoc(docRef, { done: true });
}, []);

React.useEffect(async () => {
  console.log(db);
  // 삭제
  const docRef = doc(db, "bucket", "tgzfZuaKFsTn8b2KJboL");
  deleteDoc(docRef);
}, []);

React.useEffect(async () => {
  console.log(db);
  // 새로운 컬렉션에 데이터를 넣을 수도 있다.
  addDoc(collection(db, "buckets"), { text: "new", done: false });
}, []);
```
