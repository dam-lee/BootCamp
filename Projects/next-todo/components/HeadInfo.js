import Head from "next/head";

const HeadInfo = ({ title, keyword }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta keyword={keyword} />
    </Head>
  );
};

HeadInfo.defaultProps = {
  title: "Next.js Todo",
  keyword: "next.js, todoList",
};

export default HeadInfo;
