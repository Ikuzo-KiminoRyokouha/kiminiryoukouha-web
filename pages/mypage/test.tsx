import MyPage1 from "@/common/Mypage";
import { useEffect, useMemo, useRef, useState } from "react";

export default function test1() {
  const [navPage, setNavPage] = useState<string>("계획중인여행");
  const [navItemWidth, setNavItemWidth] = useState<{ [key: string]: number }>(
    {}
  );

  const description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae sunt molestias accusantium! Velit quis, et cum dolores eum eos laborum ipsum officiis, tempore adipisci numquam natus labore doloribus laboriosam nam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae sunt molestias accusantium! Velit quis, et cum dolores eum eos laborum ipsum officiis, tempore adipisci numquam natus labore doloribus laboriosam nam?";

  const obj = useMemo(
    () => [
      { title: "계획중인여행", onClick: () => setNavPage("계획중인여행") },
      { title: "내 게시물", onClick: () => setNavPage("내 게시물") },
    ],
    []
  );

  return (
    <MyPage1>
      <MyPage1.Header>
        <MyPage1.Image />
        <MyPage1.Info username={"Moon"} description={description} />
        {/* <MyPage1.Follower /> */}
      </MyPage1.Header>
      <MyPage1.Body>
        <MyPage1.Nav navPage={navPage} navItemWidth={navItemWidth}>
          {obj.map((el) => (
            <MyPage1.NavButton setNavItemWidth={setNavItemWidth} {...el} />
          ))}
        </MyPage1.Nav>
        <MyPage1.Contents navPage={navPage} />
      </MyPage1.Body>
    </MyPage1>
  );
}
