import React from "react";
import Post from "../components/Post";
import { Button, Grid, Input } from "../elements";
import CommentList from "./CommentList";
const PostDetail = (props) => {
  return (
    <>
      <Post />
      <Grid is_flex padding="0px 16px">
        <Input />
        <Button width="100px" fontSize="12px">
          작성
        </Button>
      </Grid>
      <CommentList />
    </>
  );
};

export default PostDetail;
