import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Grid, Text, Image } from "../elements";
import { FaArrowLeft, FaHeart, FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

const MagazineDetail = (props) => {
  const history = useHistory();
  const [state, setState] = React.useState({
    image_url:
      "http://img.khan.co.kr/news/2020/10/16/2020101601001687000138341.jpg",
  });

  const onDelete = () => {
    console.log("delete btn ");
  };
  return (
    <Grid padding="15px 20px 25px">
      <Grid is_flex justify="space-between" margin="0 0 5px">
        <ButtonWrap onClick={() => history.goBack()}>
          <FaArrowLeft />
        </ButtonWrap>
        <Grid>
          <ButtonWrap style={{ margin: "0 10px 0 0" }}>
            <FaRegEdit onClick={() => history.push(`/update/:id`)} />
          </ButtonWrap>
          <ButtonWrap>
            <FaRegTrashAlt onClick={onDelete} />
          </ButtonWrap>
        </Grid>
      </Grid>
      <Grid>
        <Image height="400px" src={state.image_url} />
      </Grid>
      <Grid is_flex justify="space-between" margin="10px 0 0">
        <Grid is_flex>
          <Text margin="0 10px 0 0" fontSize="15px">
            작성자 닉네임
          </Text>
          <Text>
            <FaHeart
              style={{
                fontSize: "14px",
                verticalAlign: "middle",
                margin: "0px 3px 0px 0px",
              }}
            />
            <span style={{ fontSize: "12px", color: "#495057" }}>1개</span>
          </Text>
        </Grid>

        <Text color="#adb5bd" fontSize="12px">
          2021-10-06
        </Text>
      </Grid>
      <Grid width="100%" margin="15px 0 0">
        <Text>
          안녕하세요 여기는 상세페이지 입니다.
          <br />
          여기는 내용을 길게도 입력 가능합니다. 여기는 내용을 길게도 입력
          가능합니다. 여기는 내용을 길게도 입력 가능합니다. 여기는 내용을 길게도
          입력 가능합니다. 여기는 내용을 길게도 입력 가능합니다. 여기는 내용을
          길게도 입력 가능합니다. 여기는 내용을 길게도 입력 가능합니다. 여기는
          내용을 길게도 입력 가능합니다.
        </Text>
      </Grid>
    </Grid>
  );
};

const ButtonWrap = styled.button`
  color: #000;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 16px;
  padding: 5px 0 0 0;

  &:hover {
    svg {
      color: #f03e3e;
    }
  }
`;

export default MagazineDetail;
