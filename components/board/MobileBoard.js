import Pagination from "../Pagination";
import usePagination from "../../hooks/usePagination";
import useInput from "../../hooks/useInput";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";

const MAX_PAGE = 17;

export default function MobileBoard() {
  const router = useRouter();
  const search = useInput("", "검색어를 입력하세요");
  const paginationProps = usePagination(MAX_PAGE);
  const postsPerPage = 6; // 한 페이지에 게시물 6개씩 보여줌
  const indexOfLast = paginationProps.currentPage * postsPerPage; // 현 페이지 마지막 게시물의 인덱스 번호
  const indexOfFirst = indexOfLast - postsPerPage; // 현 페이지 첫번째 게시물의 인덱스 번호

  /**
   * @description 검색창 돋보기 아이콘 클릭시 검색 실행 해주는 onClick 함수
   */
  const searching = () => {
    console.log("search clicked");
  };

  return (
    <div className="block md:hidden">
      <div className="flex border-b-2 border-solid border-gray-300 focus:outline-none">
        <input {...search} className="focus: w-full border-black p-2" />
        <div onClick={searching} className="mr-2 flex items-center">
          <FiSearch size={35} color={"#E0E0E0"} />
        </div>
      </div>
      {/* 게시물 */}
      <div className="w-full">
        {/* 이거반복 */}
        <div className="flex h-24 w-full bg-sky-200">
          {/* 게시물 번호 */}
          <div className="w-1/5 bg-pink-200 text-center">1002</div>
          <div className="flex w-4/5 flex-col bg-lime-200">
            {/* 제목위 세부사항들 */}
            <div className="flex w-3/5 justify-between p-1">
              <span className="text-xs text-gray-300">답변완료</span>
              <span className="text-xs text-gray-300">22.11.07</span>
              <span className="text-xs text-gray-300">김성우</span>
            </div>
            {/* 제목 */}
            <div>
              <span>이거 오류남 수정바람 응애</span>
            </div>
          </div>
        </div>
      </div>
      {/* 페이지네이션 & 글쓰기버튼 */}
      <div className="flex justify-between">
        <Pagination {...paginationProps} maxPage={MAX_PAGE} />
        <button className="mt-5 rounded bg-sky-600 pr-2 text-center text-white">
          글쓰기
        </button>
      </div>
    </div>
  );
}

// 모바일에서input focus되면 border 컬러 노란색 고정?
