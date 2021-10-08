import React from "react";
import { Helmet } from "react-helmet";
const One = (props) => {
  return (
    <div>
      <Helmet>
        <title>page one</title>
        <meta property="og:title" content="og page one~!" />;
        <meta property="og:description" content="description ~~" />; /{" "}
        {/* <meta property="og:image" content="description ~~" />; */}
      </Helmet>
      <h2>Hi, there :) ! page one</h2>
      <button
        onClick={() => {
          props.history.push("/");
        }}
      >
        page one
      </button>
      <button
        onClick={() => {
          props.history.push("/two");
        }}
      >
        page two
      </button>
    </div>
  );
};

export default One;
