import BoardUI from "../../components/board/Board";
import Seo from "../../components/Seo";

export default function QnA() {
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
