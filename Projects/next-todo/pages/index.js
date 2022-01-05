import axios from "axios";

export default function Home({ posts }) {
  console.log("posts === ", posts);
  return (
    <>
      <h1>next js</h1>
      <ul>
        {posts.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  );
}

// 페이지에 들어올 때마다 서버에서 요청하여 받아온 api를 뿌려준다.
// 서버에서 만든 html 파일을 그때그때 보여주는 서버사이드방식.
// https://jsonplaceholder.typicode.com/posts?_start=0&_end=10
// http://localhost:8080/api/posts
// export const getServerSideProps = async () => {
//   const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_start=0&_end=10`);
//   const posts = res.data;
//   return {
//     props: {
//       posts,
//     },
//   };
// };

// Static 방식은 이미 만들어져서 데이터가 조회되어 생성된 html 을 보여주는 방식이다.
// 데이터가 바뀔때마다 변경된 데이터를 보여주기 위해 revalidate 속성을 준다
export const getStaticProps = async () => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_start=0&_end=10`
  );
  const posts = res.data;
  return {
    props: {
      posts,
    },
    // 10초 지난 시점부터 새로 고침하면(접근하면) 변경된 데이터가 보인다.
    revalidate: 10,
  };
};

// 페이지가 즉각즉각 변경되지 않아도 되는 페이지라면 Static 방식으로 작업하는 것이 성능적으로 좋다.
// 페이지에 즉각즉각 변경되어야 하는 페이지라면 serverSide 방식으로 처리한다.
