import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const index = ({ photo }) => {
  const { title, url } = photo;

  return (
    <div>
      <h2>{title}</h2>
      <Image src={url} width={500} height={500} />
      <Link href="/todo">뒤로가기</Link>
    </div>
  );
};

// StaticPaths가 props로 context를 받는다.
export const getStaticProps = async (context) => {
  // StaticPaths 에서 받은 context에서 id 값을 받아서 동적으로 변경해줌
  const { id } = context.params;
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/photos/${id}`
  );
  const photo = res.data;
  return {
    props: {
      photo,
    },
  };
};
export const getStaticPaths = async () => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/photos?_start=0&_end=10`
  );
  const photos = res.data;
  const ids = photos.map((item) => item.id);
  // res.data 갯수만큼 paths 생성
  const paths = ids.map((id) => {
    return {
      params: { id: id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export default index;
