import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import Comment from "../components/Comment";
import { Button, Grid, Input, Text } from "../elements";
import { addCommentFB, getCommentFB } from "../redux/modules/comment";

const CommentList = (props) => {
  const magazine_id = props.magazine_id;
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const user = useSelector((state) => state.user.user);
  const _list = useSelector((state) => state.comment.list);
  const list = _list.sort((a, b) => b.date_sort - a.date_sort);
  const [active, setActive] = React.useState(true);
  const [state, setState] = React.useState(
    user !== undefined ? { ...user, comment: "", magazine_id } : ""
  );

  const onChange = (e) => {
    if (state.comment !== "") {
      setActive(false);
    }
    setState({ ...user, comment: e.target.value, magazine_id });
  };

  const onClick = () => {
    if (state.comment === "") {
      alert("댓글 내용을 입력해주세요");
      return;
    }
    dispatch(addCommentFB(state));
    setState({ ...state, comment: "" });
  };

  React.useEffect(() => {
    if (list.length === 0) {
      dispatch(getCommentFB(magazine_id));
    }
  }, [magazine_id]);

  return (
    <>
      {!is_login && (
        <Grid margin="30px 0px" onClick={() => history.push(`/login`)}>
          <Text flex="1" fontSize="12px" color="#339af0">
            로그인 후 댓글을 남겨보세요!
          </Text>
        </Grid>
      )}

      {is_login && (
        <Grid is_flex margin="30px 0px 0px">
          <Input
            flex="1"
            padding="8px"
            name="comment"
            value={state.comment}
            placeholder="댓글을 입력해주세요"
            onChange={onChange}
            onSubmit={onClick}
          />
          <Button
            padding="8px 15px"
            bg="#000"
            color="#fff"
            border="1px solid #000"
            disabled={active}
            onClick={onClick}
          >
            등록
          </Button>
        </Grid>
      )}

      {list.map((item, idx) => {
        return (
          item.magazine_id === magazine_id && (
            <Comment key={`${idx}-item.id`} list={item} />
          )
        );
      })}
    </>
  );
};

export default CommentList;
