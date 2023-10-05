import { useRouter } from "next/router";
import usePagination from "../../hooks/usePagination";
import useInput from "../../hooks/useInput";
import Pagination from "../Pagination";
import DesktopBoardPosts from "./DesktopBoardPosts";
import { getUser } from "../../utils/client";
import SearchNotFound from "./SearchNotFound";
import { BoardPosts, Boards } from "@/types/boardPosts.interface";

interface Props {
  posts: Boards[];
  maxPage: number;
  pathname: string;
  searchData: BoardPosts;
}

/**
 * @param posts 서버에서 받아온 게시물 데이터
 * @param maxPage 서버에서 받아온 전체 페이지 수
 * @param pathname pathname
 * @param searchData 검색시 검색한 게시물 데이터
 */
export default function DesktopBoard({
  posts,
  maxPage,
  pathname,
  searchData,
}: Props) {
  const router = useRouter();
  const search = useInput("", "検索");
  const paginationProps = usePagination(maxPage, pathname);

  const onClick = {
    // 검색버튼 onClick 함수
    searchBtn: () => {
      router.push({
        pathname: `${pathname}/search`,
        query: { search: search.value, page: 1 },
      });
    },
    //글쓰기 버튼 onClick 함수 로그인시에만 가능
    onWrite: () => {
      getUser() ? router.push(`/QnA/write`) : router.push(`/login`);
    },
  };

  return (
    <div className="hidden w-4/5 md:block">
      {/* 게시판 박스 */}
      <div className="flex h-32 w-full justify-between bg-white">
        <h1 className="mt-8 text-3xl">質疑応答掲示板</h1>
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
              onClick={(e) => {
                onClick.searchBtn();
                e.preventDefault();
              }}
            >
              検索
            </button>
          </div>
        </form>
      </div>
      {/* 검색된 게시물 없을시 */}
      {searchData?.pages == -1 ? (
        <SearchNotFound onWrite={onClick.onWrite} />
      ) : (
        // 게시판 테이블
        <div>
          <div className="w-full border-2 border-solid">
            <table className="w-full text-center">
              <thead className="bg-gray-300 text-center">
                <tr>
                  <th className="whitespace-nowrap p-2 text-xl font-normal">
                    <span>投稿番号</span>
                  </th>
                  <th className="w-2/4 whitespace-nowrap p-2 text-xl font-normal">
                    タイトル
                  </th>
                  <th className="whitespace-nowrap p-2 text-xl font-normal">
                    作成者
                  </th>
                  <th className="whitespace-nowrap p-2 text-xl font-normal">
                    日付
                  </th>
                  <th className="whitespace-nowrap p-2 text-xl font-normal">
                    回答状況
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {/* 게시판 테이블 내 게시물들 */}
                {router.pathname === "/QnA/search" ? (
                  <DesktopBoardPosts posts={searchData.boards || []} />
                ) : (
                  <DesktopBoardPosts posts={posts} />
                )}
              </tbody>
            </table>
          </div>
          {/* 글쓰기 버튼 */}
          <div className="flex justify-end pt-3">
            <button
              className="rounded bg-sky-600 p-3 text-white"
              onClick={onClick.onWrite}
            >
              投稿
            </button>
          </div>
          {/* 페이지네이션 */}
          {router.pathname === "/QnA/search" ? (
            <Pagination
              {...usePagination(searchData.pages, `${router.pathname}`)}
              maxPage={searchData.pages}
              pathname={`${pathname}/search`}
            />
          ) : (
            <Pagination
              {...paginationProps}
              maxPage={maxPage}
              pathname={pathname}
            />
          )}
        </div>
      )}
    </div>
  );
}
