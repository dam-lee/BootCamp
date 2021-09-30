import React from "react";
import { Text, FormGrid, Input, Button, Label, Grid } from "../elements";

const Signup = (props) => {
  const [state, setState] = React.useState({
    id: "",
    nikname: "",
    password: "",
    password_check: "",
  });
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onClick = () => {
    if (state.password !== state.password_check) {
      alert("비밀번호가 서로 다릅니다. 다시 확인해주세요");
      return;
    }
    alert("회원가입 성공!");
  };

  return (
    <Grid padding="16px">
      <Text size="32px" bold>
        회원가입
      </Text>
      <FormGrid margin="0 0 10px">
        <Label>아이디</Label>
        <Input
          value={state.id}
          name="id"
          _onChange={onChange}
          placeholder="아이디를 입력해주세요"
        />
      </FormGrid>
      <FormGrid margin="0 0 10px">
        <Label>닉네임</Label>
        <Input
          value={state.nikname}
          name="nikname"
          placeholder="닉네임을 입력해주세요"
          _onChange={onChange}
        />
      </FormGrid>
      <FormGrid margin="0 0 10px">
        <Label>비밀번호</Label>
        <Input
          value={state.password}
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          _onChange={onChange}
        />
      </FormGrid>
      <FormGrid margin="0 0 30px">
        <Label>비밀번호 확인</Label>
        <Input
          value={state.password_check}
          name="password_check"
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요"
          _onChange={onChange}
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
        회원가입하기
      </Button>
    </Grid>
  );
};

Signup.defaultProps = {
  id: "studymida",
  nikname: "dam2",
  password: "",
  password_check: "",
};

export default Signup;
