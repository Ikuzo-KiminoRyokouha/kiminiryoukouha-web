import mainRequest from "../../request/mainRequest";

/**
 * @description /api/board/all/페이지
 * @param {Array} queryKey
 */
export const getBoardPosts = ({ queryKey }) => {
  return mainRequest.get(`/api/board/all/${queryKey[1]}`);
};

export const getBoardPost = ({ queryKey }) => {
  return mainRequest.get(`/api/board/${queryKey[1]}`);
};

/**
 * @description /api/board/search/검색어/페이지
 * @param {Array} queryKey
 */
export const getSearch = ({ queryKey }) => {
  return mainRequest.get(`/api/board/search/${queryKey[1]}/${queryKey[2]}`);
};
