import mainRequest from "@/utils/request/mainRequest";

export const getPlan = ({ queryKey }) => {
  return mainRequest.get(`/plan/${queryKey[1]}`);
};

export const getComments = ({ queryKey }) => {
  return mainRequest.get(`/commComments/${queryKey[1]}`);
};
