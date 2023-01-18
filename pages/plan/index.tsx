import { useToggle } from "@/hooks";
import axios from "axios";
import MyModal from "components/MyModal";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";

import SideBar from "../../components/plan/SideBar";
import SimplePlanCard from "../../components/plan/SimplePlanCard";
import { Plan } from "../../types/plan.interface";

export default function Index({ plans }) {
  const router = useRouter();
  const activeVisible = useToggle(true);
  const readyVisible = useToggle(true);

  const [activatedPlans, setActivatedPlans] = useState<Array<Plan>>();
  const [waitingPlans, setWaitingPlans] = useState<Array<Plan>>();

  useLayoutEffect(() => {
    setActivatedPlans(() => {
      return plans.filter((plan) => dayjs(plan.start).isBefore(dayjs()));
    });

    setWaitingPlans(() => {
      return plans.filter((plan) => dayjs(plan.start).isAfter(dayjs()));
    });
  }, []);

  return (
    <div className="max-w-8xl mx-auto mb-[53px] flex max-h-full w-full flex-1 lg:mb-0">
      <SideBar />
      <div className="basis-4/5 space-y-4 p-4">
        <div className="text-xl font-semibold">계획</div>
        <div>
          <div
            onClick={activeVisible.onClick}
            onMouseDown={(e) => e.preventDefault()}
            className="flex w-full cursor-pointer space-x-2 border p-4"
          >
            {!activeVisible.value && <RiArrowDropRightLine size={18} />}
            {activeVisible.value && <RiArrowDropDownLine size={18} />}
            <span>활성화 되어 있는 계획</span>
          </div>
          {activatedPlans?.map((plan: Plan, idx) => (
            <SimplePlanCard key={plan.title + idx} plan={plan} />
          ))}
        </div>
        <div className="">
          <div
            onClick={readyVisible.onClick}
            onMouseDown={(e) => e.preventDefault()}
            className="flex w-full space-x-2 border p-4"
          >
            {!readyVisible.value && <RiArrowDropRightLine size={18} />}
            {readyVisible.value && <RiArrowDropDownLine size={18} />}
            <span>준비중인 계획</span>
          </div>
          {waitingPlans?.map((plan: Plan, idx) => (
            <SimplePlanCard key={plan.title + idx} plan={plan} />
          ))}

          {plans.length === 0 && (
            <div
              onClick={(e) => router.push("/plan/new")}
              className="flex w-full cursor-pointer border px-4 py-2"
            >
              <p className="p-3 text-lg">
                계획을 아직 세우지 않으셨네요! 같이 세워봅시다!
              </p>
            </div>
          )}
          <div
            onClick={(e) => router.push("/plan/new")}
            className="flex w-full cursor-pointer border px-4 py-2"
          >
            <div className="flex items-center justify-center p-6">
              <AiOutlinePlusCircle size={24} />
            </div>
            <div className="flex items-center justify-center p-6">
              <span>新しい計画を立てる</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const res = await axios.get(`http://localhost:8000/plan/all/1`);

  return {
    props: {
      plans: res.data.plans || [],
    },
  };
}
