import Link from "next/link";
import Image from "next/image";

interface Props {
  img: string;
  title: string;
  days: string;
  description: string;
}

export default function DecidedPlanCard({
  img,
  title,
  days,
  description,
}: Props) {
  return (
    <>
      {/* 카드 */}
      <div className="h-96 w-60 rounded-lg border border-black ">
        {/* 미리보기 이미지 */}
        <div className="relative h-[45%]">
          <Image src={`${img}`} layout={"fill"} />
        </div>
        {/* 텍스트부분 */}
        <div className="flex h-[55%] flex-col items-center">
          <div className="flex h-1/4 w-[90%] items-center justify-between ">
            <Link href={"/plan/new/choose"} legacyBehavior>
              <a>
                <h3>{title}</h3>
              </a>
            </Link>
            <p className="text-[10px] text-gray-400">{days}</p>
          </div>
          <div className="h-[65%] w-[90%]">
            <Link href={"/plan/new/choose"} legacyBehavior>
              <a>
                <p className="text-sm text-gray-400">{description}</p>
              </a>
            </Link>
          </div>
          <div className="flex w-[90%] justify-end">
            <Link href={"/plan/new/choose"} legacyBehavior>
              <a>
                <p className="text-[10px] text-gray-400">자세히보기</p>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
