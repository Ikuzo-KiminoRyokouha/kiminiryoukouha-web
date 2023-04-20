import mainRequest from "@/utils/request/mainRequest";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ThreadSummary({ plan }) {
  
  const router = useRouter();
  const planId = plan?.id as number;

  const getPlan = ({ queryKey }) => {
    return mainRequest.get(`/plan/${planId}`);
  };
  const { data: planData } = useQuery(["getPlan"], getPlan);

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
          />
        </div>
        <div className="mx-2 flex flex-1 flex-col justify-around overflow-hidden text-ellipsis">
          <p className="p-1">장소 : {plan ? plan?.plan?.title : "..."}</p>
          <p className="line-clamp-2 leading-2 m-1 block">
            예산 : {plan?.plan?.totalCost}
          </p>
          {/* <p className="p-1">{"테마 :" + Thema}</p> */}
          <p className="p-1">{"테마 :"}</p>
        </div>
        <div
          className="flex cursor-pointer items-center justify-center rounded-lg bg-sky-600 p-2 text-white"
          onClick={() => {
            console.log("계획보기 clicked");
            router.push(`/thread/${planId}`);
          }}
        >
          <span>계획보기</span>
        </div>
      </div>
    </>
  );
}
