import React from "react";
import { Grid, Image, Text } from "../elements";
import { FaHeart } from "react-icons/fa";
const Magazine = (props) => {
  const { src, title, text, date, like } = props;

  return (
    <>
      <Grid margin="10px 0 20px">
        <Image src={src} is_fade height="300px" />
        <Grid is_flex justify="space-between" margin="10px 0px 7px">
          <Text fontSize="16px" bold>
            {title}
          </Text>
          <FaHeart />
        </Grid>
        <Text light>{text}</Text>
      </Grid>
    </>
  );
};

export default Magazine;
