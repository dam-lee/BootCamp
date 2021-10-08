import React from "react";
import styled from "styled-components";
import { Grid, Image, Text } from "../elements";
import { FaHeart, FaRegHeart } from "react-icons/fa";
const Magazine = (props) => {
  const { image_url, title, contents, date, like, user_info } = props;

  // 좋아요 기능 해야함..
  const [state, setState] = React.useState({ is_like: false, like: like });

  const onLikie = () => {
    setState({
      ...state,
      is_like: !state.is_like,
      like: !state.is_like ? state.like + 1 : state.like - 1,
    });
  };

  return (
    <>
      <Grid margin="10px 0 20px">
        <Image src={image_url} is_fade height="300px" />
        <Grid is_flex justify="space-between" margin="10px 0px 7px">
          <Grid is_flex>
            <ProfileImage src={user_info ? user_info.user_profile : ""} />
            <Text fontSize="12px">{user_info ? user_info.user_name : ""}</Text>
          </Grid>
          <Text fontSize="12px" color="#adb5bd">
            {date}
          </Text>
        </Grid>
        <Grid is_flex justify="space-between" margin="10px 0px 7px">
          <Text fontSize="16px" bold>
            {title}
          </Text>
          <Grid onClick={onLikie}>
            <Text fontSize="12px">
              {state.is_like ? (
                <FaHeart fontSize="16px" />
              ) : (
                <FaRegHeart fontSize="16px" />
              )}
              {state.like}개
            </Text>
          </Grid>
        </Grid>
        <Text light>{contents}</Text>
      </Grid>
    </>
  );
};

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 6px;
  border-radius: 50%;
`;

export default Magazine;
