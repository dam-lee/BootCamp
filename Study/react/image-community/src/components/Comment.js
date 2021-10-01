import React from "react";
import { Button, Grid, Image, Text } from "../elements";

const Comment = () => {
  return (
    <>
      <Grid is_flex justify="start">
        <Image />
        <Text flex="1">12</Text>
        <Button>삭제</Button>
      </Grid>
    </>
  );
};

export default Comment;
