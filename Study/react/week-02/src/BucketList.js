import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
// 리덕스에 있는 데이터를 가져올 때 쓰는 훅은 useSelector
import { useSelector } from "react-redux";

const BucketList = (props) => {
  const history = useHistory();
  // 화살표 함수가 받는 인자인 (state)는 스토어가 갖고 있는 전체 데이터를 말하고
  // => state는 스토어가 갖고 있는 모든 데이터 보려고 함
  const my_lists = useSelector((state) => state.bucket.list);
  // console.log에 나온 bucket은 모듈명이다 bucket:bucket
  const onClick = (index) => {
    return history.push(`/detail/${index}`);
  };

  return (
    <>
      <div>
        {my_lists.map((list, index) => {
          return (
            <ItemList
              className="list-item"
              key={index}
              onClick={() => onClick(index)}
              done={list.done}
            >
              {list.text}
            </ItemList>
          );
        })}
      </div>
    </>
  );
};
const ItemList = styled.div`
  padding: 16px;
  margin: 8px;
  color:${(props) => (props.done ? "#fff" : "#333")};
  background-color: ${(props) => (props.done ? "slateblue" : "aliceblue")}}
`;
// export {BucketList}
export default BucketList;
