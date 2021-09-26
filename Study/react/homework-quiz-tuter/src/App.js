import "./App.css";
import React from "react";

import Start from "./Start";
import Quiz from "./Quiz.js";
import Score from "./Score";
import { Route } from "react-router-dom";
import Ranking from "./Ranking";
import Message from "./Message";

// 순서
// 1. 뷰 만들기 뷰 만들면서 라우팅 시키는 것 까지 연결
// 2. 기능 연결
// 2-1 기능 1 : 퀴즈에서 o나 x 누르면 다음 퀴즈로 보이는것 ,
// 2-2 기능 2 : 점수 계산을 하는 것(유저가 o를 눌렀는지 x를 눌렀는지 어딘가에 저장)
// 3. 어떤 데이터가 전역에 있어야 내가 편하게 데이터를 보여줄 수 있는가를 고민 (리덕스),
// 4. 일단은 state를 먼저 사용하고 그다음에 리덕스로 만든다.
class App extends React.Component {
  constructor(props) {
    super(props);
    // state에 필요한 데이터를 넣어줘요!
    this.state = {
      name: "스파르타 코딩 클럽",
      page: "quiz",
      scoreMsg: "이 정도면 아주 친한 친구 사이! 앞으로도 더 친하게 지내요! :)",
      list: [
        { question: "르탄이는 2살이다.", answer: "O" },
        { question: "르탄이는 2살이다.", answer: "O" },
        { question: "르탄이는 2살이다.", answer: "O" },
        { question: "르탄이는 2살이다.", answer: "O" },
        { question: "르탄이는 2살이다.", answer: "O" },
        { question: "르탄이는 2살이다.", answer: "O" },
        { question: "르탄이는 2살이다.", answer: "O" },
        { question: "르탄이는 2살이다.", answer: "O" },
        { question: "르탄이는 2살이다.", answer: "O" },
        { question: "르탄이는 2살이다.", answer: "O" },
        { question: "르탄이는 2살이다.", answer: "O" },
      ],
      ranking: [
        { rank: 1, name: "임민영", message: "안녕 르탄아!" },
        { rank: 1, name: "임민영", message: "안녕 르탄아!" },
        { rank: 1, name: "임민영", message: "안녕 르탄아!" },
        { rank: 1, name: "임민영", message: "안녕 르탄아!" },
        { rank: 1, name: "임민영", message: "안녕 르탄아!" },
        { rank: 1, name: "임민영", message: "안녕 르탄아!" },
        { rank: 1, name: "임민영", message: "안녕 르탄아!" },
      ],
    };
  }

  render() {
    return (
      <>
        {/* 조건부 랜더링을 합니다 / state의 page를 바꿔가면서 확인해봐요! */}
        {/* <div className="App">
          {this.state.page === "quiz" && <Quiz list={this.state.list} />}
          {this.state.page === "start" && <Start name={this.state.name} />}
          {this.state.page === "score" && (
            <Score name={this.state.name} scoreMsg={this.state.scoreMsg} />
          )}
        </div> */}
        <Route path="/" exact>
          <Start name={this.state.name} />
        </Route>
        <Route path="/quiz" exact>
          <Quiz list={this.state.list} />
        </Route>
        <Route path="/score" exact>
          <Score name={this.state.name} scoreMsg={this.state.scoreMsg} />
        </Route>
        <Route path="/ranking" exact>
          <Ranking name={this.state.name} />
        </Route>
        <Route path="/message" exact>
          <Message name={this.state.name} />
        </Route>
      </>
      /* 

      */
    );
  }
}

export default App;
