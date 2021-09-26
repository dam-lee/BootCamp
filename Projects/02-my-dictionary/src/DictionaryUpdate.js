import React from "react";
import { FaPen } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  DictionaryListWrap,
  SubTitle,
  ItemTitle,
  Input,
  TextArea,
  CreateWrap,
  CreateButton,
} from "./Style";
import { updateDictionary } from "./redux/modules/dictionary";
const DictionaryUpdate = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const dictionary_list = useSelector((state) => state.dictionary.list);
  const find_index = parseInt(
    history.location.pathname.split("/").reverse()[0]
  );

  const [state, setStaet] = React.useState({
    word: "",
    description: "",
    example: "",
  });

  const onUpdateDictionary = () => {
    dispatch(updateDictionary(state, find_index));
    history.push("/");
  };
  const onLoad = () => {
    setStaet({
      word: dictionary_list[find_index].word,
      description: dictionary_list[find_index].description,
      example: dictionary_list[find_index].example,
    });
  };

  const onChange = (e) => {
    setStaet({ ...state, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    onLoad();
  }, [dictionary_list]);
  return (
    <>
      <DictionaryListWrap>
        <SubTitle>단어 수정하기</SubTitle>
        <CreateWrap>
          <ItemTitle>단어</ItemTitle>
          <Input
            name="word"
            type="text"
            value={state.word}
            onChange={onChange}
          />
        </CreateWrap>
        <CreateWrap>
          <ItemTitle>설명</ItemTitle>
          <TextArea
            name="description"
            type="text"
            rows="5"
            value={state.description}
            onChange={onChange}
          >
            {state.description}
          </TextArea>
        </CreateWrap>
        <CreateWrap>
          <ItemTitle>예시</ItemTitle>
          <TextArea
            name="example"
            type="text"
            rows="5"
            value={state.example}
            onChange={onChange}
          >
            {state.example}
          </TextArea>
        </CreateWrap>
        <CreateButton onClick={onUpdateDictionary}>
          <FaPen
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

export default DictionaryUpdate;
