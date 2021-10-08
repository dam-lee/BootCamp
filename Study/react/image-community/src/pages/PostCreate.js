import React from "react";
import { Button, Grid, Upload, Text, Image, TextArea } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { parseInt } from "lodash";

const PostCreate = (props) => {
  const { history } = props;
  // history.replace() 를 페이지를 갈아끼우기 때문에 다시 글 작성 페이지로 들어오지 않는다.
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const post_id = parseInt(props.match.params.post_id);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);
  const _post = post_list.filter((_item, idx) => {
    return idx === post_id;
  });
  const is_edit = _post[0] ? true : false;
  const [state, setState] = React.useState({
    contents: "",
    image_url: "",
    id: "",
  });

  const onCreate = () => {
    dispatch(postActions.addPostFB(state.contents));
  };

  const onUpdate = () => {
    dispatch(postActions.updatePostFB(state));
  };
  const onChange = (e) => {
    setState({ ...state, contents: e.target.value });
  };

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  React.useEffect(() => {
    if (is_edit) {
      setState({
        ...state,
        id: _post[0].id,
        contents: _post[0].contents,
        image_url: _post[0].image_url,
      });
    }
  }, [is_edit]);

  if (!is_login) {
    return (
      <Grid padding="16px">
        <Text size="32px" bold>
          앗! 잠깐!
        </Text>
        <Text margin="15px 0">로그인 된 회원만 글을 작성할 수 있어요!</Text>
        <Button width="100%" onClick={() => history.replace("/")}>
          로그인 하러 가기
        </Button>
      </Grid>
    );
  }

  return (
    <>
      <Grid padding="16px">
        <Text size="32px" bold>
          게시글 {!is_edit ? "작성" : "수정"}
        </Text>
      </Grid>
      <Grid is_flex margin="20px 0" padding="16px">
        <Upload />
      </Grid>
      <Grid>
        {!is_edit ? (
          <Image
            shape="rectangle"
            src={preview ? preview : "https://via.placeholder.com/400x300"}
          />
        ) : (
          <Image shape="rectangle" src={state.image_url} />
        )}
      </Grid>
      <Grid padding="16px">
        <TextArea
          margin="15px 0"
          rows={8}
          name="contents"
          onChange={onChange}
          value={!is_edit ? "" : state.contents}
        ></TextArea>
      </Grid>
      <Grid padding="16px">
        <Button
          width="100%"
          padding="15px"
          bg="#000"
          color="#fff"
          hoverColor="#000"
          hoverBg="#fff"
          onClick={!is_edit ? onCreate : onUpdate}
        >
          {!is_edit ? "게시글작성" : "게시글 수정"}
        </Button>
      </Grid>
    </>
  );
};

export default PostCreate;
