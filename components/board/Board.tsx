import { DesktopBoard, MobileBoard } from "./index";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { BoardPosts } from "@/types/boardPosts.interface";
import Image from "next/image";

interface Props {
  posts?: BoardPosts;
  searchData?: BoardPosts;
}

/**
 * @param searchData 게시판에서 검색했을시의 데이터 선택적 파라미터
 */
export default function BoardUI({ posts, searchData }: Props) {
  const router = useRouter();

  const pathname = useMemo(() => {
    if (router.pathname.endsWith("search")) {
      return router.pathname.replace("/search", "");
    }
    return router.pathname;
  }, [router.pathname]);

  return (
    <div className="relative flex h-full min-h-screen w-full flex-1 flex-col items-center md:mb-0">
      <div className="flex h-full w-full max-w-7xl flex-col">
        {/* 배경사진 */}
        <div className="relative hidden h-72 w-full md:block">
          <Image src={"/assets/QnA-bg.png"} layout={"fill"} loading="lazy" />
        </div>
        <div className="relative flex h-full max-h-full w-full flex-col md:flex-row">
          {/* 사진 밑 게시판 네비 박스 */}
          <nav className=" w-full md:flex md:w-1/4">
            <div className="flex w-full flex-row md:flex-col">
              <div className="h-9 w-full bg-sky-600 md:mt-9 md:w-2/3 md:flex-none">
                <h2 className="pl-2 pt-1 text-lg text-white md:pl-1">
                  質疑応答
                </h2>
              </div>
            </div>
          </nav>
          {/* 게시판 박스 */}
          <DesktopBoard
            posts={posts?.boards || []}
            maxPage={posts?.pages || 0}
            pathname={pathname}
            searchData={searchData}
          />
          <MobileBoard
            posts={posts?.boards || []}
            maxPage={posts?.pages || 0}
            pathname={pathname}
            searchData={searchData}
          />
        </div>
      </div>
    </div>
  );
}
