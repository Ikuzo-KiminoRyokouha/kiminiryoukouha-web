import { useRouter } from "next/router";
import { useEffect } from "react";
import BoardUI from "../../components/board/Board";
import Seo from "../../components/Seo";

export default function QnA() {
  const router = useRouter();
  useEffect(() => {
    if (!router.query?.page) {
      router.push({
        pathname: "/QnA",
        query: { page: 1 },
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
      <BoardUI boardname={"QnA"} />
    </>
  );
}
