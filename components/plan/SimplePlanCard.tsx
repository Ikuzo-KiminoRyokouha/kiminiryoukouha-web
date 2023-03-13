import Image from "next/image";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai";
import { BsShare } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { Plan } from "../../types/plan.interface";
import dayjs from "dayjs";
import { useToggle } from "../../hooks";
import { Modal, Portal } from "../common/modal";
import mainRequest from "../../utils/request/mainRequest";

interface Props {
  plan: Plan;
}

export default function SimplePlanCard({ plan }: Props) {
 
  const router = useRouter();
  const deleting = useToggle(false);
  const src = useMemo(() => {
    const arr = plan.travels.filter((el) => el.destination.firstimage != "");
    if (arr.length === 0) return "/assets/main-img.png";
    return arr[0].destination.firstimage;
  }, []);

  return (
    <div className="flex w-full space-x-4 border p-2 shadow-md drop-shadow-sm">
      <div className="basis-1/12 text-center">
        <p className="text-lg">{plan.title.split(" ")[0]}</p>
        <Image
          className="rounded-full"
          src={src }
          width={1}
          height={1}
          layout="responsive"
        />
      </div>
      <div className="flex flex-1 flex-col justify-around">
        <p className="hidden md:block">
          계획 일시 : {dayjs(plan.start).format("MM-DD")} ~
          {dayjs(plan.end).format("MM-DD")}
        </p>
        <div className="block md:hidden">
          <p>계획 일시</p>
          <p className="leading-6">
            {dayjs(plan.start).format("MM-DD")} ~
            {dayjs(plan.end).format("MM-DD")}
          </p>
        </div>
        <p>예산 : {plan.totalCost} 원</p>
        <p>
          테마 :{" "}
          {Object?.keys(plan?.tag)
            .map((key, idx) => {
              return plan.tag[key];
            })
            .join(", ")}
        </p>
      </div>
      {/* <div className="relative flex flex-1 flex-col"></div> */}
      <div className="flex flex-col justify-between space-y-2">
        <div className="space-x-3">
          <button className="p-1 text-sky-600">
            <BsShare />
          </button>
          <button className="p-1 text-teal-600">
            <FiEdit />
          </button>
          <button
            onClick={() => deleting.setTrue()}
            className=" p-1 text-red-400"
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
          className=" px-2 py-1 text-gray-500"
        >
          자세히 보기
        </button>
      </div>
      {deleting.value && (
        <DeletingModal
          planId={plan.id}
          title={"경주"}
          date={
            dayjs(plan.start).format("YYYY-MM-DD") +
            "~" +
            dayjs(plan.end).format("YYYY-MM-DD")
          }
          hide={deleting.setFalse}
        />
      )}
    </div>
  );
}

interface ModalProps {
  planId: number;
  title: string;
  date: string;
  hide: () => void;
}

function DeletingModal({ title, date, planId, hide }: ModalProps) {
  const router = useRouter();
  const deletePlan = useCallback(async () => {
    try {
      const res = await mainRequest.delete(`/plan/${planId}`);
      router.reload();
    } catch (err) {
      console.log(err);
    }
  }, [planId]);
  return (
    <>
      <Portal qs={"#__next"}>
        <Modal hide={hide}>
          <Modal.Header hide={hide} />
          <div className="flex h-28">
            <div className="h-full w-1/3 bg-blue-200">
              <Modal.Image src="/assets/main-img.png" />
            </div>
            <div className="flex flex-col justify-around pl-4">
              <span className="text-lg">계획이름 : {title}</span>
              <span className="text-lg">계획일시 : </span>
              <span className="text-base">{date}</span>
            </div>
          </div>
          <div className="flex justify-center pt-6">
            <span className="py-5 text-xl">
              정말 이 계획을 삭제하시겠습니까?
            </span>
          </div>
          <Modal.Footer>
            <button
              onClick={deletePlan}
              className="h-10 flex-1 border-r-2 bg-sky-600 text-lg font-bold text-white"
            >
              삭제
            </button>
            <button className="h-10 flex-1 text-lg font-bold" onClick={hide}>
              취소
            </button>
          </Modal.Footer>
        </Modal>
      </Portal>
    </>
  );
}
function useCallBack(arg0: () => void, arg1: undefined[]) {
  throw new Error("Function not implemented.");
}
