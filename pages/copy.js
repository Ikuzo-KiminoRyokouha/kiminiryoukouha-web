import Head from "next/head";
import Header from "../components/layout/Header";
import ChatBotButton from "../components/layout/ChatBotButton";
import Image from "next/image";
import Link from "next/link";

export default function QnA() {
  const data = {
    number: 1002,
    name: "이거 오류남",
    writer: "김성우",
    date: "22.11.07",
    status: "답변완료",
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
        {/* <div
          className="z-100 fixed bottom-10 right-8 flex h-12 w-12
       items-center justify-center rounded-full bg-blue-600 text-4xl
       text-white drop-shadow-lg duration-300 hover:animate-bounce hover:bg-blue-700 hover:drop-shadow-2xl"
        >
          <ChatBotButton />
        </div> */}
        <div className="max-w-8xl mx-auto">
          <div className="relative h-72">
            <Image src={"/assets/QnA-bg.png"} layout={"fill"} />
            {/* inset :0 position: absolute */}
          </div>
          <div className="h-screen w-full">
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
              <div className="w-3/4 bg-green-200">
                <div className="flex h-32 w-full justify-between bg-white">
                  <h1 className="mt-8 text-3xl">질의응답 게시판</h1>
                  <div className="flex items-end">
                    <div className="pb-3 ">
                      <input
                        className="mr-3 rounded-sm border-2 border-solid border-gray-300 p-2"
                        placeholder="검색어를 입력하세요"
                      />
                      <button className="rounded border-2 border-solid border-sky-600 bg-sky-600 p-3 text-white">
                        검색
                      </button>
                    </div>
                  </div>
                </div>
                <div className="h-full w-full">
                  <div className="h-3/4 w-full border-2 border-solid bg-pink-200">
                    <div className="max-h-max w-full">
                      <div className="flex justify-between bg-gray-400 p-2">
                        <h2 className="text-xl">게시물번호</h2>
                        <h2 className="text-xl"></h2>
                        <h2 className="text-xl">제목</h2>
                        <h2 className="text-xl"></h2>
                        <h2 className="text-xl">작성자</h2>
                        <h2 className="text-xl">날짜</h2>
                        <h2 className="text-xl">답변상태</h2>
                      </div>
                    </div>
                    {data2.map((data, index) => {
                      return (
                        <div
                          className="max-h-max w-full border-b-2 border-solid"
                          key={index}
                        >
                          <div className="flex justify-between p-2">
                            <h2 className="text-xl">{data.number}</h2>
                            <h2 className="text-xl"></h2>
                            <h2 className="text-xl">{data.name}</h2>
                            <h2 className="text-xl"></h2>
                            <h2 className="text-xl">{data.writer}</h2>
                            <h2 className="text-xl">{data.date}</h2>
                            <h2 className="text-xl">{data.status}</h2>
                          </div>
                        </div>
                      );
                    })}
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
