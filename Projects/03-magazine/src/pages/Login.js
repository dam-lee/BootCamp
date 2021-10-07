import React from "react";
import { Text, Grid, Input, Label, Button } from "../elements";
const Login = (props) => {
  const [state, setState] = React.useState({
    id: "",
    pw: "",
  });
  const onChange = (e) => {
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
            name="id"
            value={state.id}
            onChange={onChange}
            placeholder="아이디를 입력해주세요"
          />
        </Grid>
        <Grid margin="5px 0px">
          <Label>비밀번호</Label>
          <Input
            width="100%"
            margin="5px 0px 0px"
            padding="10px"
            name="pw"
            type="password"
            value={state.pw}
            onChange={onChange}
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
        >
          로그인
        </Button>
      </Grid>
    </>
  );
};

Login.defaultProps = {};

export default Login;
