import Pagination from "../Pagination";
import usePagination from "../../hooks/usePagination";
import useInput from "../../hooks/useInput";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import { BiLockAlt } from "react-icons/bi";
import MobileBoardPosts from "./MobileBoardPosts";
import { getUser } from "../../utils/client";

/**
 * @param boardname 어느 게시판인지 ex) QnA게시판인지 FnA게시판인지
 * @param POSTS 서버에서 받아온 게시물 데이터
 * @param MAX_PAGE 서버에서 받아온 전체 페이지 수
 * @param pathname pathname
 * @param searchData 검색시 검색한 게시물 데이터
 */
export default function MobileBoard({
  boardname,
  POSTS,
  MAX_PAGE,
  pathname,
  searchData,
}) {
  const router = useRouter();
  const search = useInput("", "검색어를 입력하세요");
  const paginationProps = usePagination(MAX_PAGE, pathname);

  /**
   * @description 검색창 돋보기 아이콘 클릭시 검색 실행 해주는 onClick 함수
   */
  const searching = (data) => {
    router.push({
      pathname: `/${boardname}/view/${data.id}`,
    });
  };

  return (
    <div className="absolute mt-9 flex h-full w-full flex-col md:hidden">
      <form
        className="relative flex border-b-2 border-solid border-gray-300 focus:outline-none"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input {...search} className="focus: w-full border-black p-2" />
        <div
          onClick={searching}
          className="absolute right-1 top-1 mr-2 flex items-center"
        >
          <FiSearch size={35} color={"#E0E0E0"} />
        </div>
      </form>
      {/* 게시물 컨테이너 */}
      <div className="max-h-full w-full flex-1 overflow-scroll">
        {router.pathname === "/QnA/search" ? (
          <MobileBoardPosts
            datas={searchData.searchData.boards || []}
            boardname={boardname}
          />
        ) : (
          <MobileBoardPosts datas={POSTS || []} boardname={boardname} />
        )}
      </div>
      {/* 페이지네이션 & 글쓰기버튼 */}
      <div className="mb-9 flex w-full justify-between p-2">
        <div className="pl-2">
          {router.pathname === "/QnA/search" ? (
            <Pagination
              {...usePagination(searchData.searchData.pages, pathname)}
              maxPage={searchData.searchData.pages}
              pathname={`${pathname}/search`}
            />
          ) : (
            <Pagination
              {...paginationProps}
              maxPage={MAX_PAGE}
              pathname={pathname}
            />
          )}
        </div>
        <div
          className="mt-6 pr-2"
          onClick={() => {
            if (getUser()) {
              router.push({
                pathname: `${pathname}/write`,
              });
            } else {
              router.push("/login");
            }
          }}
        >
          <button className="rounded bg-sky-600 p-1 text-center  text-lg text-white">
            글쓰기
          </button>
        </div>
      </div>
    </div>
  );
}
