import { useRouter } from "next/router";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";
import { useToggle } from "@/hooks";
import Image from "next/image";
import { BsShare } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import SideBar from "../../components/plan/SideBar";
import MyModal from "components/MyModal";

export default function Index() {
  const router = useRouter();
  const activeVisible = useToggle(true);
  const readyVisible = useToggle(true);
  const deleting = useToggle(false);

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
          <div className="flex space-x-4 border p-2">
            <div className="basis-1/12 text-center">
              <p className="text-xl font-semibold">경주</p>
              <Image
                src="/assets/main-img.png"
                width={1}
                height={1}
                layout="responsive"
              />
            </div>
            <div className="flex flex-1 flex-col justify-around">
              <p>계획 일시 : 2023-01-10 ~ 2023-01-12</p>
              <p>예산 :300000원</p>
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
                  className="bg-red-400 p-1 text-white"
                  onClick={deleting.setTrue}
                >
                  <AiOutlineDelete />
                </button>
              </div>
              <button
                onClick={() => router.push("/plan/detail")}
                className="bg-gray-500 px-2 py-1 text-white"
              >
                詳しく見る
              </button>
            </div>
          </div>
          {/* {!data && (
            <p className="p-3 text-lg font-bold">
              おや、まだ旅行計画がありませんね、一緒に立ててみませんか
            </p>
          )} */}
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
      {deleting.value ? (
        <MyModal
          title={"경주"}
          date={"2023-01-10 ~ 2023-01-12"}
          offModal={deleting.setFalse}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
