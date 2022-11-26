import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { DesktopBoard, MobileBoard } from "./index";
import { getBoardPosts } from "../../utils/fetchFn/query/board";
import { useRouter } from "next/router";
import { useMemo } from "react";

/**
 * @param boardname 어느 게시판인지 ex) QnA게시판인지 FnA게시판인지
 * @param searchData 게시판에서 검색했을시의 데이터 선택적 파라미터
 */
export default function BoardUI({ boardname, ...searchData }) {
  const router = useRouter();

  const boardCurrentPage = useMemo(
    () => router.query.page || 1,
    [router.query.page]
  );

  const pathname = useMemo(() => {
    if (router.pathname.endsWith("search")) {
      return router.pathname.replace("/search", "");
    }
    return router.pathname;
  }, [router.pathname]);

  const { data, isLoading, error } = useQuery(
    ["getPosts", boardCurrentPage],
    getBoardPosts
  );

  return (
    <div className="relative mb-[53px] flex h-full w-full flex-1 flex-col items-center md:mb-0">
      <div className="absolute flex h-full w-full max-w-7xl flex-col ">
        {/* 이미지 박스 */}
        <div className="relative hidden h-72 md:block">
          <Image src={"/assets/QnA-bg.png"} layout={"fill"} />
          {/* inset :0 position: absolute */}
        </div>
        <div className="flex-1">
          <div className="relative flex h-full max-h-full w-full flex-col md:flex-row">
            {/* 사진 밑 게시판 네비 박스 */}
            <nav className=" w-full md:flex md:w-1/4">
              <div className="flex w-full flex-row items-center md:flex-col">
                {boardname === "QnA" ? (
                  <>
                    <div className=" h-9 flex-1 border-b-2 border-solid border-gray-300 bg-sky-600 md:mt-10 md:w-2/3 md:flex-none">
                      <Link href={`/QnA?page=1`} legacyBehavior>
                        <a>
                          <h2 className="pl-2 text-lg text-white md:pl-1">
                            질의응답
                          </h2>
                        </a>
                      </Link>
                    </div>
                    <div className="h-9 flex-1 border-b-2 border-solid border-gray-300 md:w-2/3 md:flex-none">
                      <Link href={`/FnA?page=1`} legacyBehavior>
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
              POSTS={data?.data.boards || []}
              MAX_PAGE={data?.data.pages || 0}
              pathname={pathname}
              searchData={searchData}
            />
            <MobileBoard
              boardname={boardname}
              POSTS={data?.data.boards || []}
              MAX_PAGE={data?.data.pages || 0}
              pathname={pathname}
              searchData={searchData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
