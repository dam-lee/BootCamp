import React from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createDictionaryFB } from "./redux/modules/dictionary";

import {
  DictionaryListWrap,
  SubTitle,
  ItemTitle,
  Input,
  TextArea,
  CreateWrap,
  CreateButton,
} from "./Style";
const DictionaryCreate = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [state, setStaet] = React.useState({
    date: "",
    word: "",
    description: "",
    example: "",
  });

  const onChange = (e) => {
    setStaet({ ...state, [e.target.name]: e.target.value });
  };

  const onCreate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    const todayDate = `${year}${month}${date}${hours}${minutes}${seconds}`;

    if (state.word === "") return alert("단어를 입력해주세요");
    if (state.description === "") return alert("설명을 입력해주세요");
    if (state.example === "") return alert("예시를 입력해주세요");

    dispatch(
      createDictionaryFB({
        date: todayDate,
        word: state.word,
        description: state.description,
        example: state.example,
      })
    );
    history.push("/");
  };
  return (
    <>
      <DictionaryListWrap>
        <SubTitle>단어 추가하기</SubTitle>
        <CreateWrap>
          <ItemTitle>단어</ItemTitle>
          <Input
            name="word"
            value={state.word}
            onChange={onChange}
            type="text"
            placeholder="단어를 입력해주세요"
          />
        </CreateWrap>
        <CreateWrap>
          <ItemTitle>설명</ItemTitle>
          <TextArea
            name="description"
            onChange={onChange}
            type="text"
            placeholder="설명을 입력해주세요"
            rows="5"
            value={state.description}
          >
            {state.description}
          </TextArea>
        </CreateWrap>
        <CreateWrap>
          <ItemTitle>예시</ItemTitle>
          <TextArea
            name="example"
            onChange={onChange}
            type="text"
            placeholder="예시를 입력해주세요"
            rows="5"
            value={state.example}
          >
            {state.example}
          </TextArea>
        </CreateWrap>
        <CreateButton add={"#fa5252"} onClick={onCreate}>
          <FaPlus
            style={{
              color: "#fff",
              fontSize: 30,
            }}
          />
        </CreateButton>
      </DictionaryListWrap>
    </>
  );
};

export default DictionaryCreate;
