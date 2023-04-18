import mainRequest from "@/utils/request/mainRequest";

export const getPlan = ({ queryKey }) => {
  return mainRequest.get(`/plan/${queryKey[1]}`);
};
