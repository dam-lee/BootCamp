import React from "react";
import {
  Container,
  Wrap,
  Title,
  RankingWrap,
  RankingContainer,
  RankingScoreBox,
  RankingScore,
  RankingList,
  RankingName,
  RankingText,
  HomeButton,
} from "./Style";
import { useHistory } from "react-router-dom";
import { userRankingListFB } from "./redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";

const Ranking = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const ranking_list = useSelector((state) => state.user.ranking);
  const is_loading = useSelector((state) => state.user.is_loading);

  React.useEffect(() => {
    dispatch(userRankingListFB());
  }, []);

  const sortRanking = ranking_list.sort(function (a, b) {
    return b.score - a.score;
  });

  return (
    <Container>
      {!is_loading && <Spinner />}

      <Wrap>
        <Title>랭킹.</Title>
        <RankingWrap>
          <h3>{sortRanking.length}명의 사람들 중 당신의 순위는?</h3>
          {sortRanking.map((item, index) => {
            return (
              <>
                <RankingContainer key={index}>
                  <RankingScoreBox>
                    <RankingScore>{index + 1}위</RankingScore>
                  </RankingScoreBox>
                  <RankingList>
                    <RankingName>{item.name}님</RankingName>
                    <RankingText>{item.message}</RankingText>
                  </RankingList>
                </RankingContainer>
              </>
            );
          })}
          <HomeButton onClick={() => history.push("/")}>홈</HomeButton>
        </RankingWrap>
      </Wrap>
    </Container>
  );
};

export default Ranking;
