import React from "react"; // 클래스형 컴포넌트로 할때 불러와야함.
import BucketList from "./BucketList";
import "./App.css";
// import {BucketList} from "./BucketList"
// function App() {
//   return (
//     <>
//       <h1>버킷 리스트</h1>
//       <BucketList />
//     </>
//   );
// }

// 클래스형 컴포넌트
class App extends React.Component {
  constructor(props) {
    super(props); // super는 부모 클래스의 데이터들 사용
    this.state = {
      list: ["항해99 끝내기", "취업하기", "여행가기", "잠자기"],
    };
  }
  render() {
    console.log(this.state.list);
    return (
      <div className="App">
        <h1>내 버킷리스트</h1>
        <BucketList list={this.state.list} />
      </div>
    );
  }
}

export default App;
