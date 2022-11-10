import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const data2 = [
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
  {
    number: 1,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
  },
];

export default function QnA() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState("");

  const maxPagination = 5; // 한 페이지에 페이지네이션 5개씩만 나옴
  const postsPerPage = 6; // 한 페이지에 6개씩 보여줌
  const indexOfLast = currentPage * postsPerPage; // 현 페이지 마지막 게시물의 인덱스 번호
  const indexOfFirst = indexOfLast - postsPerPage; // 현 페이지 첫번째 게시물의 인덱스 번호
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  const pageNumbers = [];
  // 받아오는 총 게시물수를 지정한 숫자로 나눠서 총 페이지수 return
  for (let i = 1; i <= Math.ceil(data2.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // 검색 버튼
  const searchBtn = () => {};

  // 검색창
  const search = (e) => {
    setSearchQuery(e.target.value);
  };

  const onClickWrite = () => {
    router.push("/QnA/write");
    // 로그인 상태일때
    // 로그인 상태 아닐때
  };

  useEffect(() => {
    if (router.query.page) {
      setCurrentPage(router.query.page);
    }
  }, [router.query.page]);

  return (
    <div className="h-full">
      <Head>
        <title>Q&A</title>
        <meta
          name="description"
          content="너의 여행은의 질의응답 게시판 입니다."
        />
      </Head>
      <div>
        <div className="mx-auto max-w-7xl">
          <div className="relative h-72">
            <Image src={"/assets/QnA-bg.png"} layout={"fill"} />
            {/* inset :0 position: absolute */}
          </div>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>

          <div className="h-full w-full">
            <div className="flex h-full w-full">
              <div className="flex w-1/4 ">
                <div className="flex w-full flex-col items-center">
                  <div className="mt-10 h-9 w-2/3 bg-sky-600">
                    <Link href={"/QnA"} legacyBehavior>
                      <a>
                        <h2 className="pl-1 text-lg text-white ">질의응답</h2>
                      </a>
                    </Link>
                  </div>
                  <div className="h-9 w-2/3 border-b-2 border-solid border-gray-300">
                    <Link href="/F&A" legacyBehavior>
                      <a>
                        <h2 className="pl-1 text-lg">자주묻는질문</h2>
                      </a>
                    </Link>
                  </div>
                  <div className="h-9 w-2/3 border-b-2 border-solid border-gray-300">
                    <Link href="/freeboard" legacyBehavior>
                      <a>
                        <h2 className="pl-1 text-lg">자유게시판</h2>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-3/4">
                <div className="flex h-32 w-full justify-between bg-white">
                  <h1 className="mt-8 text-3xl">질의응답 게시판</h1>
                  <div className="flex items-end">
                    <div className="pb-3 ">
                      <input
                        className="mr-3 rounded-sm border-2 border-solid border-gray-300 p-2"
                        placeholder="검색어를 입력하세요"
                        onChange={search}
                      />
                      <button
                        className="rounded border-2 border-solid border-sky-600 bg-sky-600 p-3 text-white"
                        onClick={searchBtn}
                      >
                        검색
                      </button>
                    </div>
                  </div>
                </div>
                <div className="h-full w-full">
                  <div className="w-full border-2 border-solid">
                    <table className="w-full text-center">
                      <thead className="bg-gray-300 text-center">
                        <tr>
                          <th className="p-2 text-xl font-normal">
                            <span>게시물번호</span>
                          </th>
                          <th className="w-2/4 p-2 text-xl font-normal">
                            제목
                          </th>
                          <th className="p-2 text-xl font-normal">작성자</th>
                          <th className="p-2 text-xl font-normal">날짜</th>
                          <th className="p-2 text-xl font-normal">답변상태</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {currentPosts(data2).map((data, index) => {
                          return (
                            <tr className="border-b-2 border-solid" key={index}>
                              <td className="p-2 text-xl font-normal">
                                {data.number}
                              </td>
                              <td className="w-2/4 p-2 text-xl font-normal">
                                <Link
                                  href={{
                                    pathname: "/QnA/view",
                                    query: { id: `${data.number}` },
                                  }}
                                  legacyBehavior
                                >
                                  <a>{data.name}</a>
                                </Link>
                              </td>
                              <td className="p-2 text-xl font-normal">
                                {data.writer}
                              </td>
                              <td className="p-2 text-xl font-normal">
                                {data.date}
                              </td>
                              <td className="p-2 text-xl font-normal">
                                {data.status}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end pt-3">
                    <button
                      className="rounded bg-sky-600 p-3 text-white"
                      onClick={onClickWrite}
                    >
                      글쓰기
                    </button>
                  </div>
                  <div className="flex justify-center pt-5">
                    <ul className="flex">
                      <button>{"<"}</button>
                      {pageNumbers.map((number, index) => {
                        if (parseInt(router.query.page) === number) {
                          return (
                            <li className="p-2" key={index}>
                              <Link
                                href={{
                                  pathname: `/QnA`,
                                  query: { page: `${number}` },
                                }}
                                legacyBehavior
                              >
                                <a className="text-lg text-sky-600">{number}</a>
                              </Link>
                            </li>
                          );
                        }
                        return (
                          <li className="p-2" key={index}>
                            <Link
                              href={{
                                pathname: `/QnA`,
                                query: { page: `${number}` },
                              }}
                              legacyBehavior
                            >
                              <a className="text-lg">{number}</a>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
