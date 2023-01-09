import { useMemo } from "react";
import { useRouter } from "../node_modules/next/router";

/**
 * @description Pagination 컴포넌트의 비지니스 로직입니다.
 * @param totalPages 페이지 네이션 컴포넌트에서 사용할 전체 페이지의 갯수
 */
export default function usePagination(
  totalPages: number,
  pathname: string,
  search: string
) {
  const router = useRouter();

  const currentPage = parseInt(router.query?.page as string);

  /**
   * @description 페이지네이션 왼쪽버튼 onClick 함수
   */
  const moveToPrev = () => {
    if (currentPage > 1) {
      if (router.pathname === `/QnA/search`) {
        router.push({
          pathname: `${router.pathname}`,
          query: { search: router.query?.search, page: currentPage - 1 },
        });
      } else {
        router.push({
          pathname: `${router.pathname}`,
          query: { page: currentPage - 1 },
        });
      }
    }
  };

  /**
   * @description 페이지네이션 오른쪽버튼 onClick 함수
   */
  const moveToNext = () => {
    if (currentPage < totalPages) {
      if (router.pathname === `/QnA/search`) {
        router.push({
          pathname: `${router.pathname}`,
          query: { search: router.query?.search, page: currentPage + 1 },
        });
      } else {
        router.push({
          pathname: `${router.pathname}`,
          query: { page: currentPage + 1 },
        });
      }
    }
  };

  return { currentPage, moveToNext, moveToPrev };
}
