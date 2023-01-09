import { useRouter } from "next/router";
import usePagination from "../../hooks/usePagination";
import useInput from "../../hooks/useInput";
import Pagination from "../Pagination";
import DesktopBoardPosts from "./DesktopBoardPosts";
import { getUser } from "../../utils/client";

/**
 * @param POSTS 서버에서 받아온 게시물 데이터
 * @param MAX_PAGE 서버에서 받아온 전체 페이지 수
 * @param pathname pathname
 * @param searchData 검색시 검색한 게시물 데이터
 */
export default function DesktopBoard({
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

  /**
   * @description 글쓰기 버튼 onClick 함수 로그인시에만 가능
   */
  const onWrite = () => {
    getUser() ? router.push(`/QnA/write`) : router.push(`/login`);
  };

  return (
    <div className="hidden w-4/5 md:block">
      {/* 게시판 박스 */}
      <div className="flex h-32 w-full justify-between bg-white">
        <h1 className="mt-8 text-3xl">질의응답 게시판</h1>
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
      {/* 검색된 게시물 없을시 */}
      {searchData?.searchData?.page == -1 ? (
        <div>
          <div className="flex h-56 items-center justify-center">
            <h1 className="text-xl">검색된 게시물이 없습니다.</h1>
          </div>
          <div className="flex justify-end pt-3">
            <button
              className="rounded bg-sky-600 p-3 text-white"
              onClick={onWrite}
            >
              글쓰기
            </button>
          </div>
        </div>
      ) : (
        // 게시판 테이블
        <div>
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
                  />
                ) : (
                  <DesktopBoardPosts datas={POSTS} />
                )}
              </tbody>
            </table>
          </div>
          {/* 글쓰기 버튼 */}
          <div className="flex justify-end pt-3">
            <button
              className="rounded bg-sky-600 p-3 text-white"
              onClick={onWrite}
            >
              글쓰기
            </button>
          </div>
          {/* 페이지네이션 */}
          {router.pathname === "/QnA/search" ? (
            <Pagination
              {...usePagination(
                searchData.searchData.pages,
                `${router.pathname}`
              )}
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
      )}
    </div>
  );
}
