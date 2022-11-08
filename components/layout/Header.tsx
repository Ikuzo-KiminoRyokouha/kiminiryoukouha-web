import Link from "next/link";
import Image from "next/image";
import useInput from "../../hooks/useInput";
import { useRouter } from "next/router";

export default function Header() {
  const keyword = useInput("", "where do you wanna go?");
  const router = useRouter();
  return (
    <div
      className={`sticky top-0 z-40 w-full flex-none bg-white bg-opacity-100 lg:border-b lg:border-slate-900/10 ${
        router.pathname === "/" ? "lg:bg-opacity-10" : "lg:bg-opacity-100"
      } `}
    >
      <div className="max-h-16 border-b border-slate-900/10 py-4 md:mx-4 lg:mx-0 lg:border-0 lg:px-8">
        <div className="max-w-8xl mx-auto">
          <div className="relative flex items-center">
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
                <span className="text-xl font-semibold text-sky-600">
                  君の旅行は
                </span>
              </div>
            </Link>
            {/* 메뉴 */}
            <div className="relative ml-auto hidden items-center lg:flex">
              {/* 네비게이션 바 */}
              <nav className="text-sm  font-semibold leading-6 text-slate-700">
                <ul className="flex space-x-8">
                  <li>
                    <Link href="/plan">
                      <a className="hover:text-sky-600">計画</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/diary">
                      <a className="hover:text-sky-600">ダイアリー</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/navigation">
                      <a className="hover:text-sky-600">道探し</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/thread">
                      <a className="hover:text-sky-600">旅行スレ</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">
                      <a className="hover:text-sky-600">ABOUT US</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/F&A">
                      <a className="hover:text-sky-600">F&A</a>
                    </Link>
                  </li>
                </ul>
              </nav>
              {/* 검색 */}
              <input
                className="mx-4 rounded-lg p-1 focus:outline-0 focus:ring-0"
                {...keyword}
              />
              {/* 로그인 버튼 */}
              <button
                onClick={() => router.push("/login")}
                className="rounded-lg bg-sky-600 p-2 px-4"
              >
                <span className="text-white">Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
