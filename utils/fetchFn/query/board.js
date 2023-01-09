import mainRequest from "../../request/mainRequest";

/**
 * @description /api/board/all/페이지
 * @param {Array} queryKey
 */
export const getBoardPosts = (context) => {
  return mainRequest.get(`/api/board/all/${context.queryKey[1]}`);
};

/**
 * @description /api/board/게시물번호
 */
export const getBoardPost = ({ queryKey }) => {
  return mainRequest.get(`/api/board/${queryKey[1]}`);
};

/**
 * @description /api/comment/게시물번호/댓글페이지
 */
export const getComment = ({ queryKey }) => {
  return mainRequest.get(`/api/comment/${queryKey[1]}`);
};

/**
 * @description /api/board/search/검색어/페이지
 * @param {Array} queryKey
 */
export const getSearch = ({ queryKey }) => {
  return mainRequest.get(`/api/board/search/${queryKey[1]}/${queryKey[2]}`);
};
