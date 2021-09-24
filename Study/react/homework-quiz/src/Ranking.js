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
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const Ranking = (props) => {
  const history = useHistory();
  const [newData, setNewData] = React.useState([]);

  const newLoad = async () => {
    const query = await getDocs(collection(db, "quiz"));
    let data = [];
    query.forEach((doc) => {
      let newDoc = doc.data();
      data.push(newDoc);
    });
    setNewData(data);
  };

  React.useEffect(() => {
    newLoad();
  }, []);

  const sortRanking = newData.sort(function (a, b) {
    return b.score - a.score;
  });

  return (
    <Container>
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
