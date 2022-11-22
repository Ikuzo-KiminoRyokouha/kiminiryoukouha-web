import mainRequest from "../../request/mainRequest";

export const getBoardPosts = ({ queryKey }) => {
  return mainRequest.get(
    process.env.NEXT_PUBLIC_API_URL + `/api/board/all/${queryKey[1]}`
  );
};

export const getSearch = ({ queryKey }) => {
  console.log("queryKey", queryKey);
  return mainRequest.get(
    process.env.NEXT_PUBLIC_API_URL +
      `/api/board/search/${queryKey[1]}/${queryKey[2]}`
  );
};
