import React from "react";
import { Text, Grid, Input, Label, Button } from "../elements";

const Signup = (props) => {
  const [state, setState] = React.useState({
    id: "",
    pw: "",
    pwCheck: "",
    nickname: "",
  });
  const onChange = (e) => {
    console.log(e.target.name);
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <Grid padding="15px 20px 25px">
      <Text fontSize="26px" bold>
        회원가입
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
      <Grid margin="5px 0px">
        <Label>비밀번호 확인</Label>
        <Input
          width="100%"
          margin="5px 0px 0px"
          padding="10px"
          name="pwCheck"
          type="password"
          value={state.pwCheck}
          onChange={onChange}
          placeholder="비밀번호를 한번 더 입력해주세요"
        />
      </Grid>
      <Grid margin="5px 0px">
        <Label>닉네임</Label>
        <Input
          width="100%"
          margin="5px 0px 0px"
          padding="10px"
          name="nickname"
          value={state.nickname}
          onChange={onChange}
          placeholder="닉네임을 입력해주세요"
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
        회원가입
      </Button>
    </Grid>
  );
};

Signup.defaultProps = {};

export default Signup;
