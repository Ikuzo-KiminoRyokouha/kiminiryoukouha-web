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

<<<<<<< HEAD
  // if (!user) {
  //   return (
  //     <div className="flex flex-1 items-center justify-center">
  //       <div role="status">
  //         <svg
  //           aria-hidden="true"
  //           className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
  //           viewBox="0 0 100 101"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
  //             fill="currentColor"
  //           />
  //           <path
  //             d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
  //             fill="currentFill"
  //           />
  //         </svg>
  //         <span className="sr-only">Loading...</span>
  //       </div>
  //     </div>
  //   );
  // }
=======
  // 닉네임 첫글자 대문자로 만들어줌
  const nickname = userInfo?.data?.nickname.replace(
    /\b[a-z]/,
    (nickname: string) => nickname.toUpperCase()
  );
>>>>>>> 94a1da7ae9eb6bd1332ad6d10c38a88d044c7029

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