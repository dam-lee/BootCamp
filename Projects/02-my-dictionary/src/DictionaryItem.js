import React from "react";
import { FaPlus, FaPen } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  DictionaryItemContainer,
  DictionaryItemWrap,
  EditButton,
  DeleteButton,
  FlexBetween,
  ItemTitle,
  ItemText,
} from "./Style";
import { deleteDictionaryFB } from "./redux/modules/dictionary";

const DictionaryItem = ({ list, index, id }) => {
  const history = useHistory();
  const idx = index;
  const dispatch = useDispatch();

  const onUpdate = () => {
    history.push(`/update/${idx}`);
  };

  const onDelete = () => {
    dispatch(deleteDictionaryFB(id));
    history.push(`/`);
  };
  return (
    <>
      <DictionaryItemContainer key={list.index}>
        <DictionaryItemWrap>
          <EditButton onClick={onUpdate}>
            <FaPen style={{ verticalAlign: "text-top" }} />
          </EditButton>
          <DeleteButton onClick={onDelete}>
            <FaPlus
              style={{
                color: "#fff",
                fontSize: 14,
                verticalAlign: "text-top",
                transform: `rotate(45deg)`,
              }}
            />
          </DeleteButton>
          <FlexBetween>
            <ItemTitle>단어</ItemTitle>
            <ItemText>{list.word}</ItemText>
          </FlexBetween>
          <FlexBetween>
            <ItemTitle>설명</ItemTitle>
            <ItemText>{list.description}</ItemText>
          </FlexBetween>
          <FlexBetween>
            <ItemTitle>예시</ItemTitle>
            <ItemText>{list.example}</ItemText>
          </FlexBetween>
        </DictionaryItemWrap>
      </DictionaryItemContainer>
    </>
  );
};

export default DictionaryItem;
