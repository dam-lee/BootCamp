import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createUserName } from "./redux/modules/user";
import { useHistory } from "react-router";
import { Container, Wrap, Title, Name, Input, StartButton } from "./Style";

const Start = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const name_ref = React.useRef(null);
  const test = useSelector((state) => state.user.ranking);

  const onStart = () => {
    dispatch(createUserName(name_ref.current.value));
    return history.push("/quiz");
  };

  useEffect(() => {
    if (test.length > 0) {
      dispatch();
    }
    console.log("길이확인", test.length);
  }, []);

  return (
    <Container>
      <Wrap>
        <Title>
          나는 <Name>루이</Name>에 대해서 <br />
          얼마나 알고 있을까?
        </Title>

        <Input ref={name_ref} type="text" placeholder="내 이름" />
        <StartButton onClick={() => onStart()}>시작하기</StartButton>
      </Wrap>
    </Container>
  );
};

export default Start;
