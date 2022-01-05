import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import photosStyle from "../styles/Photos.module.css";

const todoList = ({ photos }) => {
  console.log("photos ? ", photos);
  return (
    <div>
      <h1>todoList</h1>
      <ul className={photosStyle.photos}>
        {photos.map((item) => {
          return (
            // 외부 이미지는 next.config에서 설정을 추가해줘야한다.
            <li key={item.id}>
              <Link href={`/todos/${item.id}`}>
                <a>
                  <Image
                    src={item.thumbnailUrl}
                    alt={item.title}
                    width={120}
                    height={120}
                  />
                  <p>{item.title}</p>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export const getStaticProps = async () => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/photos?_start=0&_end=10`
  );
  const photos = res.data;
  return {
    props: {
      photos,
    },
  };
};

export default todoList;
