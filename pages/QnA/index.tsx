import axios from "axios";
import Seo from "../../components/Seo";
import BoardUI from "../../components/board/Board";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function QnA({ posts }) {
  const router = useRouter();

  useEffect(() => {
    if (!router.query.page) {
      router.push({
        pathname: `/QnA`,
        query: { page: "1" },
      });
    }
  }, []);

  return (
    <>
      <Seo
        title="QnA"
        subject="여행, ar네비게이션, 네비게이션, 여행플랜, 무료, Q&A, QnA, 질의응답"
        keyword="여행, ar네비게이션, 네비게이션, 여행플랜, 무료, Q&A, QnA, 질의응답"
        classification="여행, ar네비게이션, 네비게이션, 여행플랜, 무료, Q&A, QnA, 질의응답"
        description={""}
      />
      <BoardUI posts={posts} />
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { data: posts } = await axios.get(
      `http://localhost:8000/board/all/${context.query.page || 1}`
    );

    if (!posts) {
      console.log("posts is not found");
      return {
        props: {
          posts: -1,
        },
      };
    }
    return { props: { posts } };
  } catch {
    console.log("error occured");
    return {
      props: {
        posts: -1,
      },
    };
  }
}
