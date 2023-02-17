import { Dispatch, SetStateAction } from "react";
import IProps from "./props.interface";

export interface FollowingFollowerInfo {
  createdAt: string;
  deleteaAt?: string;
  description?: string;
  email: string;
  id: number;
  nickname: string;
  password: string;
  refreshToken: string;
  role: string;
  updateAt: string;
}

export interface CommunityPostsProps {
  content: string;
  createdAt: string;
  deleteAt?: string;
  id: number;
  img: string;
  plan?: number;
  updatedAt: string;
}

export interface MyCommunityPostsProps {
  content: string;
  createdAt: string;
  deleteAt?: string;
  id: number;
  img: string;
  planId: number;
  updatedAt: string;
  userId: number;
}

export interface InfoProps {
  nickname: string;
  description: string;
  followerNum: number;
  followingNum: number;
  isMyProfile: boolean;
  followerInfo: [FollowingFollowerInfo];
  followingInfo: [FollowingFollowerInfo];
}

export interface ButtonProps {
  title: string;
  onClick: () => void;
  isMyProfile: boolean;
}

export interface NavProps extends IProps {
  navItemWidth: { [key: string]: number };
  navPage: string;
}

export interface ContentsProps {
  navPage: string;
  planInfo: any;
  communityPosts?: [CommunityPostsProps];
  myCommunityPosts?: [MyCommunityPostsProps];
}

export interface NavButtonProps {
  title: string;
  onClick: () => void;
  setNavItemWidth: Dispatch<
    SetStateAction<{
      [key: string]: number;
    }>
  >;
}

export interface FixProfileProps {
  hide: () => void;
  description: string;
}

export interface ShowFollowingProps {
  hide: () => void;
  followingInfo: [FollowingFollowerInfo];
}

export interface ShowFollowerProps {
  hide: () => void;
  followerInfo: [FollowingFollowerInfo];
}

export interface FollwerFollweeInfoProps {
  info: [FollowingFollowerInfo];
  hide: () => void;
}
