import React from "react";
import { Grid, Text, FormGrid, Input, Button, Label } from "../elements";
import { useDispatch } from "react-redux";
// 액션 생성함수를 가져온다.
// actionCreators as userActions -> as 하고 뒤에 별명을 붙일 수 있다.
import { actionCreators as userActions } from "../redux/modules/user";
import { regCheck } from "../shared/regExpCheck";
const Login = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    user_id: "",
    user_password: "",
  });

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onClick = () => {
    if (state.user_id === "" || state.user_password === "") {
      alert("필수값을 입력해주세요");
      return;
    }
    if (state.user_id !== "") regCheck(state.user_id);
    dispatch(userActions.loginFB(state.user_id, state.user_password));
  };

  return (
    <Grid padding="16px">
      <Text size="32px" bold>
        로그인
      </Text>
      <FormGrid margin="0 0 10px">
        <Label>아이디</Label>
        <Input
          value={state.user_id}
          name="user_id"
          _onChange={onChange}
          placeholder="아이디를 입력해주세요"
        />
      </FormGrid>
      <FormGrid margin="0 0 30px">
        <Label>비밀번호</Label>
        <Input
          value={state.user_password}
          name="user_password"
          type="password"
          _onChange={onChange}
          placeholder="비밀번호를 입력해주세요"
        />
      </FormGrid>
      <Button
        color="#fff"
        bg="#000"
        padding="18px 0"
        fontSize="12px"
        fontWeight="300"
        width="100%"
        onClick={onClick}
      >
        로그인하기
      </Button>
    </Grid>
  );
};

Login.defaultProps = {};
export default Login;
