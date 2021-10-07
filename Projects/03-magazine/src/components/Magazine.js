import React from "react";
import { Grid, Image, Text } from "../elements";
import { FaHeart } from "react-icons/fa";
const Magazine = (props) => {
  const { image_url, title, contents, user_name, like } = props;
  return (
    <>
      <Grid margin="10px 0 20px">
        <Image src={image_url} is_fade height="300px" />
        <Grid is_flex justify="space-between" margin="10px 0px 7px">
          <Text fontSize="12px">{user_name}</Text>
          <Text fontSize="12px" color="#adb5bd">
            2021-10-07 10:00:00
          </Text>
        </Grid>
        <Grid is_flex justify="space-between" margin="10px 0px 7px">
          <Text fontSize="16px" bold>
            {title}
          </Text>
          <Grid>
            <FaHeart />
            {like}
          </Grid>
        </Grid>
        <Text light>{contents}</Text>
      </Grid>
    </>
  );
};

export default Magazine;
