import authRequest from "@/utils/request/authRequest";

export const getUserInfo = ({ queryKey }) => {
  return authRequest.get(`/users/info?userId=${queryKey[1]}`);
};

export const getUserFollowee = ({ queryKey }) => {
  return authRequest.get(`/users/info/followee`);
};

export const getUserFollower = ({ queryKey }) => {
  return authRequest.get(`/users/info/follower`);
};

export const getPlans = ({ queryKey }) => {
  return authRequest.get(`/plan/all/1`);
};

export const PostUserDescription = (body: string) => {
  return authRequest.post(`/users/description`, body);
};
export const PostUserFollow = (body) => {
  return authRequest.post(`/users/follow`, body);
};
export const PostUserUnfollow = (body) => {
  return authRequest.post(`/users/unfollow`, body);
};
