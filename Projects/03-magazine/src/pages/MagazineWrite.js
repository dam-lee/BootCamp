import React from "react";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { addMagazineFB, updateMagazineFB } from "../redux/modules/magazine";
import { Grid, Input, Text, Image, Button, Upload } from "../elements";
import { FaArrowLeft } from "react-icons/fa";

const MagazineWrite = (props) => {
  const magazine_id = props.match.params.id;
  const dispatch = useDispatch();
  const magazine_list = useSelector((state) => state.magazine.list);
  const preview = useSelector((state) => state.image.image);
  const file = useSelector((state) => state.image.file);
  const [active, setActive] = React.useState(true);

  const is_edit = magazine_id ? true : false;
  const _magazine = is_edit
    ? magazine_list.find((list) => list.id === magazine_id)
    : null;

  const [state, setState] = React.useState(
    _magazine
      ? {
          image_url: _magazine.image_url,
          contents: _magazine.contents,
          title: _magazine.title,
        }
      : { image_url: "", contents: "", title: "" }
  );

  const onChange = (e) => {
    if (state.contents !== "" && state.title !== "") {
      setActive(false);
    }
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onClick = () => {
    if (preview === "" || state.contents === "" || state.title === "") {
      alert("내용을 모두 입력해주세요");
      return;
    }

    dispatch(addMagazineFB(state, file));
    setState({ ...state, image_url: "", contents: "", title: "" });
  };
  const onUpdate = () => {
    dispatch(updateMagazineFB(magazine_id, state));
    setState({ ...state, image_url: "", contents: "", title: "" });
  };

  return (
    <Grid padding="15px 20px 25px">
      <Grid>
        <Button padding="0px" onClick={() => history.goBack()}>
          <FaArrowLeft fontSize="16px" />
        </Button>
      </Grid>
      <Text fontSize="24px" bold>
        {is_edit ? "수정하기" : "작성하기"}
      </Text>

      <Grid>
        <Upload />
      </Grid>
      {preview && <Image height="350px" src={preview} />}

      <Grid margin="10px 0 0">
        <Text padding="10px 10px 10px 0px" fontSize="15px">
          제목
        </Text>
        <Input
          name="title"
          width="100%"
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
          value={state.contents}
        >
          {state.contents}
        </textarea>
      </Grid>
      <Button
        width="100%"
        padding="20px"
        bg="#000"
        color="#fff"
        hoverColor="#e03131"
        onClick={is_edit ? onUpdate : onClick}
        disabled={active}
      >
        {is_edit ? "수정하기" : "작성하기"}
      </Button>
    </Grid>
  );
};

MagazineWrite.defaultProps = {};
export default MagazineWrite;
