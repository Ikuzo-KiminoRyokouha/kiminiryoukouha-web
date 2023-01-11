import Head from "next/head";

interface Props {
  title: string;
  subject: string;
  description: string;
  keyword: string;
  classification: string;
}
/**
 *
 * @param {string} title - 타이틀
 * @param {string} subject - 주제
 * @param {string} description - 간략한 설명
 * @param {string} keyword - 키워드
 * @param {string} classification - 카테고리
 */
export default function Seo({
  title,
  subject,
  description,
  keyword,
  classification,
}: Props) {
  const Title = "";
  const Subject = "여행, ar네비게이션, 네비게이션, 여행플랜, 무료";
  const Description =
    "AR 네비게이션을 이용할 수 있는 여행 올인원 웹, 앱 입니다.";
  const Keyword = "여행, ar네비게이션, 네비게이션, 여행플랜, 무료";
  const Classification = "여행, ar네비게이션, 네비게이션, 여행플랜, 무료";

  return (
    <Head>
      {/* 타이틀 */}
      <title>君の旅行は</title>
      <meta charSet="UTF - 8" />
      {/* 홈페이지 주제 */}
      <meta name="Subject" content={subject ? subject : Subject} />
      {/* 간략한 설명 */}
      <meta
        name="description"
        content={description ? description : Description}
      />
      {/* 키워드 */}
      <meta name="Keywords" content={keyword ? keyword : Keyword} />
      {/* 카테고리 */}
      <meta
        name="Classification"
        content={classification ? classification : Classification}
      />
      <meta name="robots" content="index, follow" />
      <meta name="Date" content="2022-11-16T07:45:37+09:00" />
    </Head>
  );
}
