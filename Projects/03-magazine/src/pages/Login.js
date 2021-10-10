import React from "react";
import { Text, Grid, Input, Label, Button } from "../elements";
import { emailCheck } from "../shared/regExp";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
const Login = (props) => {
  const dispatch = useDispatch();
  const [active, setActive] = React.useState(true);
  const [state, setState] = React.useState({
    user_id: "",
    user_pw: "",
  });

  const onClick = () => {
    if (!emailCheck(state.user_id) || state.user_id === "") {
      alert("아이디는 이메일 형식으로 입력해주세요");
      return;
    }
    if (state.user_pw === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }
    dispatch(userActions.loginFB(state.user_id, state.user_pw));
  };

  const onChange = (e) => {
    if (state.user_id !== "" && state.user_pw !== "") {
      setActive(false);
    }
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Grid padding="15px 20px 25px">
        <Text fontSize="26px" bold>
          로그인
        </Text>
        <Grid margin="20px 0px 5px">
          <Label>아이디</Label>
          <Input
            width="100%"
            margin="5px 0px 0px"
            padding="10px"
            name="user_id"
            value={state.user_id}
            onChange={onChange}
            onSubmit={onClick}
            placeholder="아이디를 입력해주세요"
          />
        </Grid>
        <Grid margin="5px 0px">
          <Label>비밀번호</Label>
          <Input
            width="100%"
            margin="5px 0px 0px"
            padding="10px"
            name="user_pw"
            type="password"
            value={state.user_pw}
            onChange={onChange}
            onSubmit={onClick}
            placeholder="비밀번호를 입력해주세요"
          />
        </Grid>
        <Button
          width="100%"
          margin="20px 0 0"
          padding="15px 20px"
          border="1px solid black"
          bg="#000"
          color="#fff"
          onClick={onClick}
          disabled={active}
        >
          로그인
        </Button>
      </Grid>
    </>
  );
};

Login.defaultProps = {};

export default Login;
