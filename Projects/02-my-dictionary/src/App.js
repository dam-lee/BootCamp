import React from "react";
import "./Default.css";
import { Container, Mida, DictionaryTitle, DictionaryWrap } from "./Style";
import { Route } from "react-router-dom";
import DictionaryCreate from "./DictionaryCreate";
import DictionaryList from "./DictionaryList";
import DictionaryUpdate from "./DictionaryUpdate";

import { useSelector } from "react-redux";
function App() {
  const list = useSelector((state) => state.dictionary.list);

  return (
    <Container>
      <DictionaryWrap>
        <DictionaryTitle>
          나만의 사전<Mida>_mida</Mida>
        </DictionaryTitle>
        <Route path="/" exact>
          <DictionaryList />
        </Route>
        <Route path="/create" exact>
          <DictionaryCreate />
        </Route>
        <Route path="/update/:index" exact>
          <DictionaryUpdate all_list={list} />
        </Route>
      </DictionaryWrap>
    </Container>
  );
}

export default App;
