import React from "react";
// import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// hydrate 는 리액트 컴포넌트로 써먹을 수 없는 것들에게 이벤트를 주입하는 역할
import { hydrate, render } from "react-dom";

// 우리의 컴포넌트가 들어갈 컨테이너에 hasChildNodes() 로 자식 노드가 있는지 확인한다.
// 자식 노드가 있다는건 미리 내용물이 들어가 있다는 것이다.
// 자식노드가 있다는건 hydrate를 하겠다는 뜻.
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
