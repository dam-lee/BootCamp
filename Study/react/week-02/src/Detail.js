import React from "react";
import { useParams, useHistory } from "react-router-dom";

// 리덕스에서 버킷리스트 데이터 가져오기
import { useSelector, useDispatch } from "react-redux";
import { updateBucketFB, deleteBucketFB } from "./redux/modules/bucket";

import Button from "@material-ui/core/Button";

const Detail = (props) => {
  const params = useParams();
  const bucket_index = params.index;
  const history = useHistory();
  const dispatch = useDispatch();
  const bucket_list = useSelector((state) => state.bucket.list);

  return (
    <>
      <h1>{bucket_list[bucket_index] ? bucket_list[bucket_index].text : ""}</h1>
      <Button
        variant="outlined"
        onClick={() => {
          // dispatch(updateBucket(bucket_index));
          dispatch(updateBucketFB(bucket_list[bucket_index].id));
        }}
      >
        완료하기
      </Button>
      <Button
        variant="contained"
        color="primary"
        // 튜터님해설
        onClick={() => {
          // dispatch(deleteBucket(bucket_index));
          dispatch(deleteBucketFB(bucket_list[bucket_index].id));
          history.goBack();
        }}
      >
        삭제
      </Button>
    </>
  );
};

export default Detail;
