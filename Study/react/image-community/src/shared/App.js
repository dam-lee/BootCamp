import React from "react";
import "./App.css";
import styled from "styled-components";
import { Route } from "react-router-dom";
// 히스토리 추가
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import { Grid } from "../elements";
import { apiKey } from "../shared/firebase";
import { actionCreators as useActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

import PostList from "../pages/PostList";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Header from "../components/Header";
import Permit from "../shared/Permit";
import PostCreate from "../pages/PostCreate";
import CommentList from "../pages/CommentList";
import PostDetail from "../pages/PostDetail";
import Notification from "../pages/Notification";
import Search from "./Search";

function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  React.useEffect(() => {
    if (is_session) {
      dispatch(useActions.loginCheckFB());
    }
  }); // [a,b,c] 값들이 업데이트 될때마다 useEffect안에 함수 재실행

  return (
    <>
      <Grid>
        <Header />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/create" exact component={PostCreate} />
          <Route path="/update/:post_id" exact component={PostCreate} />
          <Route path="/comment" exact component={CommentList} />
          <Route path="/detail/:post_id" exact component={PostDetail} />
          <Route path="/search" exact component={Search} />
          <Route path="/noti" exact component={Notification} />
        </ConnectedRouter>
      </Grid>

      <Permit>
        <CreateButton onClick={() => history.push("/create")}>
          등록
        </CreateButton>
      </Permit>
    </>
  );
}

const CreateButton = styled.button`
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #c2255c;
  box-sizing: border-box;
  border: none;
  color: #fff;
  cursor: pointer;
`;

export default App;
