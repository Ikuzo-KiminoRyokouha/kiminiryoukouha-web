import { convertMonthToEnglish } from "@/utils/common";
import dayjs from "dayjs";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { MdArrowRight, MdArrowDropDown } from "react-icons/md";
import DetailCard from "../../../components/plan/DetailCard";
import { Plan } from "../../../types/plan.interface";
import mainRequest from "../../../utils/request/mainRequest";
import Receipt from "components/Receipt";
import authRequest from "@/utils/request/authRequest";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

interface PlanProps {
  plan: Plan;
}

export default function PlanDetail({ plan }: PlanProps) {
  const [period, setPeriod] = useState<number>(0);
  console.log("plan123 : ", plan.id);
  const router = useRouter();

  // 등록된 계좌 있는지
  const getMyAccount = ({ queryKey }) => {
    return authRequest.get(`/banking/my/account/info`);
  };
  const { data: bankingInfo } = useQuery(["getMyAccount"], getMyAccount);
  console.log("bankingInfo", bankingInfo?.data?.ok);

  useLayoutEffect(() => {
    setPeriod(dayjs(plan.end).diff(dayjs(plan.start), "d") + 1);
  }, []);

  return (
    <div className="mx-auto flex h-fit w-full max-w-7xl flex-1 pb-28 lg:mb-0 ">
      <div className="w-full">
        {/* main image */}
        <div className="relative h-52 w-full bg-slate-200">
          <Image
            src={"/assets/_gyeongju01.jpg"}
            layout={"fill"}
            objectFit={"cover"}
          />
        </div>
        {/* plan title */}
        <div className="w-full py-14">
          <p className="text-3xl font-semibold">
            {plan.title.split(" ")[0] || "私の旅行"}
          </p>
        </div>
        {/* plan date */}
        <div className="mb-5 flex h-16 w-full items-center rounded-lg bg-gray-200 px-2">
          <p className="text-3xl font-semibold">
            {`📅 Travel Date : ${convertMonthToEnglish(
              plan.start.slice(5, 7)
            )} ${plan.start.slice(8, 10)} ~ ${convertMonthToEnglish(
              plan.end.slice(5, 7)
            )} ${plan.end.slice(8, 10)}`}
          </p>
        </div>
        <div className="flex h-fit">
          <div className="w-[60%]  flex-col">
            {Array.from(Array(period)).map((_, idx) => {
              return <DayPlanList plan={plan} idx={idx} />;
            })}
          </div>
          {/* 가계부 */}
          <div className="w-[40%]">
            <div className="flex justify-center">
              <p className="pb-16 text-3xl font-semibold">가계부</p>
            </div>
            {bankingInfo?.data?.ok && bankingInfo?.data?.ok === true ? (
              <Receipt planId={plan?.id} />
            ) : (
              <div className="flex justify-center">
                <button
                  className="rounded bg-sky-600 p-2 text-xl text-white"
                  onClick={() => {
                    router.push(`/wallet`);
                  }}
                >
                  口座登録
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const DayPlanList = ({ plan, idx }) => {
  const [showPlan, setShowPlan] = useState(true);

  return (
    <>
      {/* 몇번째 날인지 */}
      <div className="flex items-center p-2">
        <div className="flex items-center">
          <span className="text-xl font-bold">Day{idx + 1}</span>
        </div>
        <div>
          {showPlan === true ? (
            <MdArrowRight
              onClick={() => {
                setShowPlan(!showPlan);
              }}
              size={35}
              className="cursor-pointer pt-1"
            />
          ) : (
            <MdArrowDropDown
              onClick={() => {
                setShowPlan(!showPlan);
              }}
              size={35}
              className="cursor-pointer pt-1"
            />
          )}
        </div>
      </div>
      {/* 게시물 post */}
      <div className={`flex  py-10 ${showPlan ? "block" : "hidden"}`}>
        {plan.travels.map((travel) => {
          if (
            dayjs(travel.startDay).format("YYYY-MM-DD") ===
            dayjs(plan.start).add(idx, "d").format("YYYY-MM-DD")
          )
            return <DetailCard planId={plan.id} travel={travel} />;
        })}
      </div>
    </>
  );
};

export async function getServerSideProps({ query }) {
  try {
    if (!query?.planId) throw new Error();
    const res = await mainRequest.get(`/plan/${query?.planId}`);
    return {
      props: {
        plan: res.data.plan,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      redirect: {
        permanent: false,
        destination: "/plan",
      },
    };
  }
}
