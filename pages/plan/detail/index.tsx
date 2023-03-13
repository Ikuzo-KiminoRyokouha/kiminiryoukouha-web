import { convertDateToEng } from "@/utils/common";
import dayjs from "dayjs";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { MdArrowRight, MdArrowDropDown } from "react-icons/md";
import DetailCard from "../../../components/plan/DetailCard";
import { Plan } from "../../../types/plan.interface";
import mainRequest from "../../../utils/request/mainRequest";

interface PlanProps {
  plan: Plan;
}

export default function PlanDetail({ plan }: PlanProps) {
  const [period, setPeriod] = useState<number>(0);
  console.log("plan123 : ", plan);

  useLayoutEffect(() => {
    setPeriod(dayjs(plan.end).diff(dayjs(plan.start), "d") + 1);
  }, []);

  return (
    <div className="mx-auto flex max-h-full w-full max-w-7xl flex-1 pb-28 lg:mb-0 ">
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
            {plan.title.split(" ")[0] || "나의여행"}
          </p>
        </div>
        {/* plan date */}
        <div className="mb-5 flex h-16 w-full items-center rounded-lg bg-gray-200 px-2">
          <p className="text-3xl font-semibold">
            📅 Travel Date :
            {`${convertDateToEng(plan.start.slice(5, 7))} ${plan.start.slice(
              8,
              10
            )} ~ ${convertDateToEng(plan.end.slice(5, 7))} ${plan.end.slice(
              8,
              10
            )}`}
          </p>
        </div>
        {Array.from(Array(period)).map((_, idx) => {
          return <DayPlanList plan={plan} idx={idx} />;
        })}
      </div>
    </div>
  );
}

const DayPlanList = ({ plan, idx }) => {
  const [test, setTest] = useState(true);

  return (
    <>
      <div className="flex items-center p-2">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold">Day{idx + 1}</span>
        </div>
        <div>
          {test === true ? (
            <MdArrowRight
              onClick={() => {
                setTest(!test);
              }}
              size={35}
              className="cursor-pointer pt-1"
            />
          ) : (
            <MdArrowDropDown
              onClick={() => {
                setTest(!test);
              }}
              size={35}
              className="cursor-pointer pt-1"
            />
          )}
        </div>
      </div>
      {/* 게시물 post */}
      <div className={`flex flex-wrap py-10 ${test ? "block" : "hidden"}`}>
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
