import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai";
import { BsShare } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { Plan } from "../../types/plan.interface";
import dayjs from "dayjs";
import { useToggle } from "../../hooks";

interface Props {
  plan: Plan;
}

export default function SimplePlanCard({ plan }: Props) {
  const router = useRouter();
  const toggle = useToggle(false);

  return (
    <div className="flex space-x-4 border p-2">
      <div className="basis-1/12 text-center">
        <p className="text-lg">{plan.title.split(" ")[0]}</p>
        <Image
          src="/assets/main-img.png"
          width={1}
          height={1}
          layout="responsive"
        />
      </div>
      <div className="flex flex-1 flex-col justify-around">
        <p>
          계획 일시 : {dayjs(plan.start).format("YYYY-MM-DD")} ~
          {dayjs(plan.end).format("YYYY-MM-DD")}
        </p>
        <p>예산 :{plan.totalCost} 원</p>
        <p>테마 : 역사여행</p>
      </div>
      <div className="relative flex flex-1 flex-col"></div>
      <div className="flex flex-col justify-between space-y-2">
        <div className="space-x-3">
          <button className="bg-sky-600 p-1 text-white">
            <BsShare />
          </button>
          <button className="bg-teal-600 p-1 text-white">
            <FiEdit />
          </button>
          <button
            onClick={() => toggle.setTrue()}
            className="bg-red-400 p-1 text-white"
          >
            <AiOutlineDelete />
          </button>
        </div>
        <button
          onClick={() =>
            router.push(
              {
                pathname: "/plan/detail",
                query: {
                  planId: plan.id,
                },
              },
              "/plan/detail"
            )
          }
          className="bg-gray-500 px-2 py-1 text-white"
        >
          詳しく見る
        </button>
      </div>
    </div>
  );
}
