import mainRequest from "../../request/mainRequest";

export const getBoardPosts = ({ queryKey }) => {
  return mainRequest.get(
    process.env.NEXT_PUBLIC_API_URL + `/api/board/all/${queryKey[1]}`
  );
};
