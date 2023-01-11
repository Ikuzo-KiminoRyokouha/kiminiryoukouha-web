import BoardUI from "../../components/board/Board";
import Seo from "../../components/Seo";
import axios from "axios";

export default function Search({ searchedItems }) {
  return (
    <>
      <Seo
        title="QnA"
        subject="여행, ar네비게이션, 네비게이션, 여행플랜, 무료, Q&A, QnA, 질의응답"
        keyword="여행, ar네비게이션, 네비게이션, 여행플랜, 무료, Q&A, QnA, 질의응답"
        classification="여행, ar네비게이션, 네비게이션, 여행플랜, 무료, Q&A, QnA, 질의응답"
        description={""}
      />
      <BoardUI searchData={searchedItems || []} />
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { data } = await axios.get(
      `http://localhost:8000/api/board/search/${context.query.search}/${context.query.page}`
    );

    if (!data) {
      return {
        props: { searchedItems: { page: -1 } },
      };
    }

    return { props: { searchedItems: data } };
  } catch {
    return {
      props: { searchedItems: { page: -1 } },
    };
  }
}
