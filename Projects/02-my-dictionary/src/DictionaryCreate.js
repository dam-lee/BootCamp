import React from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createDictionary } from "./redux/modules/dictionary";
import Spinner from "./Spinner";
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
    word: "",
    description: "",
    example: "",
  });

  const onChange = (e) => {
    setStaet({ ...state, [e.target.name]: e.target.value });
  };
  const onCreate = () => {
    if (state.word === "") {
      alert("단어를 입력해주세요");
      return;
    }
    if (state.description === "") {
      alert("설명을 입력해주세요");
      return;
    }
    if (state.example === "") {
      alert("예시를 입력해주세요");
      return;
    }
    dispatch(createDictionary(state));
    history.push("/");
    console.log("click");
    console.log("state", state);
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
        <CreateButton onClick={onCreate}>
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
