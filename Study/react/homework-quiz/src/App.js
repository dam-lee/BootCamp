import React from "react";
import Start from "./Start";
import Quiz from "./Quiz";
import Score from "./Score";
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <Route path="/" exact>
        <Start />
      </Route>
      <Route path="/quiz">
        <Quiz />
      </Route>
      <Score />
    </>
  );
}

export default App;
