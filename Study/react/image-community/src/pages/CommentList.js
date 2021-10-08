import React from "react";
import Comment from "../components/Comment";
import { Grid } from "../elements";

const CommentList = () => {
  return (
    <>
      <Grid padding="16px">
        <Comment />
      </Grid>
    </>
  );
};

export default CommentList;
