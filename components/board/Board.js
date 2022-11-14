import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { DesktopBoard, MobileBoard } from "./index";

export default function BoardUI({ boardname }) {
  return (
    <div>
      <Head>
        <title>{boardname}</title>
        <meta
          name="description"
          content={`너의 여행은의 ${
            boardname === "QnA" ? "질의응답" : "자주묻는질문"
          } 게시판 입니다.`}
        />
      </Head>
      <div>
        <div className="mx-auto max-w-7xl">
          {/* 이미지 박스 */}
          <div className="relative hidden h-72 md:block">
            <Image src={"/assets/QnA-bg.png"} layout={"fill"} />
            {/* inset :0 position: absolute */}
          </div>
          <div className="h-full w-full">
            <div className="flex h-full w-full flex-col md:flex-row">
              {/* 사진 밑 게시판 네비 박스 */}
              <nav className=" w-full md:flex md:w-1/4">
                <div className="flex w-full flex-row items-center md:flex-col">
                  {boardname === "QnA" ? (
                    <>
                      <div className="h-9 flex-1 border-b-2 border-solid border-gray-300 bg-sky-600 md:mt-10 md:w-2/3 md:flex-none">
                        <Link href={`/QnA?page=1`}>
                          <h2 className="pl-2 text-lg text-white md:pl-1">
                            질의응답
                          </h2>
                        </Link>
                      </div>
                      <div className="h-9 flex-1 border-b-2 border-solid border-gray-300 md:w-2/3 md:flex-none">
                        <Link href="/FnA?page=1">
                          <h2 className="pl-2 text-lg md:pl-1">자주묻는질문</h2>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-9 flex-1 border-b-2 border-solid border-gray-300 md:mt-10 md:w-2/3 md:flex-none">
                        <Link href={"/QnA?page=1"} legacyBehavior>
                          <a>
                            <h2 className="pl-1 text-lg">질의응답</h2>
                          </a>
                        </Link>
                      </div>
                      <div className="h-9 flex-1 border-b-2 border-solid border-gray-300 bg-sky-600 md:w-2/3 md:flex-none">
                        <Link href="/FnA?page=1" legacyBehavior>
                          <a>
                            <h2 className="pl-1 text-lg text-white">
                              자주묻는질문
                            </h2>
                          </a>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </nav>
              {/* 게시판 박스 */}
              <DesktopBoard boardname={boardname} />
              <MobileBoard boardname={boardname} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
