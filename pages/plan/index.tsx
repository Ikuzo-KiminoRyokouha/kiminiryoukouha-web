import { AiOutlinePlusCircle } from "react-icons/ai";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Plan } from "../../types/plan.interface";
import dayjs from "dayjs";
import SimplePlanCard from "../../components/plan/SimplePlanCard";
import { useRouter } from "next/router";
import "@/utils/extension/array.extension";
import authRequest from "../../utils/request/authRequest";

export default function Index({ plans }) {
  let [mode, setMode] = useState(0);

  
console.log(plans)
  const router = useRouter();

  const [activatedPlans, setActivatedPlans] = useState<Array<Plan>>();
  const [waitingPlans, setWaitingPlans] = useState<Array<Plan>>();
  const [endPlans, setEndPlans] = useState<Array<Plan>>();

  useEffect(() => {
    setEndPlans(() => {
      return plans?.filter((plan) => dayjs().isAfter(dayjs(plan.end)));
    });
// useEffect인데 layout이라먼저실행함       plan에서 시작이랑 끝이랑 사이에있는거만 저장함 초기값 설정 
    setActivatedPlans(() => {
      return plans?.filter(
        (plan) =>
          dayjs(plan.start).isBefore(dayjs()) &&
          dayjs(plan.end).isAfter(dayjs())
      );
    });

    setWaitingPlans(() => {
      return plans?.filter((plan) => dayjs(plan.start).isAfter(dayjs()));
    });
  }, []);

  return (
    <>
      <div className="mx-auto mb-[53px] flex w-full  max-w-6xl  flex-wrap">
        {/* <img className="  w-full h-80 opacity-50 bg-cover "  src="/assets/test1.jpg" alt="12" /> */}
        <div className=" flex h-48  w-full">
          <span className="  mx-auto my-auto grid  h-28 w-28  place-items-center rounded-full bg-black text-center text-lg text-white">
            닉네임
          </span>
        </div>

        <div className="mx-auto h-32 w-full">
          <div className=" mx-auto  h-full    ">
            <div className="space-x-1  text-center">
              <strong className="inline-block cursor-pointer space-y-4 border-2 p-10">
                <p>나의계획</p>
                <p>{plans.length}개</p>
              </strong>
              <strong className="inline-block cursor-pointer space-y-4 border-2 p-10">
                <p>계획 리뷰</p>
                <p>0개</p>
              </strong>
            </div>
          </div>
        </div>

        <strong className="pl-4 pt-6 text-3xl">나의계획</strong>

        <div className=" flex w-full  space-x-4 space-y-3 p-4">
          <ModeChangeButton
            mode={0}
            currentMode={mode}
            onClick={() => {
              setMode(0);
            }}
          >
            진행중인 계획
          </ModeChangeButton>
          <ModeChangeButton
            mode={1}
            currentMode={mode}
            onClick={() => {
              setMode(1);
            }}
          >
            다가오는 계획
          </ModeChangeButton>
          <ModeChangeButton
            mode={2}
            currentMode={mode}
            onClick={() => {
              setMode(2);
            }}
          >
            끝난계획
          </ModeChangeButton>
        </div>
        <div className="mx-2 w-full space-y-2">
          {mode === 0 &&
            activatedPlans?.map((plan) => <SimplePlanCard plan={plan} />)}
          {mode === 1 &&
            waitingPlans?.map((plan) => <SimplePlanCard plan={plan} />)}
          {mode === 2 &&
            endPlans?.map((plan) => <SimplePlanCard plan={plan} />)}

          <div
            onClick={(e) => router.push("/plan/new")}
            className="flex w-full  cursor-pointer border  shadow-lg duration-500 hover:border-sky-600 hover:text-sky-600"
          >
            <div className="flex items-center justify-center p-6">
              <AiOutlinePlusCircle size={24} />
            </div>
            <div className="flex items-center justify-center p-6">
              <span>새로운 계획 세우기</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface ButtonProps {
  mode: number;
  currentMode: number;
}

const ModeChangeButton = styled.button<ButtonProps>`
  border-radius: 2rem /* 32px */;
  cursor: pointer;
  white-space: nowrap;
  font-size: 0.75rem /* 12px */;
  line-height: 1rem /* 16px */;
  border-width: ${(props) => props.mode != props.currentMode && "1px"};
  padding: 1rem /* 16px */;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  --tw-bg-opacity: 1;
  --tw-text-opacity: 1;
  color: ${(props) =>
    props.mode === props.currentMode &&
    "rgb(255 255 255 / var(--tw-text-opacity))"};
  background-color: ${(props) =>
    props.mode === props.currentMode &&
    "rgb(2 132 199 / var(--tw-bg-opacity))"};
  &:hover {
    background-color: rgb(2 132 199 / var(--tw-bg-opacity));
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }
  @media (min-width: 768px) {
    font-size: 1.125rem /* 18px */;
    line-height: 1.75rem /* 28px */;
  }
`;

export async function getServerSideProps({ query, req }) {
  try {
    const res = await authRequest.get(`/plan/all/1`, {
      cookie: req.headers.cookie,
    });
    return {
      props: {
        plans: res.data.plans || [],
      },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
}
//얘는 진짜 전체 플랜목록인데 