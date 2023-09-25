import { getPlan } from "@/utils/fetchFn/query/community";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ThreadSummary({ plan }) {
  const router = useRouter();
  const planId = plan?.id as number;

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
          <p className="p-1">場所 : {plan ? plan?.plan?.title : "..."}</p>
          <p className="leading-2 m-1 line-clamp-2 block">
            予算 : {plan?.plan?.totalCost}
          </p>
          <p className="p-1">
            テーマ :
            {planData?.data?.plan?.tag &&
              Object.keys(planData?.data?.plan?.tag).map((key) => {
                return planData?.data?.plan?.tag[key].map((tag) => {
                  return " " + String(tag) + "  ";
                });
              })}
          </p>
        </div>
        <Link href={`/thread/${25}`} passHref>
          <a className="flex cursor-pointer items-center justify-center rounded-lg bg-sky-600 p-2 text-white">
            プランを見る
          </a>
        </Link>
      </div>
    </>
  );
}
