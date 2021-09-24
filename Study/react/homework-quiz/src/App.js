import React from "react";
import { Route } from "react-router-dom";
import Start from "./Start";
import Quiz from "./Quiz";
import Score from "./Score";
import Ranking from "./Ranking";

function App() {
  return (
    <>
      <Route path="/" exact>
        <Start />
      </Route>
      <Route path="/quiz" exact>
        <Quiz />
      </Route>
      <Route path="/score" exact>
        <Score />
      </Route>
      <Route path="/ranking" exact>
        <Ranking />
      </Route>
    </>
  );
}

export default App;
