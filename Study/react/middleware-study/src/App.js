import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import TodoList from "./TodoList";
import TodoCreate from "./TodoCreate";
import TodoUpdate from "./TodoUpdate";
import NotFound from "./NotFound ";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <TodoList />
        </Route>
        <Route path="/create" exact>
          <TodoCreate />
        </Route>
        <Route path="/update/:index" exact>
          <TodoUpdate />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
