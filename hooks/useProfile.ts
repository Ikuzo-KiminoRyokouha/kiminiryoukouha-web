import { UseProfileProps } from "@/types/profile.interface";
import { useUser } from "@/utils/client";
import {
  getCommunityPostsByUser,
  getPlans,
  getUserFollowee,
  getUserFollower,
  getUserInfo,
  PostUserDescription,
  PostUserFollow,
  PostUserUnfollow,
} from "@/utils/fetchFn/query/profile";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/dist/client/router";
import useToggle from "./useToggle";

export default function useProfile(): UseProfileProps {
  const router = useRouter();

  const { mutate: writeDescription } = useMutation(
    ["writeBoardPost"],
    PostUserDescription
  );
  const { mutate: userFollow } = useMutation(
    ["writeBoardPost"],
    PostUserFollow
  );

  const { mutate: userUnfollow } = useMutation(
    ["writeBoardPost"],
    PostUserUnfollow
  );

  const { data: userInfo, refetch: userInfoRefetch } = useQuery(
    ["getUserInfo", router.query?.username],
    getUserInfo
  );
  const { data: userFollowee, refetch: getUserFolloweeRefetch } = useQuery(
    ["getUserFollowee", router.query?.username],
    getUserFollowee
  );
  const { data: userFollower, refetch: getUserFollowerRefetch } = useQuery(
    ["getUserFollower", router.query?.username],
    getUserFollower
  );
  const { data: planInfo } = useQuery(
    ["getPlans", router.query?.username],
    getPlans
  );
  const { data: communityPosts } = useQuery(
    ["getCommunityPostsByUser", router.query?.username],
    getCommunityPostsByUser
  );

  // 닉네임 첫글자 대문자로 만들어줌
  const nickname: string = userInfo?.data?.nickname?.replace(
    /\b[a-z]/,
    (nickname: string) => nickname.toUpperCase()
  );

  // HiPencil 아이콘 누를시 모달창 띄워주기 위한 state
  const isFixing = useToggle(false);
  // follower 누를시 모달창 띄워주기 위한 state
  const isShowFollower = useToggle(false);
  // following 누를시 모달창 띄워주기 위한 state
  const isShowFollowing = useToggle(false);
  // follow버튼을 보여줄지 unfollow버튼을 보여줄지 결정하는 state
  const isFollow = useToggle(false);

  const myName = useUser();

  const onClick = {
    fixProfile: () => {
      // 닉네임옆 연필 아이콘 누를시 모달창띄워주기
      console.log("fixProfile function launched");
      isFixing.setTrue();
    },
    showFollowing: () => {
      // following 클릭시 팔로우중인 사람들 모달창으로 띄워줌
      console.log("showFollowing function launched");
      isShowFollowing.setTrue();
    },
    showFollower: () => {
      // follower클릭시 팔로워들 모달창으로 띄워줌
      console.log("showFollower function launched");
      isShowFollower.setTrue();
    },
    followUser: () => {
      // 버튼에 들어가는 유저 팔로우 함수
      console.log(
        `followUser function launched follow ${router.query?.username}`
      );
      try {
        userFollow(
          {
            targetId: Number(router.query?.username),
          },
          {
            onSuccess: async () => {
              await getUserFolloweeRefetch();
              await getUserFollowerRefetch();
              isFollow.setTrue();
            },
          }
        );
      } catch (err) {
        console.log("followUser function err : " + err);
      }
    },
    unfollowUser: () => {
      // 유저 언팔 함수
      console.log("unfollowUser function launched");
      try {
        userUnfollow(
          {
            targetId: Number(router.query?.username),
          },
          {
            onSuccess: async () => {
              await getUserFolloweeRefetch();
              await getUserFollowerRefetch();
              isFollow.setFalse();
            },
          }
        );
      } catch (err) {
        console.log("unfollowUser function err : " + err);
      }
    },
    submitImage: () => {
      console.log("submitImage function launched");
    },
  };

  const followerInfo = userFollower ? userFollower?.data[0]?.followers : [];
  const followerNum = userFollower
    ? userFollower?.data[0]?.followers?.length
    : 0;
  const followingNum = userFollowee
    ? userFollowee?.data[0]?.followees?.length
    : 0;
  const description =
    userInfo?.data?.description || "Click the pencil icon add your descriptoin";
  const followingInfo = userFollowee?.data[0]?.followees || [];

  return {
    writeDescription,
    userFollow,
    userUnfollow,
    userInfo,
    userInfoRefetch,
    userFollowee,
    getUserFolloweeRefetch,
    userFollower,
    getUserFollowerRefetch,
    planInfo,
    communityPosts,
    nickname,
    myName,
    isFollow,
    onClick,
    isFixing,
    isShowFollower,
    isShowFollowing,
    followerInfo,
    followerNum,
    followingNum,
    description,
    followingInfo,
  };
}
