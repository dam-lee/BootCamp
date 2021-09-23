import React from "react";
import { useParams, useHistory } from "react-router-dom";

// 리덕스에서 버킷리스트 데이터 가져오기
import { useSelector, useDispatch } from "react-redux";
import { removeBucket, deleteBucket } from "./redux/modules/bucket";

const Detail = (props) => {
  const params = useParams();
  const bucket_index = params.index;
  const history = useHistory();
  const dispatch = useDispatch();
  const bucket_list = useSelector((state) => state.bucket.list);

  // 내가 푼거
  const removeBucketList = () => {
    const newBucket = bucket_list.filter((item) => {
      return item !== bucket_list[bucket_index];
    });
    dispatch(removeBucket(newBucket));
    history.goBack();
  };

  return (
    <>
      <h1>{bucket_list[bucket_index]}</h1>
      {/* <button
        style={{
          backgroundColor: "slateblue",
          border: "1px solid slateblue",
          color: "#fff",
          padding: "10px 20px",
        }}
        onClick={removeBucketList}
      > */}
      <button
        style={{
          backgroundColor: "slateblue",
          border: "1px solid slateblue",
          color: "#fff",
          padding: "10px 20px",
        }}
        // 튜터님해설
        onClick={() => {
          dispatch(deleteBucket(bucket_index));
          history.goBack();
        }}
      >
        삭제
      </button>
    </>
  );
};

export default Detail;
