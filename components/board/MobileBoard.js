import Pagination from "../Pagination";
import usePagination from "../../hooks/usePagination";
import useInput from "../../hooks/useInput";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import data2 from "../testData2";
import { BiLockAlt } from "react-icons/bi";

const MAX_PAGE = 17;

export default function MobileBoard({ boardname }) {
  const router = useRouter();
  const search = useInput("", "검색어를 입력하세요");
  const paginationProps = usePagination(MAX_PAGE);
  const postsPerPage = 6; // 한 페이지에 게시물 6개씩 보여줌
  const indexOfLast = paginationProps.currentPage * postsPerPage; // 현 페이지 마지막 게시물의 인덱스 번호
  const indexOfFirst = indexOfLast - postsPerPage; // 현 페이지 첫번째 게시물의 인덱스 번호

  const arr = [1, 2, 3, 4, 5, 6];

  /**
   * @description 검색창 돋보기 아이콘 클릭시 검색 실행 해주는 onClick 함수
   */
  const searching = () => {
    console.log("search clicked");
  };

  const clickPost = () => {
    console.log("post cliked");
  };

  const currentPosts = (posts) => {
    let currentPosts = [];
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  return (
    <div className="block md:hidden">
      <div className="relative flex border-b-2 border-solid border-gray-300 focus:outline-none">
        <input {...search} className="focus: w-full border-black p-2" />
        <div
          onClick={searching}
          className="absolute right-1 top-1 mr-2 flex items-center"
        >
          <FiSearch size={35} color={"#E0E0E0"} />
        </div>
      </div>
      {/* 게시물 컨테이너 */}
      <div className="w-full">
        {currentPosts(data2).map((data, index) => {
          return (
            <div key={index}>
              {/* 게시물 */}
              <div
                className="flex h-24 w-full border-b-2 border-solid border-gray-300"
                onClick={clickPost}
              >
                {/* 게시물 번호 */}
                <div className="flex w-1/5 items-center justify-center">
                  <span>{data.number}</span>
                </div>
                <div className="flex w-4/5 flex-col">
                  {/* 제목위 세부사항들 */}
                  <div className="flex w-3/5 justify-between p-1">
                    <span className="text-xs text-gray-300">{data.status}</span>
                    <span className="text-xs text-gray-300">{data.date}</span>
                    <span className="text-xs text-gray-300">{data.writer}</span>
                  </div>
                  {/* 제목 */}
                  <div className="flex items-center">
                    <span className="pt-2.5 text-lg">{data.name}</span>
                    <BiLockAlt className="mt-3 pl-1" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* 페이지네이션 & 글쓰기버튼 */}
      <div className="flex justify-between">
        <div className="pl-2">
          <Pagination {...paginationProps} maxPage={MAX_PAGE} />
        </div>
        <div className="mt-6 pr-2">
          <button className="rounded bg-sky-600 p-1 text-center  text-lg text-white">
            글쓰기
          </button>
        </div>
      </div>
    </div>
  );
}
