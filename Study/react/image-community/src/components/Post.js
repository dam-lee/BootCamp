import React from "react";
import { Grid, Image, Text, Button } from "../elements";

const Post = (props) => {
  console.log("props = ", props);

  return (
    <>
      {/* grid의 자식으로 넘어간다 */}
      <Grid is_flex padding="16px">
        <Grid is_flex justify="start">
          <Image shape="circle" src={props.src} />
          <Text bold>{props.user_info.user_name}</Text>
        </Grid>
        <Text>{props.insert_dt}</Text>
      </Grid>
      <Grid padding="16px">
        <Text>{props.contents}</Text>
      </Grid>
      <Grid>
        <Image shape="rectangle" src={props.image_url} />
      </Grid>
      <Grid padding="16px">
        <Text bold>댓글 {props.comment_cnt}개</Text>
      </Grid>
    </>
  );
};

// props가 없을 경우 대비
Post.defaultProps = {
  user_info: {
    user_name: "mida",
    user_profile:
      "https://midadictionary.s3.ap-northeast-2.amazonaws.com/cat.jpg",
  },
  image_url: "https://midadictionary.s3.ap-northeast-2.amazonaws.com/cat.jpg",
  contents: "루이군요!",
  comment_cnt: 10,
  insert_dt: "2021-09-30 10:00:00",
};

export default Post;
