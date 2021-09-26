import React from "react";
import "./Default.css";
import { Container, Mida, DictionaryTitle, DictionaryWrap } from "./Style";
import { Route } from "react-router-dom";
import DictionaryCreate from "./DictionaryCreate";
import DictionaryList from "./DictionaryList";
import DictionaryUpdate from "./DictionaryUpdate";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
function App() {
  const is_loading = useSelector((state) => state.dictionary.is_loading);

  return (
    <Container>
      {!is_loading && <Spinner />}

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
          <DictionaryUpdate />
        </Route>
      </DictionaryWrap>
    </Container>
  );
}

export default App;
