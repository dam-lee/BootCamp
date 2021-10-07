import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { addMagazineFB, updateMagazineFB } from "../redux/modules/magazine";
import { Grid, Input, Text, Image, Button } from "../elements";

const MagazineWrite = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    image_url:
      "http://img.khan.co.kr/news/2020/10/16/2020101601001687000138341.jpg",
    contents: "",
    title: "",
    user_name: "이미다",
  });
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onClick = () => {
    dispatch(addMagazineFB(state));
    history.push(`/`);
  };
  const onUpdate = () => {
    dispatch(updateMagazineFB(state.id, state));
  };
  return (
    <Grid padding="15px 20px 25px">
      <Text fontSize="24px" bold>
        작성하기
      </Text>
      <Grid>
        <Input type="file" placeholder="" />
      </Grid>
      {state.image_url !== "" && (
        <Grid>
          <Image height="350px" src={state.image_url} />
        </Grid>
      )}
      <Grid is_flex margin="10px 0 0">
        <Text padding="10px 10px 10px 0px" fontSize="15px">
          제목
        </Text>
        <Input
          name="title"
          flex="1"
          padding="10px"
          placeholder="제목을 입력해주세요"
          onChange={onChange}
          value={state.title}
        />
      </Grid>
      <Grid width="100%" margin="10px 0 0">
        <textarea
          name="contents"
          style={{ width: "100%", padding: "10px", resize: "none" }}
          rows="7"
          onChange={onChange}
        ></textarea>
      </Grid>
      <Button
        width="100%"
        padding="20px"
        bg="#000"
        color="#fff"
        hoverColor="#e03131"
        onClick={onClick}
      >
        등록하기
      </Button>
      <Button
        width="100%"
        padding="20px"
        bg="#000"
        color="#fff"
        hoverColor="#e03131"
        onClick={onUpdate}
      >
        수정하기
      </Button>
    </Grid>
  );
};

MagazineWrite.defaultProps = {};
export default MagazineWrite;
