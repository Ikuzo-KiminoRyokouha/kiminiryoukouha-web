import { useRouter } from "next/router";
import usePagination from "../../hooks/usePagination";
import useInput from "../../hooks/useInput";
import Pagination from "../Pagination";
import DesktopBoardPosts from "./DesktopBoardPosts";

/**
 * @param boardname 어느 게시판인지 ex) QnA게시판인지 FnA게시판인지
 * @param POSTS 서버에서 받아온 게시물 데이터
 * @param MAX_PAGE 서버에서 받아온 전체 페이지 수
 * @param pathname pathname
 * @param searchData 검색시 검색한 게시물 데이터
 */
export default function DesktopBoard({
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
   * @description 검색버튼 onClick 함수
   */
  const searchBtn = () => {
    router.push({
      pathname: `${pathname}/search`,
      query: { search: search.value, page: 1 },
    });
  };

  return (
    <div className="hidden w-3/4 md:block">
      {/* 게시판 박스 */}
      <div className="flex h-32 w-full justify-between bg-white">
        <h1 className="mt-8 text-3xl">
          {boardname === "QnA" ? "질의응답" : "자주묻는질문"} 게시판
        </h1>
        {/* 검색창 */}
        <form
          className="flex items-end"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="pb-3 ">
            <input
              className="mr-3 rounded-sm border-2 border-solid border-gray-300 p-2"
              {...search}
            />
            <button
              className="rounded border-2 border-solid border-sky-600 bg-sky-600 p-3 text-white"
              onClick={searchBtn}
            >
              검색
            </button>
          </div>
        </form>
      </div>
      {/* 게시판 테이블 */}
      <div className="h-full w-full">
        <div className="w-full border-2 border-solid">
          <table className="w-full text-center">
            <thead className="bg-gray-300 text-center">
              <tr>
                <th className="whitespace-nowrap p-2 text-xl font-normal">
                  <span>게시물번호</span>
                </th>
                <th className="w-2/4 whitespace-nowrap p-2 text-xl font-normal">
                  제목
                </th>
                <th className="whitespace-nowrap p-2 text-xl font-normal">
                  작성자
                </th>
                <th className="whitespace-nowrap p-2 text-xl font-normal">
                  날짜
                </th>
                <th className="whitespace-nowrap p-2 text-xl font-normal">
                  답변상태
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* 게시판 테이블 내 게시물들 */}
              {router.pathname === "/QnA/search" ? (
                <DesktopBoardPosts
                  datas={searchData.searchData.boards || []}
                  boardname={boardname}
                />
              ) : (
                <DesktopBoardPosts datas={POSTS} boardname={boardname} />
              )}
            </tbody>
          </table>
        </div>
        {/* 글쓰기 버튼 */}
        <div className="flex justify-end pt-3">
          <button
            className="rounded bg-sky-600 p-3 text-white"
            onClick={() => router.push(`/${boardname}/write`)}
          >
            글쓰기
          </button>
        </div>
        {/* 페이지네이션 */}
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
    </div>
  );
}
