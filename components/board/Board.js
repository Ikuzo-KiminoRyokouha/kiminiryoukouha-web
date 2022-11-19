import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { DesktopBoard, MobileBoard } from "./index";
import { getPosts } from "../../utils/fetchFn/query/board";
import { useEffect } from "react";

export default function BoardUI({ boardname }) {
  const defaultPage = 1;

  const { data, isLoading, error } = useQuery(
    ["getPosts", defaultPage],
    getPosts
  );

  // console.log(JSON.stringify({ data }));
  // const POSTS = { data }.data.data.boards;
  // const MAX_PAGE = { data }.data.data.pages;
  const POSTS = "";
  const MAX_PAGE = "";
  // console.log({ data }.data.data);

  return (
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
                      <Link href={`/QnA?page=${defaultPage}`} legacyBehavior>
                        <a>
                          <h2 className="pl-2 text-lg text-white md:pl-1">
                            질의응답
                          </h2>
                        </a>
                      </Link>
                    </div>
                    <div className="h-9 flex-1 border-b-2 border-solid border-gray-300 md:w-2/3 md:flex-none">
                      <Link href={`/FnA?page=${defaultPage}`} legacyBehavior>
                        <a>
                          <h2 className="pl-2 text-lg md:pl-1">자주묻는질문</h2>
                        </a>
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
            <DesktopBoard
              boardname={boardname}
              POSTS={POSTS}
              MAX_PAGE={MAX_PAGE}
            />
            <MobileBoard boardname={boardname} />
          </div>
        </div>
      </div>
    </div>
  );
}
