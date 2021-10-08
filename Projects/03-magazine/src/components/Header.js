import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { Button, Grid } from "../elements";
import { history } from "../redux/configureStore";
import { apiKey } from "../shared/firebase";

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  // 세션 스토리지에서 key값을 복사해서 api key값으로 변경한다.
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  // 세션 스토리지가 있는지 없는지 확인한다.
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  // 로그인 체크를 해서 리덕스에 데이터를 넣어준다.

  const logout = () => {
    console.log("logout");
    dispatch(userActions.logoutFB({}));
  };

  React.useEffect(() => {}, [is_login]);

  return (
    <Grid
      is_flex
      justify="space-between"
      width="100%"
      padding="15px 20px"
      bg="#000"
    >
      <Button
        fontSize="26px"
        color="#fff"
        bg="#000"
        padding="0px"
        onClick={() => history.push(`/`)}
      >
        Magazine
      </Button>
      <Grid is_flex bg="#000">
        {!is_login && !is_session ? (
          <>
            <Button
              bg="#000"
              color="#adb5bd"
              margin="0px 5px 0px 0px"
              padding="15px"
              hoverColor="#fff"
              onClick={() => history.push(`/login`)}
            >
              로그인
            </Button>
            <Button
              bg="#000"
              color="#adb5bd"
              padding="15px 0px 15px 15px"
              hoverColor="#fff"
              onClick={() => history.push(`/signup`)}
            >
              회원가입
            </Button>
          </>
        ) : (
          <>
            <Button
              bg="#000"
              color="#adb5bd"
              margin="0px 5px 0px 0px"
              padding="15px 0px"
              hoverColor="#fff"
              onClick={() => history.push(`/myPage`)}
            >
              마이페이지
            </Button>
            <Button
              bg="#000"
              color="#adb5bd"
              padding="15px"
              hoverColor="#fff"
              onClick={() => history.push(`/noti`)}
            >
              알림
            </Button>
            <Button
              bg="#000"
              color="#adb5bd"
              padding="15px 0px"
              hoverColor="#fff"
              onClick={logout}
            >
              로그아웃
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
};

Header.defaultProps = {};

export default Header;
