import mainRequest from "../../request/mainRequest";

/**
 * @description /board/all/페이지
 * @param {Array} queryKey
 */
export const getBoardPosts = (context) => {
  return mainRequest.get(`/board/all/${context.queryKey[1]}`);
};

/**
 * @description /board/게시물번호
 */
export const getBoardPost = ({ queryKey }) => {
  return mainRequest.get(`/board/${queryKey[1]}`);
};

/**
 * @description /comment/게시물번호/댓글페이지
 */
export const getComment = ({ queryKey }) => {
  return mainRequest.get(`/comment/${queryKey[1]}`);
};

/**
 * @description /board/search/검색어/페이지
 * @param {Array} queryKey
 */
export const getSearch = ({ queryKey }) => {
  return mainRequest.get(`/board/search/${queryKey[1]}/${queryKey[2]}`);
};
