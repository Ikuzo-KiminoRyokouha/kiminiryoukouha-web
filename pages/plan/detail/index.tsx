import dayjs from "dayjs";
import { useLayoutEffect, useState } from "react";
import { MdArrowRight, MdArrowDropDown } from "react-icons/md";

import DetailCard from "../../../components/plan/DetailCard";
import { Plan } from "../../../types/plan.interface";
import mainRequest from "../../../utils/request/mainRequest";

interface Props {
  plan: Plan;
}

export default function PlanDetail({ plan }: Props) {
  const [period, setPeriod] = useState<number>(0);
  console.log(period+"period")
  console.log(plan)
  console.log(plan.travels)

  

  useLayoutEffect(() => {
    setPeriod(dayjs(plan.end).diff(dayjs(plan.start), "d") + 1);
  }, []);

  return (
    <div className="mx-auto mb-[53px] flex max-h-full w-full max-w-7xl flex-1 lg:mb-0 ">
      <div className="w-full space-y-4 p-4 ">
        <div className="rounded-lg border-2">
          <div className="mb-4 pt-4 text-center text-4xl font-bold ">
            {plan.title}
          </div>

          <div className="flex ">
            <nav className="ml-auto font-mono text-lg  ">
              <span className=" mr-2 cursor-pointer rounded-lg pl-1 hover:text-[#E8A45F]">
                체크리스트
              </span>
              <span className=" mr-2 rounded-lg px-1 ">가계부</span>
              <span className=" mr-2 rounded-lg px-1">메모하기</span>
            </nav>
          </div>
        </div>
        <div>
          {Array.from(Array(period)).map((_, idx) => {
            return (
              <DayPlanList plan={plan} idx={idx}/>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const DayPlanList = ({plan,idx}) => {
  const [test,setTest]=useState(true)

return  <> <div className="flex items-center justify-between border p-2">
<div className="flex items-center space-x-4">
  <span className="text-xl font-bold">{idx + 1}일차</span>
  <span>
    {dayjs(plan.start).add(idx, "d").format("YYYY-MM-DD")}
  </span>
</div>
<div>
  {
    test===true?
      <MdArrowRight onClick={()=>{setTest(!test)}} size={30} ></MdArrowRight>
    :<MdArrowDropDown onClick={()=>{setTest(!test)}} size={30}  ></MdArrowDropDown>
  }
  

</div>
</div>
<div className="flex flex-wrap">
{test===true?
plan.travels.map((travel) => {
  if (
    dayjs(travel.startDay).format("YYYY-MM-DD") ===
    dayjs(plan.start).add(idx, "d").format("YYYY-MM-DD")
  )
    return <DetailCard planId={plan.id} travel={travel}   />;
}):null
}
</div></>
}

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
