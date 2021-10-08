import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Input, Image, Text } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import CommentList from "./CommentList";
import PostCreate from "./PostCreate";

const PostDetail = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const post_id = parseInt(props.match.params.post_id);

  const _post = post_list.filter((item, idx) => {
    return idx === post_id;
  });

  const onClick = () => {
    history.push(`/update/${post_id}`);
  };

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  });

  return (
    <>
      <Grid is_flex padding="16px">
        <Grid is_flex justify="start">
          <Image shape="circle" src={_post[0].image_url} />
          <Text bold>{_post[0].user_info.user_name}</Text>
        </Grid>
        <Grid is_flex>
          <Text>{_post[0].insert_dt}</Text>
          <Button margin="0 0 0 10px" onClick={onClick}>
            수정
          </Button>
        </Grid>
      </Grid>
      <Grid padding="16px">
        <Text>{_post[0].contents}</Text>
      </Grid>
      <Grid>
        <Image shape="rectangle" src={_post[0].image_url} />
      </Grid>
      <Grid padding="16px">
        <Text bold>댓글 {_post[0].comment_cnt}개</Text>
      </Grid>

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
