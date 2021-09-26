import React from "react";
import { FaPlus } from "react-icons/fa";
import { DictionaryListWrap, HelperText, CreateButton } from "./Style";
import DictionaryItem from "./DictionaryItem";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { is_loading } from "./redux/modules/dictionary";

const DictionaryList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.dictionary.list);
  const loading = useSelector((state) => state.dictionary.is_loading);
  console.log("loading = ", loading);
  const onButtonClick = () => {
    history.push("/create");
  };
  console.log(list.length);
  React.useEffect(() => {
    console.log("A");
    dispatch(is_loading(true));
  }, [list]);

  return (
    <>
      <DictionaryListWrap>
        {list.length === 0 && (
          <HelperText>
            등록된 사전이 없습니다. <br />
            내용을 등록해보세요!
          </HelperText>
        )}
        {list.map((item, index) => {
          return <DictionaryItem list={item} key={index} index={index} />;
        })}
      </DictionaryListWrap>
      <CreateButton onClick={onButtonClick}>
        <FaPlus
          style={{
            color: "#fff",
            fontSize: 30,
          }}
        />
      </CreateButton>
    </>
  );
};

export default DictionaryList;
