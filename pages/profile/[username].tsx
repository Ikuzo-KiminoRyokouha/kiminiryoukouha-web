import Profile from "@/common/Profile";
import { useUser } from "@/utils/client";
import { useRouter } from "next/dist/client/router";
import React, { useMemo, useState } from "react";

export default function ProfileUsername() {
  const [navPage, setNavPage] = useState<string>("計画中の旅行");
  const [navItemWidth, setNavItemWidth] = useState<{ [key: string]: number }>(
    {}
  );
  const [user] = useUser();

  const router = useRouter();

  /**
   * 자신의 프로필 페이지인가 아닌가 확인하는 변수
   *  */
  const isMyProfile = user?.sub == router.query.username ? true : false;

  const obj = useMemo(
    () => [
      { title: "計画中の旅行", onClick: () => setNavPage("計画中の旅行") },
      { title: "私の投稿", onClick: () => setNavPage("私の投稿") },
    ],
    []
  );

  return (
    <Profile>
      <Profile.Header>
        <Profile.Image />
        <Profile.Info isMyProfile={isMyProfile} />
      </Profile.Header>
      <Profile.Body>
        <Profile.Nav navPage={navPage} navItemWidth={navItemWidth}>
          {obj.map((el, idx) => (
            <React.Fragment key={idx}>
              <Profile.NavButton setNavItemWidth={setNavItemWidth} {...el} />
            </React.Fragment>
          ))}
        </Profile.Nav>
        <Profile.Contents navPage={navPage} />
      </Profile.Body>
    </Profile>
  );
}
