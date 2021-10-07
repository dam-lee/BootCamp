import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid } from "../elements";

const Header = (props) => {
  const history = useHistory();
  const is_login = false;

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
        {!is_login ? (
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
              padding="15px"
              hoverColor="#fff"
              onClick={() => history.push(`/myPage`)}
            >
              마이페이지
            </Button>
            <Button
              bg="#000"
              color="#adb5bd"
              padding="15px 0px 15px 15px"
              hoverColor="#fff"
              onClick={() => history.push(`/noti`)}
            >
              알림
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
};

Header.defaultProps = {};

export default Header;
