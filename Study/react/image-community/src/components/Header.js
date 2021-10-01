import React from "react";
import { Grid, Button, Text } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/user";
import { history } from "../redux/configureStore";
// import { apiKey } from "../shared/firebase";
import Permit from "../shared/Permit";
const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  const onDeleteCookie = () => {
    dispatch(userAction.logoutFB({}));
  };

  return (
    <>
      {is_login ? (
        <Permit>
          <Grid is_flex padding="0px 16px;" margin="10px 0;">
            <Text size="26px" bold>
              mida
            </Text>
            <Grid is_flex justify="end">
              <Button padding="13px 17px" fontSize="12px">
                내정보
              </Button>
              <Button padding="13px 17px" fontSize="12px" margin="0 0 0 10px">
                알림
              </Button>
              <Button
                onClick={onDeleteCookie}
                padding="13px 17px"
                fontSize="12px"
                margin="0 0 0 10px"
              >
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Permit>
      ) : (
        <Grid is_flex padding="0px 16px;" margin="10px 0;">
          <Text size="26px" bold>
            mida
          </Text>
          <Grid is_flex justify="end">
            <Button
              padding="13px 17px"
              fontSize="12px"
              margin="0 10px 0 0"
              onClick={() => history.push("/login")}
            >
              로그인
            </Button>
            <Button
              padding="13px 17px"
              fontSize="12px"
              onClick={() => history.push("/signup")}
            >
              회원가입
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );

  // return (
  //   <Grid is_flex padding="0px 16px;" margin="10px 0;">
  //     <Text size="26px" bold>
  //       mida
  //     </Text>
  //     <Grid is_flex justify="end">
  //       <Button
  //         padding="13px 17px"
  //         fontSize="12px"
  //         margin="0 10px 0 0"
  //         onClick={() => history.push("/login")}
  //       >
  //         로그인
  //       </Button>
  //       <Button
  //         padding="13px 17px"
  //         fontSize="12px"
  //         onClick={() => history.push("/signup")}
  //       >
  //         회원가입
  //       </Button>
  //     </Grid>
  //   </Grid>
  // );
};

export default Header;
// session key 확인
// const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
// const is_session = sessionStorage.getItem(_session_key) ? true : false;
// 세션에 잘 들어갔는지 확인.
// console.log(sessionStorage.getItem(_session_key));

// session key 확인 여부를 Permit 컴포넌트로 만들어줌

// if (is_login && is_session) {
//   return (
//     <Grid is_flex padding="0px 16px;" margin="10px 0;">
//       <Text size="26px" bold>
//         mida
//       </Text>
//       <Grid is_flex justify="end">
//         <Button padding="13px 17px" fontSize="12px">
//           내정보
//         </Button>
//         <Button padding="13px 17px" fontSize="12px" margin="0 0 0 10px">
//           알림
//         </Button>
//         <Button
//           onClick={onDeleteCookie}
//           padding="13px 17px"
//           fontSize="12px"
//           margin="0 0 0 10px"
//         >
//           로그아웃
//         </Button>
//       </Grid>
//     </Grid>
//   );
// }
