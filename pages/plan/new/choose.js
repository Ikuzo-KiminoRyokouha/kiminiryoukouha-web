import Image from "next/image";
import Link from "next/link";
import BoardNav from "../../../components/board/BoardNav";
import DecidedPlanCard from "../../../components/plan/DecidedPlanCard";

export default function Choose() {
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
              <div className="flex h-full w-1/4 flex-col ">
                {/* 네비 한칸 */}
                <div className="h-9 w-3/5 bg-sky-600">
                  <Link href={`/plan/new/choose`} legacyBehavior>
                    <a>
                      <h2 className="pl-1 pt-1 text-lg text-white">GyeongJu</h2>
                    </a>
                  </Link>
                </div>
                <div className="h-9 w-3/5 border border-black">
                  <Link href={`/plan/new/choose`} legacyBehavior>
                    <a>
                      <h2 className="pl-1 pt-1 text-lg">準備中</h2>
                    </a>
                  </Link>
                </div>
                <div className="h-9 w-3/5 border border-black">
                  <Link href={`/plan/new/choose`} legacyBehavior>
                    <a>
                      <h2 className="pl-1 pt-1 text-lg">準備中</h2>
                    </a>
                  </Link>
                </div>
              </div>
              {/* 오른편 내용들 */}
              <div className="flex w-3/4 flex-col ">
                <div className="flex justify-center">
                  <h1 className="text-4xl">GyeongJu</h1>
                </div>
                {/* 카드들 */}
                <div className="mt-12 flex justify-around">
                  {/* 카드 */}
                  <DecidedPlanCard />
                  <DecidedPlanCard />
                  <DecidedPlanCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
