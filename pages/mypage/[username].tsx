import MyPage from "@/common/Mypage";
import { useUser } from "@/utils/client";
import {
  getUserFollowee,
  getUserFollower,
  getUserInfo,
} from "@/utils/fetchFn/query/mypage";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";

export default function test1() {
  const [navPage, setNavPage] = useState<string>("계획중인여행");
  const [navItemWidth, setNavItemWidth] = useState<{ [key: string]: number }>(
    {}
  );
  const [user] = useUser();
  // console.log("user123", user);

  const { data: userInfo } = useQuery(["getUserInfo", 1], getUserInfo);
  // console.log("userInfo", userInfo);

  const { data: userFollowee } = useQuery(["getUserFollowee"], getUserFollowee);
  // console.log("userFollowee", userFollowee?.data[0].followees?.length);
  const { data: userFollower } = useQuery(["getUserFollower"], getUserFollower);
  // console.log("userFollower", userFollower?.data[0].followers?.length);

  const description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae sunt molestias accusantium! Velit quis, et cum dolores eum eos laborum ipsum officiis, tempore adipisci numquam natus labore doloribus laboriosam nam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae sunt molestias accusantium! Velit quis, et cum dolores eum eos laborum ipsum officiis, tempore adipisci numquam natus labore doloribus laboriosam nam?";

  const obj = useMemo(
    () => [
      { title: "계획중인여행", onClick: () => setNavPage("계획중인여행") },
      { title: "내 게시물", onClick: () => setNavPage("내 게시물") },
    ],
    []
  );

  // 닉네임 첫글자 대문자로 만들어줌
  const nickname = userInfo?.data?.nickname.replace(
    /\b[a-z]/,
    (nickname: string) => nickname.toUpperCase()
  );

  return (
    <MyPage>
      <MyPage.Header>
        <MyPage.Image />
        <MyPage.Info
          nickname={nickname || "error"}
          description={userInfo?.data?.description || ""}
          follower={userFollowee?.data[0].followees?.length || -1}
          following={userFollower?.data[0].followers?.length || -1}
        />
        {/* <MyPage.Follower /> */}
      </MyPage.Header>
      <MyPage.Body>
        <MyPage.Nav navPage={navPage} navItemWidth={navItemWidth}>
          {obj.map((el, idx) => (
            <React.Fragment key={idx}>
              <MyPage.NavButton setNavItemWidth={setNavItemWidth} {...el} />
            </React.Fragment>
          ))}
        </MyPage.Nav>
        {/* <MyPage.Contents navPage={navPage} /> */}
      </MyPage.Body>
    </MyPage>
  );
}

/**
 * 나의 마이페이지 -> getUser or useUser로 로그인한 유저 정보 가져온 후에 비교해서 라우팅
 * 남의 마이페이지 -> 남의 프로필에 접속할 수 있는 무언가 (커뮤니티 프로필사진 클릭 등)
 */
