import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Context,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { useInput } from "../../hooks";
import { Info } from "../../types/plan.interface";
import Calendar from "../common/Calendar";

interface StepProps {
  ctx: Context<{
    info: Info;
    setInfo: Dispatch<SetStateAction<Info>>;
  }>;
}

export function StepOne({ ctx }: StepProps) {
  const theme = useInput("", "選べたいテーマを入力してください");
  const { info, setInfo } = useContext(ctx);

  const inputTag = () => {
    if (theme.value.startsWith("#")) {
      const v = theme.value.substring(1);
      setInfo((prev) => ({ ...prev, theme: [...prev.theme, v] }));
      theme.onChange("");
    }
  };

  return (
    <>
      <div className="p-2">
        <label
          htmlFor="countries"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Select an option
        </label>
        <select
          onChange={(e) =>
            e.target.value &&
            setInfo((prev) => ({ ...prev, contry: e.target.value }))
          }
          id="countries"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          <option selected value={""}>
            Choose a country
          </option>
          <option value="KR">Korea</option>
        </select>
      </div>
      <div className="p-2">
        <label
          htmlFor="theme"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          お遊びテーマは何ですか
        </label>
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              inputTag();
            }
          }}
          {...theme}
          className=" block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900"
        ></input>
        <p className="p-2 text-xs text-gray-500">
          #の後に選べたいテーマを入力し、エンターキーを押したらテーマが選べます
        </p>
        {info.theme.map((el) => (
          <span className="mr-2 rounded bg-gray-400 px-2.5 py-0.5 text-sm font-medium text-white dark:bg-gray-700 dark:text-gray-300">
            {el}
          </span>
        ))}
      </div>
    </>
  );
}

export function StepTwo({ ctx }: StepProps) {
  const { info, setInfo } = useContext(ctx);

  const [startDate, setStartDate] = useState<dayjs.Dayjs>();
  const [endDate, setEndDate] = useState<dayjs.Dayjs>();

  useEffect(() => {
    startDate &&
      endDate &&
      setInfo((prev) => ({
        ...prev,
        startDate: startDate?.format("YYYY-MM-DD"),
        endDate: endDate?.format("YYYY-MM-DD"),
      }));
  }, [startDate, endDate]);

  return (
    <div className="flex flex-1 items-center justify-center p-2">
      <Calendar
        className="flex-1 items-center justify-center"
        mode="startEnd"
        getStartDate={(date) => setStartDate(date)}
        getEndDate={(date) => setEndDate(date)}
      />
      <div className="flex flex-1 flex-col justify-center pl-10">
        <label className="mb-2 block text-lg font-medium text-gray-900">
          予定期間
        </label>
        <div className="min-h-[48px] border text-center">
          <span className="m-auto text-lg">
            {startDate?.format("YYYY-MM-DD")} -{endDate?.format("YYYY-MM-DD")}
          </span>
        </div>
        <label className="mb-2 block text-lg font-medium text-gray-900">
          予想人数
        </label>
        <input
          type={"number"}
          value={info.people}
          onChange={(e) => {
            setInfo((prev) => ({
              ...prev,
              people: parseInt(e.target.value),
            }));
          }}
          className=" block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900"
        ></input>
      </div>
    </div>
  );
}

export function StepThree({ ctx }: StepProps) {
  const { info, setInfo } = useContext(ctx);
  return (
    <div className="flex flex-1 flex-col">
      <p>これが最後の項目です！もうちょっと頑張りましょう</p>
      <div className="flex-1">
        <div>
          <label className="mb-2 block pt-4 text-sm font-medium text-gray-900">
            送金額
          </label>
          <input
            type={"number"}
            value={info.money}
            onChange={(e) => {
              setInfo((prev) => ({
                ...prev,
                money: parseInt(e.target.value),
              }));
            }}
            className=" block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900"
          ></input>
        </div>
      </div>
    </div>
  );
}

export function StepFour({ ctx }: StepProps) {
  const router = useRouter();
  const { info } = useContext(ctx);
  return (
    <>
      <div className="relative flex h-72 w-full flex-1 flex-col">
        <Image src={"/assets/done.png"} layout="fill" />
      </div>
      <div className="flex w-full justify-center">
        <button
          onClick={() =>
            router.replace(
              {
                pathname: "/plan/new/detail",
                query: {
                  info: JSON.stringify(info),
                },
              },
              "/plan/detail"
            )
          }
          className=" mt-9 bg-sky-600 px-6 py-3 text-white"
        >
          complete
        </button>
      </div>
    </>
  );
}
