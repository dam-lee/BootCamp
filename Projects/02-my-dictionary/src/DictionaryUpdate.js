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
import { updateDictionaryFB } from "./redux/modules/dictionary";
const DictionaryUpdate = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const dictionary_list = useSelector((state) => state.dictionary.list);
  const find_index = parseInt(
    history.location.pathname.split("/").reverse()[0]
  );

  const [state, setState] = React.useState({
    id: "",
    index: 0,
    word: "",
    description: "",
    example: "",
  });

  const onUpdateDictionary = async () => {
    await dispatch(updateDictionaryFB(state, state.id));
    history.push("/");
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onLoad = () => {
    console.log("update");
    setState({
      id: dictionary_list[find_index].id,
      index: dictionary_list[find_index].index,
      word: dictionary_list[find_index].word,
      description: dictionary_list[find_index].description,
      example: dictionary_list[find_index].example,
    });
  };

  React.useEffect(() => {
    // 업데이트 페이지에서 새로고침 하면 오류뜨는 부분 방지
    if (dictionary_list.length === 0) {
      history.push("/");
    } else {
      onLoad();
    }
  }, []);

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
