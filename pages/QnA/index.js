import Head from "next/head";
import Header from "../../components/layout/Header";
import ChatBotButton from "../../components/layout/ChatBotButton";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function QnA() {
  const router = useRouter();
  const { id } = router.query;
  console.log("router id: ", id);
  console.log("router: ", router);

  const [searchQuery, setSearchQuery] = useState("");

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

  const data2 = [
    {
      number: 1002,
      name: "이거 오류남",
      writer: "김성우",
      date: "22.11.07",
      status: "답변완료",
    },
    {
      number: 1003,
      name: "이거 안됨",
      writer: "김동겸",
      date: "22.11.08",
      status: "답변대기중",
    },
    {
      number: 1003,
      name: "이거 안됨",
      writer: "김동겸",
      date: "22.11.08",
      status: "답변대기중",
    },
    {
      number: 1003,
      name: "이거 안됨",
      writer: "김동겸",
      date: "22.11.08",
      status: "답변대기중",
    },
    {
      number: 1003,
      name: "이거 안됨",
      writer: "김동겸",
      date: "22.11.08",
      status: "답변대기중",
    },
    {
      number: 1003,
      name: "이거 안됨",
      writer: "김동겸",
      date: "22.11.08",
      status: "답변대기중",
    },
  ];

  return (
    <div>
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
                    <Link href="/QnA" legacyBehavior>
                      <a>
                        <h2 className="pl-1 text-lg text-white ">질의응답</h2>
                      </a>
                    </Link>
                  </div>
                  <div className="h-9 w-2/3 border-b-2 border-solid border-gray-300">
                    <Link href="/FnA" legacyBehavior>
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
                        {data2.map((data, index) => {
                          return (
                            <tr className="border-b-2 border-solid" key={index}>
                              <td className="p-2 text-xl font-normal">
                                {data.number}
                              </td>
                              <td className="w-2/4 p-2 text-xl font-normal">
                                <Link href="#" legacyBehavior>
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
                      <li className="p-2">
                        <Link href="#" legacyBehavior>
                          <a className="text-lg">1</a>
                        </Link>
                      </li>
                      <li className="p-2">
                        <Link href="#" legacyBehavior>
                          <a className="text-lg">2</a>
                        </Link>
                      </li>
                      <li className="p-2">
                        <Link href="#" legacyBehavior>
                          <a className="text-lg">3</a>
                        </Link>
                      </li>
                      <li className="p-2">
                        <Link href="#" legacyBehavior>
                          <a className="text-lg">4</a>
                        </Link>
                      </li>
                      <li className="p-2">
                        <Link href="#" legacyBehavior>
                          <a className="text-lg">5</a>
                        </Link>
                      </li>
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

// limit: 한페이지에 보여줄 데이터 수
// offset: 데이터가 시작하는 위치(index)
// page: 현재 페이지 번호
// parameter=value 로 필요한 파라미터의 값을 적음
// 파라미터가 여러개일 경우 & 를 붙여서 여러개의 파라미터를 넘김
