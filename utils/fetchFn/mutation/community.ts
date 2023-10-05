import authRequest from "@/utils/request/authRequest";

export const mCreateComment = (body) => {
  return authRequest.post("/commComments", body);
};
export const mUpdateComment = ({ queryKey }) => {
  return authRequest.put(`/commComments/${queryKey[1]}`);
};
export const mCreatePost = (body) => {
  return authRequest.post("/community/", body);
};

export const mUpdatePost = (body) => {
  return authRequest.put("/community/", body);
};

export const mDeleteComment = (id) => {
  return authRequest.delete(`/commComments/${id}`);
};

export const mDeletePost = (id) => {
  return authRequest.delete(`/community/${id}`);
};
