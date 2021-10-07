import React from "react";
import {} from "react-redux";
import { Text, Grid, Input, Label, Button } from "../elements";
import { emailCheck } from "../shard/regExp";

const Signup = (props) => {
  const [state, setState] = React.useState({
    user_id: "",
    user_pw: "",
    user_pwCheck: "",
    user_name: "",
  });

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onClick = () => {
    if (!emailCheck(state.user_id)) {
      alert("이메일 형식을 다시 입력해주세요");
    }
    if (
      state.user_id !== "" &&
      state.user_pw !== "" &&
      state.user_pwCheck !== "" &&
      state.user_pw === state.user_pwCheck &&
      state.user_name !== ""
    ) {
      alert("모두입력 완료");
    }
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
          name="user_id"
          value={state.user_id}
          onChange={onChange}
          placeholder="이메일 주소를 입력해주세요."
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
          placeholder="비밀번호를 입력해주세요"
        />
      </Grid>
      <Grid margin="5px 0px">
        <Label>비밀번호 확인</Label>
        <Input
          width="100%"
          margin="5px 0px 0px"
          padding="10px"
          name="user_pwCheck"
          type="password"
          value={state.user_pwCheck}
          onChange={onChange}
          placeholder="비밀번호를 한번 더 입력해주세요"
        />
      </Grid>
      <Grid margin="5px 0px">
        <Label>이름</Label>
        <Input
          width="100%"
          margin="5px 0px 0px"
          padding="10px"
          name="user_name"
          value={state.user_name}
          onChange={onChange}
          placeholder="이름을 입력해주세요"
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
      >
        회원가입
      </Button>
    </Grid>
  );
};

Signup.defaultProps = {};

export default Signup;
