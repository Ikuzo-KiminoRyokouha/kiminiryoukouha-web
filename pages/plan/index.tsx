import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineHome,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";
import { useToggle } from "../../hooks";
import Image from "next/image";
import { BsShare } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

export default function Index() {
  const router = useRouter();
  const activeVisible = useToggle(true);
  const readyVisible = useToggle(true);

  const [data, setData] = useState<any>();
  useEffect(() => {
    axios.get("http://localhost:3001/plan").then((res) => setData(res.data));
  }, []);
  console.log(data);
  return (
    <div className="max-w-8xl mx-auto mb-[53px] flex max-h-full w-full flex-1 lg:mb-0">
      <div className="basis-1/5 border">
        <ul className="p-2">
          <li className="flex w-full space-x-3 border bg-sky-600 p-2 text-white">
            <AiOutlineHome />
            <span>Home</span>
          </li>
        </ul>
      </div>
      <div className="basis-4/5 space-y-4 p-4">
        <div className="text-xl font-semibold">計画</div>
        <div>
          <div
            onClick={activeVisible.onClick}
            onMouseDown={(e) => e.preventDefault()}
            className="flex w-full cursor-pointer space-x-2 border p-4"
          >
            {!activeVisible.value && <RiArrowDropRightLine size={18} />}
            {activeVisible.value && <RiArrowDropDownLine size={18} />}
            <span>活性化されている計画</span>
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
            <span>準備中の計画</span>
          </div>
          {data?.map((item) => {
            return (
              <div className="flex space-x-4 border p-2" key={item.id}>
                <div className="basis-1/12 text-center">
                  <p className="text-xl font-semibold">
                    {item.info.contry && "한국"}
                  </p>
                  <Image
                    src="/assets/main-img.png"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-around">
                  <p>
                    計画日時 : {item.info.startDate} - {item.info.endDate}
                  </p>
                  <p>予算 : {item.info.money}円</p>
                  <p>
                    テーマ :{" "}
                    {item.info.theme.map((el) => (
                      <span>{el}</span>
                    ))}
                  </p>
                  <p>人数 : {item.info.people}</p>
                </div>
                <div className="relative flex flex-1 flex-col">
                  <div className="absolute overflow-hidden">
                    {Object.keys(item.placeByDate || {}).map((el) => {
                      return (
                        <div className="p-0.5">
                          <span>
                            {el} : {item.placeByDate[el].length}件
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col justify-between space-y-2">
                  <div className="space-x-3">
                    <button className="bg-sky-600 p-1 text-white">
                      <BsShare />
                    </button>
                    <button className="bg-teal-600 p-1 text-white">
                      <FiEdit />
                    </button>
                    <button className="bg-red-400 p-1 text-white">
                      <AiOutlineDelete />
                    </button>
                  </div>
                  <button
                    onClick={() => router.push(`/plan/detail/${item.id}`)}
                    className="bg-gray-500 px-2 py-1 text-white"
                  >
                    詳しく見る
                  </button>
                </div>
              </div>
            );
          })}
          {!data && (
            <p className="p-3 text-lg font-bold">
              おや、まだ旅行計画がありませんね、一緒に立ててみませんか
            </p>
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
