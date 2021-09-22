import React from "react";

const Nemo = (props) => {
  const [count, setCount] = React.useState(3);
  console.log("count = ", count);
  const nemo_count = Array.from({ length: count }, (v, i) => i);

  const addNemo = () => {
    setCount(count + 1);
  };
  const removeNemo = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      alert("네모가 없어용");
    }
  };
  return (
    <>
      {nemo_count.map((_item, index) => {
        return (
          <div
            style={{
              width: 100,
              height: 100,
              backgroundColor: "#ddd",
              margin: 10,
            }}
            key={index}
          >
            nemo
          </div>
        );
      })}
      <div>
        <button onClick={addNemo}>하나 추가</button>
        <button onClick={removeNemo}>하나 빼기</button>
      </div>
    </>
  );
};

export default Nemo;
