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
              <div className="max-w-8xl mx-auto w-full">
                <div className="my-8  text-3xl font-bold">
                  {" "}
                  Qna든 F&든 게시판이름
                </div>
                <div className="float-left w-4/5 text-2xl font-semibold">
                  {" "}
                  아침밥은 김치찌개 에다가 참치꽁치찌개{" "}
                </div>
                <div className=" float-left w-1/5 text-right ">2011.22.34</div>
                <br></br>
                <div className="w-5/5  float-none clear-both my-2 h-1 "></div>
                <div className="float-left w-4/5">작성자: wqeasd987</div>
                <div className="my float-left w-1/5 text-right">
                  조회 2300 | 댓글 300
                </div>
                <br></br>
                <div className="bg-gray  float-none clear-both my-2 h-px w-full bg-gray-200 "></div>
                <div className="w-5/5 h-auto border-black bg-slate-600">
                  sadasdsasa
                </div>
                <div className="flex justify-end pt-3">
                  <button className="rounded bg-sky-400 p-3 text-white">
                    수정
                  </button>
                  <button className="rounded bg-sky-400 p-3 text-white">
                    삭제
                  </button>
                </div>
                <div className="my-8">
                  <form>
                    <textarea className="  float-left h-full  w-11/12 border-black bg-gray-200"></textarea>
                  </form>

                  <button className=" float-left flex w-1/12 justify-center rounded bg-sky-400 p-2 text-white">
                    등록
                  </button>
                </div>

                <div className="my-8"> 전체댓글 300개</div>
                <div className="text-1xl">닉네임: 어쩌구 저쩌구 </div>
                <div className="bg-gray  float-none clear-both my-2 h-px w-full bg-gray-200 "></div>
                <div className="text-1xl">닉네임: 어쩌구 저쩌구23 </div>
                <div className="bg-gray  float-none clear-both my-2 h-px w-full bg-gray-200 "></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
