import { getUser } from "@/utils/client";
import MyPagePlan from "components/mypage/MyPagePlan";
import MyPagePosts from "components/mypage/MyPagePosts";
import DecidedPlanCard from "components/plan/DecidedPlanCard";
import useToggle from "hooks/useToggle";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function MyPage() {
  const router = useRouter();
  console.log("router", router.query.username);

  const showPlan = useToggle(true);

  const arr = [, , , , , , , , , , , , , ,].fill(0);

  const obj = useMemo(
    () => [
      { title: "계획중인여행", onClick: showPlan.setTrue },
      { title: "내 게시물", onClick: showPlan.setFalse },
    ],
    []
  );

  return (
    <div className="flex w-full flex-1">
      <div className="mx-auto flex max-w-7xl flex-1 flex-col">
        {/* 상단 */}
        <div className="flex h-1/3 min-h-[286px]">
          {/* 이미지 */}
          <div className="flex h-full w-1/5 justify-center py-10">
            <div className="relative hidden w-4/5 overflow-hidden rounded after:block after:pb-[100%] md:block">
              <Image src={"/assets/main-img.png"} layout={"fill"} />
            </div>
          </div>
          {/* 내용 */}
          <div className="flex h-full w-3/5 flex-col py-10">
            <div className="flex h-1/3 w-full ">
              <span className="text-4xl">{router.query.username}</span>
            </div>
            <div className="flex h-2/3 w-full flex-col">
              <div className="h-1/6 w-5/6"></div>
              <div className="h-5/6 w-5/6 ">
                <div className="line-clamp-5 block h-full w-11/12 overflow-hidden pt-3 pl-2">
                  <span className="text-lg leading-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dicta voluptatibus corrupti recusandae quod sed cum,
                    architecto quisquam accusamus placeat quo, quam neque vero,
                    nisi maxime. Deleniti minima tenetur repudiandae iusto.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Velit accusantium repudiandae totam culpa inventore,
                    similique aliquid in magnam. Harum ea atque doloribus aut
                    alias quaerat molestias sequi eveniet excepturi debitis.
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* 팔로우 */}
          <div className="h-full w-1/5 py-10">
            <div className="h-full">
              <div className="pt-2">
                <button
                  className="w-20 rounded bg-sky-600 p-2 text-white"
                  onClick={() => {}}
                >
                  <span className="text-lg">Follow</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* 하단 */}
        <div className="flex h-full flex-col">
          <nav>
            <div className="flex">
              {obj.map((el) => (
                <ASD {...el}></ASD>
              ))}
            </div>
            {/* 라인 */}
            <div className="ml-2 w-full border-2 border-slate-200">
              {showPlan.value && (
                <div className="w-28 border-2 border-sky-200"></div>
              )}
              {!showPlan.value && (
                <div className="ml-[114px] w-24 border-2 border-sky-200"></div>
              )}
            </div>
          </nav>
          {/* 내용물들 */}
          <div className="w-full">
            {/* 계획중인여행 */}
            {showPlan.value && <MyPagePlan arr={arr} />}

            {/* 내 게시물 */}
            {!showPlan.value && <MyPagePosts arr={arr} />}
          </div>
        </div>
      </div>
    </div>
  );
}
const ASD = ({ title, onClick }) => {
  return (
    <span className="cursor-pointer p-2 text-xl" onClick={onClick}>
      {title}
    </span>
  );
};

{
  /* <span
                className="cursor-pointer p-2 text-xl"
                onClick={onClick.plan}
              >
                계획중인여행
              </span>
              <span
                className="cursor-pointer p-2 text-xl"
                onClick={onClick.posts}
              >
                내 게시물
              </span> */
}
