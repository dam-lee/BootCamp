import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import MagazineList from "./pages/MagazineList";
import MagazineWrite from "./pages/MagazineWrite";
import MagazineDetail from "./pages/MagazineDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GlobalStyle from "./shard/GlobalStyle";
import { Container } from "./elements";
function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Container>
            <Header />
            <Route path="/" exact component={MagazineList} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/create" exact component={MagazineWrite} />
            <Route path="/update/:id" exact component={MagazineWrite} />
            <Route path="/detail/:id" exact component={MagazineDetail} />
          </Container>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
