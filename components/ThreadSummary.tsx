import { getPlan } from "@/utils/fetchFn/query/community";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function ThreadSummary({ plan }) {
  const planId = plan?.plan?.id as number;

  const { data: planData } = useQuery(["getPlan", planId], getPlan);

  // console.log("plan123", plan);
  // console.log("planId", planId);
  // console.log("planData321", planData?.data?.plan?.tag[1]);

  return (
    <>
      <div className="m-4 flex border p-1 shadow-sm">
        <div className="h-24 w-24">
          <Image
            src={
              planData?.data?.plan?.travels[0]?.destination?.firstimage ||
              "/assets/main-img.png"
            }
            width={1}
            height={1}
            layout="responsive"
            loading="lazy"
          />
        </div>
        <div className="mx-2 flex flex-1 flex-col justify-around overflow-hidden text-ellipsis">
          <p className="p-1">장소 : {plan ? plan?.plan?.title : "..."}</p>
          <p className="line-clamp-2 leading-2 m-1 block">
            예산 : {plan?.plan?.totalCost}
          </p>
          <p className="p-1">
            테마 :
            {planData?.data?.plan?.tag &&
              Object.keys(planData?.data?.plan?.tag).map((key) => {
                return planData?.data?.plan?.tag[key].map((tag) => {
                  return " " + String(tag) + "  ";
                });
              })}
          </p>
        </div>
        <Link href={`/thread/${planId}`} passHref>
          <a className="flex cursor-pointer items-center justify-center rounded-lg bg-sky-600 p-2 text-white">
            계획보기
          </a>
        </Link>
      </div>
    </>
  );
}
