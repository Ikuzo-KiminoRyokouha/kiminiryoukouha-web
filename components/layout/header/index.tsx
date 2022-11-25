import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { RiArrowDropDownFill } from "react-icons/ri";

import useInput from "../../../hooks/useInput";
import useToggle from "../../../hooks/useToggle";
import { getUser, useUser } from "../../../utils/client";
import HeaderNav from "./HeaderNav";
import headerNavMap from "../../../utils/dataMap/headerNavMap.json";
import DropDown from "../../dropdown/DropDown";
import { useMutation } from "@tanstack/react-query";
import { mLogout } from "../../../utils/fetchFn/mutation/user";

/**
 * @description 모든 화면에 공통적으로 적용 되는 Header 컴포넌트 입니다.
 */
export default function Header() {
  const keyword = useInput("", "where do you wanna go?");
  const router = useRouter();
  const dropdown = useToggle(false);
  const [user] = useUser();
  const { mutate } = useMutation(["logout"], mLogout, {
    onSuccess: () => router.reload(),
    onError: () => alert("요청 실패"),
  });

  return (
    <div
      className={`sticky top-0 z-40 h-[64px] w-full flex-none bg-white bg-opacity-100 lg:border-b lg:border-slate-900/10 ${
        router.pathname === "/" ? "lg:bg-opacity-10" : "lg:bg-opacity-100"
      } `}
    >
      <div className="border-b border-slate-900/10 py-4 md:mx-4 lg:mx-0 lg:border-0 lg:px-8">
        <div className="max-w-8xl mx-auto">
          <div className="relative flex items-center justify-between px-4 lg:justify-start lg:px-0">
            {/* 모바일 햄버거 */}
            <div className="flex lg:hidden">
              <AiOutlineMenu size={25} />
            </div>
            {/* 앱 타이틀 */}
            <Link href={"/"}>
              <div className="flex cursor-pointer items-center space-x-2">
                <div className="h-8 w-8">
                  <Image
                    src="/assets/logo.png"
                    width={"24px"}
                    height={"24px"}
                    layout="responsive"
                  />
                </div>
                <span className="whitespace-nowrap text-xl font-semibold text-sky-600">
                  君の旅行は
                </span>
              </div>
            </Link>

            {/* 메뉴 */}
            <div className="relative flex items-center lg:ml-auto">
              {/* 네비게이션 바 */}
              <HeaderNav items={headerNavMap} />
              {/* 검색 */}
              <input
                className="mx-4 hidden rounded-lg border border-black p-1 focus:outline-0 focus:ring-0 lg:block "
                {...keyword}
              />
              {/* 로그인 버튼 */}
              {!user && (
                <button
                  onClick={() => router.push("/login")}
                  className="rounded-lg bg-sky-600 p-2 px-4"
                >
                  <span className="text-white">Login</span>
                </button>
              )}
              {user && (
                <div className="relative flex items-center justify-end space-x-1">
                  <div
                    onMouseDown={(e) => e.preventDefault()}
                    className="flex cursor-pointer items-center justify-center"
                    onClick={dropdown.onClick}
                  >
                    <FaUserCircle size={20} />
                    <RiArrowDropDownFill size={30} />
                  </div>
                  <DropDown visible={dropdown.value}>
                    <DropDown.Header>
                      <div>Sign Up as</div>
                      <div className="truncate font-medium">{user.name}</div>
                    </DropDown.Header>

                    <DropDown.ItemContainer>
                      <DropDown.Item text={"My Page"} />
                      <DropDown.Item text={"Setting"} />
                    </DropDown.ItemContainer>
                    <DropDown.Tail>
                      <span
                        onClick={() => mutate()}
                        className="block cursor-pointer py-2 px-4 text-sm text-red-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sign out
                      </span>
                    </DropDown.Tail>
                  </DropDown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
