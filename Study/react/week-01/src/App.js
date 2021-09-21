import "./App.css";

const wrap = {
  width: "400px",
  margin: "20px auto 0",
  padding: "30px",
  border: "1px solid #ddd",
};

const title = {
  color: "blue",
  textAlign: "center",
};

function App() {
  return (
    <div style={wrap}>
      <h1 style={title}>안녕하세요</h1>
      <hr />
      <p>이름을 입력해주세요</p>
      <input type="text" placeholder="이름을 입력해주세요" />
    </div>
  );
}

export default App;
