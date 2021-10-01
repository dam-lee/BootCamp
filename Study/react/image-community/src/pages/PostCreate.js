import React from "react";
import { Button, Grid, Input, Text, Image, TextArea } from "../elements";
import { useHistory } from "react-router";
const PostCreate = () => {
  const history = useHistory();
  const onClick = () => {
    history.push("/comment");
  };
  return (
    <Grid padding="16px">
      <Text size="32px" bold>
        게시글 작성
      </Text>
      <Grid margin="30px 0 0">
        <Text size="16px" bold>
          이미지 미리보기
        </Text>
      </Grid>
      <Grid is_flex margin="20px 0">
        <Input type="file" padding="8px" />
        <Button width="120px" fontSize="12px" padding="8px">
          이미지 선택
        </Button>
      </Grid>
      <Grid>
        <Image shape="rectangle" />
      </Grid>
      <TextArea margin="15px 0" rows={8}></TextArea>
      <Button
        width="100%"
        padding="15px"
        bg="#000"
        color="#fff"
        hoverColor="#000"
        hoverBg="#fff"
        onClick={onClick}
      >
        게시글작성
      </Button>
    </Grid>
  );
};

export default PostCreate;
