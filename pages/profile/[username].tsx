import Profile from "@/common/Profile";
import { getUser, useUser } from "@/utils/client";
import {
  getUserFollowee,
  getUserFollower,
  getUserInfo,
} from "@/utils/fetchFn/query/profile";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useMemo, useState } from "react";

export default function test1() {
  const [navPage, setNavPage] = useState<string>("계획중인여행");
  const [navItemWidth, setNavItemWidth] = useState<{ [key: string]: number }>(
    {}
  );
  const [user] = useUser();
  console.log("user123", user);

  const router = useRouter();
  console.log("router123", router.query.username);

  /**
   * 자신의 프로필 페이지인가 아닌가
   * @type boolean
   *  */
  const isMyProfile = user?.sub == router.query.username ? true : false;
  console.log("isMyProfile", isMyProfile);

  const { data: userInfo } = useQuery(
    ["getUserInfo", router.query.username],
    getUserInfo
  );
  // console.log("userInfo", userInfo);
  const { data: userFollowee } = useQuery(["getUserFollowee"], getUserFollowee);
  // console.log("userFollowee", userFollowee?.data[0]?.followees);
  const { data: userFollower } = useQuery(["getUserFollower"], getUserFollower);
  // console.log("userFollower", userFollower?.data[0].followers);

  const obj = useMemo(
    () => [
      { title: "계획중인여행", onClick: () => setNavPage("계획중인여행") },
      { title: "내 게시물", onClick: () => setNavPage("내 게시물") },
    ],
    []
  );

  // 닉네임 첫글자 대문자로 만들어줌
  const nickname = userInfo?.data?.nickname?.replace(
    /\b[a-z]/,
    (nickname: string) => nickname.toUpperCase()
  );

  console.log("userInfo", userInfo);

  return (
    <Profile>
      <Profile.Header>
        <Profile.Image />
        <Profile.Info
          nickname={nickname || "error"}
          description={
            userInfo?.data?.description ||
            "Click the pencil icon add your descriptoin"
          }
          followerNum={userFollower?.data[0].followers?.length || -1}
          followingNum={userFollowee?.data[0].followees?.length || -1}
          isMyProfile={isMyProfile}
          followerInfo={userFollower?.data[0].followers}
          followingInfo={userFollowee?.data[0]?.followees}
        />
      </Profile.Header>
      <Profile.Body>
        <Profile.Nav navPage={navPage} navItemWidth={navItemWidth}>
          {obj.map((el, idx) => (
            <React.Fragment key={idx}>
              <Profile.NavButton setNavItemWidth={setNavItemWidth} {...el} />
            </React.Fragment>
          ))}
        </Profile.Nav>
        {/* <Profile.Contents navPage={navPage} /> */}
      </Profile.Body>
    </Profile>
  );
}

/**
 * 나의 마이페이지 -> getUser or useUser로 로그인한 유저 정보 가져온 후에 비교해서 라우팅
 * 남의 마이페이지 -> 남의 프로필에 접속할 수 있는 무언가 (커뮤니티 프로필사진 클릭 등)
 */
