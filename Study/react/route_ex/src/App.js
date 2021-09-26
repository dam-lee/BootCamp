import React from "react";
import { Link, Route } from "react-router-dom";
import Home from "./Home";
import Cat from "./Cat";
import Dog from "./Dog";
function App() {
  return (
    <>
      <div>
        <Link to="/">HOME</Link>
        <Link to="/cat">Cat</Link>
        <Link to="/dog">Dog</Link>
      </div>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/cat" component={Cat}>
        {/* <Cat />/ */}
      </Route>
      <Route path="/dog" component={Dog}>
        {/* <Dog /> */}
      </Route>
      <Route path="/dog">
        <Dog />
      </Route>
    </>
  );
}

export default App;
