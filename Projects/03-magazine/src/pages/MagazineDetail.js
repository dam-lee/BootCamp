import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { deleteMagazineFB, getMagazineFB } from "../redux/modules/magazine";
import { Grid } from "../elements";
import { FaArrowLeft, FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { firestore } from "../shared/firebase";
import Magazine from "../components/Magazine";
import CommentList from "./CommentList";

const MagazineDetail = (props) => {
  const magazine_id = props.match.params.id;
  const dispatch = useDispatch();
  const login_user = useSelector((state) => state.user.user);

  // 상세 내용 가져오는 것을 리덕스에 저장할 필요가 없어보임.
  const list = useSelector((state) => state.magazine.list);

  const index = list.findIndex((i) => i.id === magazine_id);
  const magazine = list[index];

  const [state, setState] = React.useState(magazine ? magazine : null);

  // 작성한 사람만 수정 삭제가 가능하게
  const edit_user =
    login_user && magazine
      ? magazine.user_info.user_id === login_user.id
      : ""
      ? true
      : false;

  const onDelete = () => {
    dispatch(deleteMagazineFB(magazine_id));
  };

  React.useEffect(() => {
    // 새로고침시 데이터 날라가는거 방지
    const db = firestore.collection("magazine");

    db.doc(magazine_id)
      .get()
      .then((doc) => {
        const data = doc.data();
        const newMagazine = {
          ...magazine,
          date: data.date,
          like: data.like,
          image_url: data.image_url,
          title: data.title,
          contents: data.contents,
          user_info: {
            user_name: data.user_info.user_name,
            user_profile: data.user_info.user_profile,
            user_id: data.user_info.id,
            user_uid: data.user_info.uid,
          },
        };
        setState(newMagazine);
      });

    dispatch(getMagazineFB());
  }, []);

  return (
    <Grid padding="15px 20px 25px">
      <Grid is_flex justify="space-between" margin="0 0 5px">
        <ButtonWrap onClick={() => history.goBack()}>
          <FaArrowLeft />
        </ButtonWrap>
        {edit_user && (
          <Grid>
            <ButtonWrap style={{ margin: "0 10px 0 0" }}>
              <FaRegEdit
                onClick={() => history.push(`/update/${magazine_id}`)}
              />
            </ButtonWrap>
            <ButtonWrap>
              <FaRegTrashAlt onClick={onDelete} />
            </ButtonWrap>
          </Grid>
        )}
      </Grid>
      <Grid>
        {state && (
          <Magazine
            id={magazine_id}
            key={magazine_id}
            is_login={login_user ? true : false}
            {...state}
          />
        )}
      </Grid>
      <Grid>
        <CommentList magazine_id={magazine_id} />
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
