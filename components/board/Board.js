import { DesktopBoard, MobileBoard } from "./index";
import { useRouter } from "next/router";
import { useMemo } from "react";
import BoardNav from "./BoardNav";
import BoardImage from "./BoardImage";

/**
 * @param searchData 게시판에서 검색했을시의 데이터 선택적 파라미터
 */
export default function BoardUI({ posts, ...searchData }) {
  const router = useRouter();

  const pathname = useMemo(() => {
    if (router.pathname.endsWith("search")) {
      return router.pathname.replace("/search", "");
    }
    return router.pathname;
  }, [router.pathname]);

  return (
    <div className="relative mb-[53px] flex h-full w-full flex-1 flex-col items-center md:mb-0">
      <div className="absolute flex h-full w-full max-w-7xl flex-col">
        {/* 배경사진 */}
        <BoardImage />
        <div className="relative flex h-full max-h-full w-full flex-col md:flex-row">
          {/* 사진 밑 게시판 네비 박스 */}
          <BoardNav />
          {/* 게시판 박스 */}
          <DesktopBoard
            POSTS={posts?.boards || []}
            MAX_PAGE={posts?.pages || 0}
            pathname={pathname}
            searchData={searchData}
          />
          <MobileBoard
            POSTS={posts?.boards || []}
            MAX_PAGE={posts?.pages || 0}
            pathname={pathname}
            searchData={searchData}
          />
        </div>
      </div>
    </div>
  );
}
