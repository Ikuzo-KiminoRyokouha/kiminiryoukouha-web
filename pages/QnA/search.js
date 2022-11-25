import BoardUI from "../../components/board/Board";
import Seo from "../../components/Seo";
import { getSearch } from "../../utils/fetchFn/query/board";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Search() {
  const router = useRouter();
  const { data: searchData } = useQuery(
    ["getSearch", router.query?.search, 1],
    getSearch
  );

  return (
    <>
      <Seo
        title="QnA"
        subject="여행, ar네비게이션, 네비게이션, 여행플랜, 무료, Q&A, QnA, 질의응답"
        keyword="여행, ar네비게이션, 네비게이션, 여행플랜, 무료, Q&A, QnA, 질의응답"
        classification="여행, ar네비게이션, 네비게이션, 여행플랜, 무료, Q&A, QnA, 질의응답"
        description={""}
      />
      <BoardUI boardname={"QnA"} searchData={searchData?.data || []} />
    </>
  );
}
