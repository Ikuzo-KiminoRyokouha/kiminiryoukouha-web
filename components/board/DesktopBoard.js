import { useRouter } from "next/router";
import usePagination from "../../hooks/usePagination";
import useInput from "../../hooks/useInput";
import Pagination from "../Pagination";
import { useState } from "react";
import { getSearch } from "../../utils/fetchFn/query/board";
import { useQuery } from "@tanstack/react-query";
import BoardPosts from "./BoardPosts";

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
  const postsPerPage = 6; // 한 페이지에 게시물 6개씩 보여줌
  const indexOfLast = paginationProps.currentPage * postsPerPage; // 현 페이지 마지막 게시물의 인덱스 번호
  const indexOfFirst = indexOfLast - postsPerPage; // 현 페이지 첫번째 게시물의 인덱스 번호
  const { secret, setSecret } = useState(0); // 비밀글인지 아닌지 0 - 비밀글 1- 전체공개
  // const [data, setData] = useState(POSTS);
  const [searchText, setSearchText] = useState("");

  const status = "답변완료";

  /**
   * @description 현재페이지 게시물들 반환해주는 함수
   * @param {any[]} arr
   * @returns 배열
   */
  const currentPosts = (posts) => {
    let currentPosts = [];
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  /**
   * @description 검색버튼 onClick 함수
   */
  const searchBtn = () => {
    setSearchText(search.value);

    router.push({
      pathname: `${pathname}/search`,
      query: { search: search.value },
    });
  };

  return (
    <div className="hidden w-3/4 md:block">
      <div className="flex h-32 w-full justify-between bg-white">
        <h1 className="mt-8 text-3xl">
          {boardname === "QnA" ? "질의응답" : "자주묻는질문"} 게시판
        </h1>
        <div className="flex items-end">
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
        </div>
      </div>
      {/* 게시판 테이블 */}
      <div className="h-full w-full">
        <div className="w-full border-2 border-solid">
          <table className="w-full text-center">
            <thead className="bg-gray-300 text-center">
              <tr>
                <th className="p-2 text-xl font-normal">
                  <span>게시물번호</span>
                </th>
                <th className="w-2/4 p-2 text-xl font-normal">제목</th>
                <th className="p-2 text-xl font-normal">작성자</th>
                <th className="p-2 text-xl font-normal">날짜</th>
                <th className="p-2 text-xl font-normal">답변상태</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* 게시판 테이블 내 게시물들 */}
              {router.pathname === "/QnA/search" ? (
                <BoardPosts
                  datas={searchData.boards || []}
                  boardname={boardname}
                />
              ) : (
                <BoardPosts datas={POSTS} boardname={boardname} />
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end pt-3">
          <button
            className="rounded bg-sky-600 p-3 text-white"
            onClick={() => router.push(`/${boardname}/write`)}
          >
            글쓰기
          </button>
        </div>
        {router.pathname === "/QnA/search" ? (
          <Pagination
            {...usePagination(searchData.pages, pathname)}
            maxPage={searchData.pages}
            pathname={pathname}
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
