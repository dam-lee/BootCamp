import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const Ranking = () => {
  const history = useHistory();
  const user_data = useSelector((state) => state.ranking.ranking);
  const new_user_data = user_data.sort((a, b) => b.score - a.score);
  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          padding: 16,
          borderBottom: "1px solid #888",
          background: "#fff",
        }}
      >
        {new_user_data.length}명의 사람들 중에서 당신은?
      </div>

      <div style={{ margin: "10vh 0vh" }}>
        {new_user_data.map((item, index) => {
          return (
            <div
              style={{
                display: "flex",
                border: "1px solid #888",
                padding: 16,
                borderRadius: 16,
              }}
            >
              <h1>{index + 1}등</h1>
              <div style={{ padding: "0 16px" }}>
                <h3>{item.user_name}</h3>
                <p>{item.message}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{ position: "fixed", bottom: "30px", left: 0, width: "100vw" }}
      >
        <button onClick={() => history.push("/")}>다시하기</button>
      </div>
    </div>
  );
};
// 원래 list의 높이는 계산해서 준다.
export default Ranking;
