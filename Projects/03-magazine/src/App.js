import React from "react";
import { Route } from "react-router-dom";
import Header from "./components/Header";
import MagazineList from "./pages/MagazineList";
import MagazineWrite from "./pages/MagazineWrite";
import MagazineDetail from "./pages/MagazineDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GlobalStyle from "./shared/GlobalStyle";
import { Container } from "./elements";

// 만든 history를 연결해준다.
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";

// 로그인 체크 유무 (새로고침시 App.js부터 시작된다. 라우터가 여기에 있기 때문)
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "./redux/modules/user";
import { apiKey } from "./shared/firebase";

function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  // 세션 스토리지가 있는지 없는지 확인한다.
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  React.useEffect(() => {
    // 로그인이 되어있는지 체크한다.
    // session의 여부로 판단. header에서 해도 상관없다고함
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);
  return (
    <>
      <ConnectedRouter history={history}>
        <GlobalStyle />
        <Container>
          <Header />
          <Route path="/" exact component={MagazineList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/create" exact component={MagazineWrite} />
          <Route path="/update/:id" exact component={MagazineWrite} />
          <Route path="/detail/:id" exact component={MagazineDetail} />
        </Container>
      </ConnectedRouter>
    </>
  );
}

export default App;
