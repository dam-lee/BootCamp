import React from "react";
import { DictionaryListWrap, HelperText, CreateButton } from "./Style";
import { FaPlus } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadDictionaryFB } from "./redux/modules/dictionary";
import DictionaryItem from "./DictionaryItem";
import Spinner from "./Spinner";
const DictionaryList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.dictionary.is_loading);
  const _list = useSelector((state) => state.dictionary.list);

  const list = _list.sort((a, b) => b.date - a.date);

  const onButtonClick = () => {
    history.push("/create");
  };

  React.useEffect(() => {
    dispatch(loadDictionaryFB());
  }, []);

  return (
    <>
      {!loading && <Spinner />}
      <DictionaryListWrap>
        {list.length === 0 && loading && (
          <HelperText>
            등록된 사전이 없습니다. <br />
            내용을 등록해보세요!
          </HelperText>
        )}
        {list.map((item, index) => {
          return (
            <DictionaryItem
              list={item}
              key={item.id}
              index={index}
              id={item.id}
            />
          );
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
