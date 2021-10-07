import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Magazine from "../components/Magazine";
import { Grid } from "../elements";
import { FaArrowLeft, FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteMagazineFB, getMagazineFB } from "../redux/modules/magazine";

const MagazineDetail = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const magazine_id = props.match.params.id;
  // 상세 내용 가져오는 것을 리덕스에 저장할 필요가 없어보임.
  const list = useSelector((state) => state.magazine.list);
  const index = list.findIndex((i) => i.id === magazine_id);
  const magazine = list[index];

  const onDelete = () => {
    dispatch(deleteMagazineFB(magazine_id));
    history.goBack();
  };

  React.useEffect(() => {
    if (magazine_id !== "") {
      dispatch(getMagazineFB());
    }
  }, []);

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
        <Magazine id={magazine_id} key={magazine_id} {...magazine} />
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
