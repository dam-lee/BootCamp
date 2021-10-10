import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, Text } from "../elements";
import { deleteCommentFB } from "../redux/modules/comment";

const Comment = (props) => {
  const { list } = props;
  const dispatch = useDispatch();
  const is_user = useSelector((state) => state.user.user);

  const onClick = () => {
    dispatch(deleteCommentFB(list.comment_id));
  };

  if (list.length === 0) {
    return;
  }

  return (
    <Grid margin="10px 0 0 0">
      <Grid is_flex justify="space-between">
        <Grid is_flex>
          <Grid width="60px">
            <Text fontSize="12px">{list.user_name}</Text>
          </Grid>
          <Text flex="1" fontSize="12px">
            {list.comment}
          </Text>
        </Grid>
        <Grid is_flex>
          <Text fontSize="11px" color="#adb5bd">
            {list.date}
          </Text>

          {is_user !== null && list.id === is_user.id && (
            <Button color="#f03e3e" onClick={onClick}>
              삭제
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Comment;
