import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Post from "../components/Post";
import { Button } from "../elements";

const PostList = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  // 처음 한번만 불러오기 위해서 [] deps넣어줌
  // list 페이지에 들어오는 순간 바로 dispatch해주기 때문에
  // length 가 0개일때 게시글 가져오게 해줌 (처음 한번)
  // 그 다음 게시글이 추가되면 length가 0이 아니게 되기 때문에 redux에 저장된 값만 가져온다.
  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  });

  return (
    <>
      {post_list.map((item, idx) => {
        return (
          <div key={item.id}>
            <Post {...item} index={idx} history={props.history} />
            <Button
              onClick={() => {
                history.location.state = item.id;
                history.push(`/detail/${idx}`);
              }}
            >
              상세보기
            </Button>
          </div>
        );
      })}
    </>
  );
};

export default PostList;
