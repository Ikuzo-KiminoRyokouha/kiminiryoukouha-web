import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  UseMutateFunction,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
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
  getUserFolloweeRefetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
  getUserFollowerRefetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
  userInfoRefetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
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
  // planInfo: any;
  // communityPosts?: [CommunityPostsProps];
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
  writeDescription: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    any,
    unknown
  >;
  userInfoRefetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
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

export interface UseProfileProps {
  writeDescription: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    string,
    unknown
  >;
  userFollow: UseMutateFunction<AxiosResponse<any, any>, unknown, any, unknown>;
  userUnfollow: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    any,
    unknown
  >;
  userInfo: AxiosResponse<any, any>;
  userFollower: AxiosResponse<any, any>;
  userFollowee: AxiosResponse<any, any>;
  getUserFolloweeRefetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
  getUserFollowerRefetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
  userInfoRefetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
  nickname: string;
  planInfo: AxiosResponse<any, any>;
  communityPosts: AxiosResponse<any, any>;
  myName;
  isFollow;
  onClick;
  isFixing;
  isShowFollower;
  isShowFollowing;
  followerInfo;
  followerNum;
  followingNum;
  description;
  followingInfo;
}
