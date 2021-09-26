import "./App.css";
import React from "react";
import Text from "./Text";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.circle = React.createRef(null);
  }

  hoverEvent = (e) => {
    console.log("event", e.target);
    console.log("this.circle.current =", this.circle.current);
    this.circle.current.style.background = "yellow";
  };

  componentDidMount() {
    console.log("컴포넌트가 생성된 후");
    this.circle.current.addEventListener("mouseover", this.hoverEvent);
  }

  componentWillUnmount() {
    console.log("컴포넌트 사라질때");
    this.circle.current.removeEventListener("mouseover", this.hoverEvent);
  }

  render() {
    return (
      <div style={{ width: "100vw", height: "100vh", textAlign: "center" }}>
        <Text />
        <div
          style={{
            margin: "auto",
            width: "250px",
            height: "250px",
            background: "green",
            borderRadius: "250px",
          }}
          ref={this.circle}
        ></div>
      </div>
    );
  }
}

export default App;
