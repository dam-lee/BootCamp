import React from "react";
import { Grid, Image, Text } from "../elements";

const Notification = (props) => {
  return (
    <>
      <Grid is_flex padding="16px">
        <Grid>
          <Image shape="rectangle" />
        </Grid>
        <Text flex="1" padding="20px">
          <b>닉네임</b> 님이 게시글에 댓글을 남겼습니다.
        </Text>
      </Grid>
    </>
  );
};

export default Notification;
