import MyPagePlan from "components/mypage/MyPagePlan";
import MyPagePosts from "components/mypage/MyPagePosts";
import Image from "next/image";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

const MyPageContext = createContext<{
  arr: Array<number>;
}>(undefined);

export default function MyPage({ children }) {
  const arr = [, , , , , , , , , , , , , ,].fill(0);

  return (
    <MyPageContext.Provider value={{ arr }}>
      <div className="flex w-full flex-1">
        <div className="mx-auto flex max-w-7xl flex-1 flex-col">{children}</div>
      </div>
    </MyPageContext.Provider>
  );
}

MyPage.Header = ({ children }) => {
  return <div className="flex h-1/3 min-h-[286px]">{children}</div>;
};

MyPage.Body = ({ children }) => {
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

MyPage.Info = ({ username, description }) => {
  return (
    <div className="flex h-full w-3/5 flex-col py-10">
      <div className="flex h-1/3 w-full ">
        <div className="w-5/6">
          <span className="text-4xl">{username}</span>
        </div>
        <MyPage.Button title={"follow"} onClick={() => {}} />
      </div>
      <div className="flex h-2/3 w-full flex-col">
        <div className="h-1/6 w-5/6"></div>
        <div className="h-5/6 w-5/6 ">
          <div className="line-clamp-5 block h-full w-11/12 overflow-hidden pt-3 pl-2">
            <span className="text-lg leading-5">{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

MyPage.Button = ({ title, onClick }) => {
  return (
    <div className="pl-5">
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

MyPage.Nav = ({ children, navItemWidth, navPage }) => {
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

MyPage.Contents = ({ navPage }) => {
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

MyPage.NavButton = ({ title, onClick, setNavItemWidth }) => {
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
