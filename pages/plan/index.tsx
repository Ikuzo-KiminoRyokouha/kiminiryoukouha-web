import { AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Plan } from "../../types/plan.interface";
import dayjs from "dayjs";
import SimplePlanCard from "../../components/plan/SimplePlanCard";
import { useRouter } from "next/router";
import "@/utils/extension/array.extension";
import authRequest from "../../utils/request/authRequest";
import Image from "next/image";

export default function Index({ plans }) {
  let [mode, setMode] = useState(0);

  const router = useRouter();

  const [activatedPlans, setActivatedPlans] = useState<Array<Plan>>();
  const [waitingPlans, setWaitingPlans] = useState<Array<Plan>>();
  const [endPlans, setEndPlans] = useState<Array<Plan>>();

  useEffect(() => {
    setEndPlans(() => {
      return plans?.filter((plan) => dayjs().isAfter(dayjs(plan.end)));
    });

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
      <div className="mx-auto mb-[53px] flex w-full max-w-6xl  flex-col  flex-wrap">
        {/* <img className="  w-full h-80 opacity-50 bg-cover "  src="/assets/test1.jpg" alt="12" /> */}
        <div className="mt-12 flex w-full">
          <div className="flex h-48  w-1/5 items-center pl-5">
            <div className="relative h-48  w-48 rounded text-center text-lg text-white">
              <Image src={"/assets/main-img.png"} layout={"fill"} />
            </div>
          </div>

          <div className="flex h-48 w-4/5 pt-3">
            <div className="flex flex-col items-center space-y-4 px-10">
              <p className="cursor-pointer text-xl font-semibold">나의계획</p>
              <p className="cursor-pointer text-lg">{plans.length}개</p>
            </div>
            <div className="flex flex-col items-center space-y-4 px-10">
              <p className="cursor-pointer text-xl font-semibold">계획 리뷰</p>
              <p className="cursor-pointer text-lg">0개</p>
            </div>
          </div>
        </div>
        <strong className="py-10 pl-4 text-3xl">나의계획</strong>

        <div className=" flex w-full  space-x-4  p-4">
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
  border-radius: 1.3rem;
  cursor: pointer;
  white-space: nowrap;
  font-size: 0.75rem;
  line-height: 1rem;
  border-width: ${(props) => props.mode != props.currentMode && "1px"};
  padding: 1rem;
  transition-duration: 250ms;
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
