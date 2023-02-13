import IProps from "@/types/props.interface";
import MyPagePlan from "components/mypage/MyPagePlan";
import MyPagePosts from "components/mypage/MyPagePosts";
import useMypage from "hooks/useMypage";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  createContext,
  SetStateAction,
  useContext,
  Dispatch,
  useEffect,
  useMemo,
  useRef,
} from "react";
import styled from "styled-components";
import { HiPencil } from "react-icons/hi";

const MyPageContext = createContext<{
  arr: Array<number>;
}>(undefined);

export default function MyPage({ children }: IProps) {
  const arr = [, , , , , , , , , , , , , ,].fill(0);

  return (
    <MyPageContext.Provider value={{ arr }}>
      <div className="flex w-full flex-1">
        <div className="mx-auto flex max-w-7xl flex-1 flex-col">{children}</div>
      </div>
    </MyPageContext.Provider>
  );
}

MyPage.Header = ({ children }: IProps) => {
  return <div className="flex h-1/3 min-h-[286px]">{children}</div>;
};

MyPage.Body = ({ children }: IProps) => {
  return <div className="flex h-full flex-col">{children}</div>;
};

MyPage.Image = () => {
  return (
    <div className="flex h-full w-1/5 justify-center py-10">
      <div className="relative hidden w-4/5 overflow-hidden rounded after:block after:pb-[100%] md:block">
        <Image src={"/assets/main-img.png"} layout={"fill"} />
      </div>
    </div>
  );
};
interface InfoProps {
  nickname: string;
  description: string;
  follower: number;
  following: number;
}

MyPage.Info = ({ nickname, description, follower, following }: InfoProps) => {
  const { writeDescription, userFollow, userUnfollow } = useMypage();

  const onClick = {
    writeDescription: () => {
      // 닉네임옆 연필 아이콘 누를시 모달창띄워주기
      console.log("writeDescription function launched");
    },
    following: () => {
      // following 클릭시 팔로우중인 사람들 모달창으로 띄워줌
      console.log("following function launched");
    },
    follower: () => {
      // follower클릭시 팔로워들 모달창으로 띄워줌
      console.log("follower function launched");
    },
    followUser: () => {
      // 버튼에 들어가는 유저 팔로우 함수
      console.log("followUser function launched");
      // userFollow({
      //   targetId: 2,
      // });
    },
    unfollowUser: () => {
      // 유저 언팔 함수
      console.log("unfollowUser function launched");
      // userUnfollow({
      //   targetId: 1,
      // });
    },
  };
  return (
    <div className="flex h-full w-10/12 flex-col py-10">
      {/* 상단 닉네임, 팔로우정보 */}
      <div className="flex h-1/3 w-full justify-between">
        <div className="w-5/6">
          {/* 닉네임 */}
          <div className="flex flex-col">
            <div className="flex">
              <span className="text-4xl">{nickname}</span>
              <HiPencil
                className="cursor-pointer pl-3 pt-2"
                size={35}
                onClick={onClick.writeDescription}
              />
            </div>
            <div className="flex pt-2">
              {/* 팔로우 팔로워 */}
              {["follwing", "follower"].map((el) => {
                return (
                  <div className="flex">
                    <span
                      className="text-md cursor-pointer pr-1 font-semibold leading-8"
                      onClick={
                        (el === "follower" && onClick.follower) ||
                        onClick.following
                      }
                    >
                      {(el === "follower" && follower) || following}
                    </span>
                    <span
                      className="text-md cursor-pointer pr-3 leading-8"
                      onClick={
                        (el === "follower" && onClick.follower) ||
                        onClick.following
                      }
                    >
                      {el}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <MyPage.Button title={"follow"} onClick={onClick.followUser} />
      </div>
      {/* 하단 description */}
      <div className="flex h-2/3 w-full flex-col">
        <div className="h-1/6 w-5/6"></div>
        <div className="h-5/6 w-5/6 ">
          <div className="line-clamp-5 block h-full w-11/12 overflow-hidden pt-3">
            <span className="text-lg leading-5">{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ButtonProps {
  title: string;
  onClick: () => void;
}
MyPage.Button = ({ title, onClick }: ButtonProps) => {
  return (
    <div className="px-10">
      {/* 팔로우상태면 언팔로우 뜨게 + 버튼색깔 red */}
      <button
        className="w-20 rounded bg-sky-600 p-2 text-white"
        onClick={onClick}
      >
        <span className="text-lg">{title}</span>
      </button>
    </div>
  );
};

MyPage.Follower = () => {
  const router = useRouter();
  const onClick = () => {
    router.push({
      pathname: "#",
      // pathname: "/username/followers",
    });
  };
  return (
    <div className="mx-10 flex h-full flex-col items-center py-10">
      <div className="flex flex-col items-center py-3">
        <span className="cursor-pointer text-2xl" onClick={onClick}>
          Follwers
        </span>
        <span className="cursor-pointer pt-3 text-xl" onClick={onClick}>
          15
        </span>
      </div>
    </div>
  );
};

interface NavProps extends IProps {
  navItemWidth: { [key: string]: number };
  navPage: string;
}
MyPage.Nav = ({ children, navItemWidth, navPage }: NavProps) => {
  return (
    <nav className="m-2">
      <div className="mx-2 flex">{children}</div>
      {/* 라인 */}
      <div className="mx-4 w-full border-2 border-slate-200">
        <ActionBar navItemWidth={navItemWidth} navPage={navPage} />
      </div>
    </nav>
  );
};

const ActionBar = styled.div<{
  navItemWidth: { [key: string]: number };
  navPage: string;
}>`
  width: ${(props) => props.navItemWidth[props.navPage] + "px"};
  border-width: 2px;
  --tw-border-opacity: 1;
  border-color: rgb(186 230 253 / var(--tw-border-opacity));
  margin-left: ${(props) =>
    Array.from(Object.keys(props.navItemWidth))
      .map((el, idx) => {
        if (
          idx >=
          Array.from(Object.keys(props.navItemWidth)).indexOf(props.navPage)
        )
          return 0;
        return props?.navItemWidth[el] + 16;
      })
      .reduce((partialSum, a) => partialSum + a, 0) + "px"};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
`;

interface ContentsProps {
  navPage: string;
}

MyPage.Contents = ({ navPage }: ContentsProps) => {
  const { arr } = useContext(MyPageContext);

  return (
    <div className="mx-auto ml-8 w-full">
      {/* 계획중인여행 */}
      {navPage === "계획중인여행" && <MyPagePlan arr={arr} />}
      {/* 내 게시물 */}
      {navPage === "내 게시물" && <MyPagePosts arr={arr} />}
    </div>
  );
};

interface NavButtonProps {
  title: string;
  onClick: () => void;
  setNavItemWidth: Dispatch<
    SetStateAction<{
      [key: string]: number;
    }>
  >;
}
// setNavItemWidth 타입 설정 모르겠음
MyPage.NavButton = ({ title, onClick, setNavItemWidth }: NavButtonProps) => {
  const ref = useRef();

  useEffect(() => {
    const { width } = (ref.current as HTMLSpanElement).getClientRects()[0];
    setNavItemWidth((prev) => {
      const newObj = {};
      newObj[title] = width;
      return { ...prev, ...newObj };
    });
  }, []);
  return (
    <span ref={ref} className="m-2 cursor-pointer text-xl" onClick={onClick}>
      {title}
    </span>
  );
};
