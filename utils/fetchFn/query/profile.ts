import authRequest from "@/utils/request/authRequest";
import mainRequest from "@/utils/request/mainRequest";

export const getUserInfo = ({ queryKey }) => {
  return authRequest.get(`/users/info?userId=${queryKey[1]}`);
};

export const getUserFollowee = ({ queryKey }) => {
  return authRequest.get(`/users/info/followee?userId=${queryKey[1]}`);
};

export const getUserFollower = ({ queryKey }) => {
  return authRequest.get(`/users/info/follower?userId=${queryKey[1]}`);
};

export const getPlans = ({ queryKey }) => {
  return authRequest.get(`/plan/all/${queryKey[1]}`);
};

export const PostUserDescription = (body: string) => {
  return authRequest.post(`/users/update/description`, body);
};
export const PostUserFollow = (body) => {
  return authRequest.post(`/users/follow`, body);
};
export const PostUserUnfollow = (body) => {
  return authRequest.post(`/users/unfollow`, body);
};

/**
 * @param queryKey[1] limit
 * @param queryKey[2] offset
 */
export const getCommunityPostsByUser = ({ queryKey }) => {
  return authRequest.get(`/community/user?userId=${queryKey[1]}`);
};
