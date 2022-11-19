import Link from "next/link";
import { useRouter } from "next/router";
import usePagination from "../../hooks/usePagination";
import useInput from "../../hooks/useInput";
import Pagination from "../Pagination";
import data2 from "../testData2";
import { useState } from "react";
import { BiLockAlt } from "react-icons/bi";

export default function DesktopBoard({ boardname, POSTS, MAX_PAGE }) {
  const router = useRouter();
  const search = useInput("", "검색어를 입력하세요");
  const paginationProps = usePagination(MAX_PAGE);
  const postsPerPage = 10; // 한 페이지에 게시물 6개씩 보여줌
  const indexOfLast = paginationProps.currentPage * postsPerPage; // 현 페이지 마지막 게시물의 인덱스 번호
  const indexOfFirst = indexOfLast - postsPerPage; // 현 페이지 첫번째 게시물의 인덱스 번호
  const { secret, setSecret } = useState(0); // 비밀글인지 아닌지 0 - 비밀글 1- 전체공개

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
  const searchBtn = () => {};

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
              {/* {POSTS.map((data, index) => {
                return (
                  <tr className="border-b-2 border-solid" key={index}>
                    <td className="p-2 text-xl font-normal">{data.id}</td>
                    <td className="w-2/4 p-2 text-xl font-normal">
                      <Link
                        href={{
                          pathname: `/${boardname}/view`,
                          query: { id: `${data.id}` },
                        }}
                        legacyBehavior
                      >
                        <a>
                          <span className="flex items-center">
                            <span>{data.title}</span>
                            <BiLockAlt className="mt-1 pl-1" />
                          </span>
                        </a>
                      </Link>
                    </td>
                    <td className="break-keep p-2 text-xl font-normal">
                      {data.user_id}
                    </td>
                    <td className="p-2 text-xl font-normal">
                      {data.created_at}
                    </td>
                    <td className="p-2 text-xl font-normal">{status}</td>
                  </tr>
                );
              })} */}
              {currentPosts(data2).map((data, index) => {
                if (data.secret === 0) {
                  return (
                    <tr className="border-b-2 border-solid" key={index}>
                      <td className="p-2 text-xl font-normal">{data.number}</td>
                      <td className="w-2/4 p-2 text-xl font-normal">
                        <Link
                          href={{
                            pathname: `/${boardname}/view`,
                            query: { id: `${data.number}` },
                          }}
                          legacyBehavior
                        >
                          <a>
                            <span className="flex items-center">
                              <span>{data.name}</span>
                              <BiLockAlt className="mt-1 pl-1" />
                            </span>
                          </a>
                        </Link>
                      </td>
                      <td className="break-keep p-2 text-xl font-normal">
                        {data.writer}
                      </td>
                      <td className="p-2 text-xl font-normal">{data.date}</td>
                      <td className="p-2 text-xl font-normal">{data.status}</td>
                    </tr>
                  );
                }
                return (
                  <tr className="border-b-2 border-solid" key={index}>
                    <td className="p-2 text-xl font-normal">{data.number}</td>
                    <td className="w-2/4 p-2 text-xl font-normal">
                      <Link
                        href={{
                          pathname: `/${boardname}/view`,
                          query: { id: `${data.number}` },
                        }}
                        legacyBehavior
                      >
                        <a className="hover:underline">{data.name}</a>
                      </Link>
                    </td>
                    <td className="break-keep p-2 text-xl font-normal">
                      {data.writer}
                    </td>
                    <td className="p-2 text-xl font-normal">{data.date}</td>
                    <td className="p-2 text-xl font-normal">{data.status}</td>
                  </tr>
                );
              })}
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
        <Pagination {...paginationProps} maxPage={MAX_PAGE} />
      </div>
    </div>
  );
}
