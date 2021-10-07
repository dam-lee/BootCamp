import React from "react";
import styled, { keyframes } from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { actionCreators as magazineActions } from "../redux/modules/magazine";
import { Grid } from "../elements";
import { FaPlus } from "react-icons/fa";
import { getMagazineFB } from "../redux/modules/magazine";
import Magazine from "../components/Magazine";

const MagazineList = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.magazine.list);
  React.useEffect(() => {
    dispatch(getMagazineFB());
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {list.map((item) => {
        return (
          <Grid
            key={item.id}
            padding="15px 20px 25px"
            onClick={() => history.push(`/detail/${item.id}`)}
          >
            <Magazine key={item.id} {...item} />
          </Grid>
        );
      })}

      <CreateButtonWrap onClick={() => history.push(`/create`)}>
        <FaPlus style={{ fontSize: "22px" }} />
      </CreateButtonWrap>
    </div>
  );
};

const boxFade = keyframes`
  0% {
    background-color: #000;
  }
  100% {
    background-color: #e03131;
  }
`;

const CreateButtonWrap = styled.button`
  position: fixed;
  right: 33vw;
  bottom: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #fff;
  border: none;
  background-color: #000;
  cursor: pointer;
  &:hover {
    animation-duration: 0.5s;
    animation-name: ${boxFade};
    // 마지막 상태를 유지
    animation-fill-mode: forwards;
  }
`;
export default MagazineList;
