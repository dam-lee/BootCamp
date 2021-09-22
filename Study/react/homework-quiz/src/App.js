import React from "react";
import Start from "./Start";

function App() {
  const [name, setName] = React.useState("이미다");
  return (
    <>
      <Start name={name} />
    </>
  );
}

export default App;
