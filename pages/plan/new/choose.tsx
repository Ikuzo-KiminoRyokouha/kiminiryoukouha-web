import Image from "next/image";
import DecidedPlanCard from "../../../components/plan/DecidedPlanCard";
import PlanNav from "../../../components/plan/PlanNav";

export default function Choose() {
  interface plancard {
    img: string;
    title: string;
    days: string;
    description: string;
  }
  const gyeongjuHistory: plancard = {
    img: "/assets/budda.JPG",
    title: "역사탐방",
    days: "당일치기",
    description: "석굴암을 비롯한 경주의 역사를 경험해보세요.",
  };

  const test2: plancard = {
    img: "/assets/done.png",
    title: "test1",
    days: "1day 2nights",
    description: "this is test broooooo.",
  };

  return (
    <>
      <div className="flex h-screen w-full justify-center">
        <div className="flex h-full w-full max-w-2xl flex-col md:max-w-7xl">
          {/* 이미지 박스 */}
          <div className="relative h-1/3 w-full">
            <Image src={"/assets/gyeongju.jpg"} layout={"fill"} />
          </div>
          {/* 이미지 밑 박스 */}
          <div className="flex h-full flex-col">
            <div className="flex h-full pt-9">
              {/* 왼쪽편 네비 */}
              <PlanNav />
              {/* 오른편 내용들 */}
              <div className="flex w-3/4 flex-col ">
                <div className="flex justify-center">
                  <h1 className="text-4xl">GyeongJu</h1>
                </div>
                {/* 카드들 */}
                <div className="mt-12 flex justify-around">
                  {/* 카드 */}
                  <DecidedPlanCard {...gyeongjuHistory} />
                  <DecidedPlanCard {...test2} />
                  <DecidedPlanCard {...gyeongjuHistory} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
