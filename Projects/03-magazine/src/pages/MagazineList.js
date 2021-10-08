import React from "react";
import styled, { keyframes } from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "../elements";
import { FaPlus } from "react-icons/fa";
import { getMagazineFB } from "../redux/modules/magazine";
import Magazine from "../components/Magazine";
import Permit from "../shared/Permit";

const MagazineList = (props) => {
  const dispatch = useDispatch();
  const _list = useSelector((state) => state.magazine.list);
  const list = _list.sort((a, b) => b.date_sort - a.date_sort);

  React.useEffect(() => {
    dispatch(getMagazineFB());
  }, []);

  return (
    <div
      style={{
        position: "relative",
        background: "#e9ecef",
      }}
    >
      {list.map((item) => {
        return (
          <Grid
            key={item.id}
            margin="0px 0px 10px"
            padding="5px 20px 15px"
            onClick={() => history.push(`/detail/${item.id}`)}
          >
            <Magazine key={item.id} {...item} />
          </Grid>
        );
      })}
      <Permit>
        <CreateButtonWrap onClick={() => history.push(`/create`)}>
          <FaPlus style={{ fontSize: "22px" }} />
        </CreateButtonWrap>
      </Permit>
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
