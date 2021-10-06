import React from "react";
import { Grid, Input, Text, Image, Button } from "../elements";

const MagazineWrite = (props) => {
  const [state, setState] = React.useState({
    image_url:
      "http://img.khan.co.kr/news/2020/10/16/2020101601001687000138341.jpg",
  });
  return (
    <Grid padding="15px 20px 25px">
      <Text fontSize="24px" bold>
        작성하기
      </Text>
      <Grid>
        <Input type="file" placeholder="" />
      </Grid>
      <Grid>
        <Image height="400px" src={state.image_url} />
      </Grid>
      <Grid width="100%" margin="10px 0 0">
        <textarea
          style={{ width: "100%", padding: "10px", resize: "none" }}
          rows="7"
        ></textarea>
      </Grid>
      <Button
        width="100%"
        padding="20px"
        bg="#000"
        color="#fff"
        hoverColor="#e03131"
      >
        등록하기
      </Button>
    </Grid>
  );
};

MagazineWrite.defaultProps = {};
export default MagazineWrite;
