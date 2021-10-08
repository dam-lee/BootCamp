import React from "react";
import _ from "lodash"; // _ 안에 Devounce 와 Throttle이 들어있다.

const Search = (props) => {
  const [text, setText] = React.useState("");
  // React.useCallback() 은 함수를 어디다 저장해놓고, 컴포넌트가 리렌더링이 되더라도 함수를 초기화 하지 않게 해준다. (useCallback이 저장해서 사용하게 해준다.)
  //  React.useCallback(함수, [바뀔 무언가]);
  const debounce = _.debounce((e) => {
    console.log("debounce = ", e.target.value);
  }, 1000);

  // throttle
  // const throttle = _.throttle((e) => {
  //   console.log("throttle = ", e.target.value);
  // }, 1000);
  const keyPress = React.useCallback(debounce, []);
  // debounce

  const onChange = (e) => {
    // console.log(e.target.value);
    keyPress(e);
    setText(e.target.value);
  };
  console.log("text = ", text);
  return (
    <>
      <input type="text" onChange={onChange} value={text} />
    </>
  );
};

export default Search;
