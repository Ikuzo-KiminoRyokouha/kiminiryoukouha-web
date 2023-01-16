import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Context,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import { Info } from "../../types/plan.interface";
import Calendar from "../common/Calendar";
import planTagTypeMap from "@/utils/dataMap/planTagTypeMap.json";
import styled from "styled-components";

interface StepProps {
  ctx: Context<{
    info: Info;
    setInfo: Dispatch<SetStateAction<Info>>;
  }>;
}

export function StepOne({ ctx }: StepProps) {
  const { info, setInfo } = useContext(ctx);

  const [startDate, setStartDate] = useState<dayjs.Dayjs>(
    info.startDate ? dayjs(info.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(
    info.endDate ? dayjs(info.endDate) : undefined
  );

  useEffect(() => {
    if (startDate && endDate) {
      const diffDate = dayjs(endDate).diff(dayjs(startDate), "d") + 1;
      const tagObj = {};
      for (let i = 1; i <= diffDate; i++) {
        tagObj[i] = [];
      }

      setInfo((prev) => ({
        ...prev,
        startDate: startDate?.format("YYYY-MM-DD"),
        endDate: endDate?.format("YYYY-MM-DD"),
        tag: { ...tagObj },
      }));
    }
  }, [startDate, endDate]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-2 md:flex-row">
      <Calendar
        className="flex-1 items-center justify-center"
        mode="startEnd"
        getStartDate={(date) => setStartDate(date)}
        getEndDate={(date) => setEndDate(date)}
      />
      <div className="flex flex-1 flex-col justify-center pl-10">
        <label className="text-md mb-2 block font-medium text-gray-900">
          예상 시간
        </label>
        <div className="flex min-h-[48px] items-center justify-between">
          <span className="w-28 border p-3">
            {startDate?.format("YYYY-MM-DD")}
          </span>
          <span className="w-28 border p-3">
            {endDate?.format("YYYY-MM-DD")}
          </span>
        </div>
      </div>
    </div>
  );
}

export function StepTwo({ ctx }: StepProps) {
  const { info, setInfo } = useContext(ctx);
  const [revealTag, setRevealTag] = useState([]);
  const [key, setKey] = useState<string>("1");
  const [tag, setTag] = useState(info.tag);

  useLayoutEffect(() => {
    if (revealTag.length === 0) {
      const revealTag = Array.from(Object.keys(planTagTypeMap)).map(
        (key) => planTagTypeMap[key]
      );
      setRevealTag((prev) =>
        [...prev, ...revealTag].reduce(
          (ac, v) => (ac.includes(v) ? ac : [...ac, v]),
          []
        )
      );
    }
  }, []);

  console.log(tag);

  const updateTag = (targetTag: string) => {
    const isInclude = tag[key].includes(targetTag);
    setTag((prev) => {
      const newObj: any = { ...prev };
      console.log(newObj);
      isInclude
        ? (newObj[key] = prev[key].filter((tag) => tag != targetTag))
        : newObj[key].push(targetTag);
      newObj[key] = newObj[key].reduce(
        (ac, v) => (ac.includes(v) ? ac : [...ac, v]),
        []
      );
      return newObj;
    });
  };

  useEffect(() => {
    return () => {
      setInfo((prev) => {
        return { ...prev, tag: { ...tag } };
      });
    };
  }, [tag]);

  return (
    <>
      <div className="p-2">
        <label
          htmlFor="countries"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Region
        </label>
        <select
          onChange={(e) =>
            e.target.value &&
            setInfo((prev) => ({ ...prev, region: e.target.value }))
          }
          id="countries"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          <option selected={info.region ? true : false} value={""}>
            Choose a region
          </option>
          <option selected={info.region === "경주" ? true : false} value="경주">
            경주
          </option>
        </select>
      </div>
      <div className="p-2">
        <div className="space-x-3">
          {Array.from(Object.keys(tag)).map((el, idx) => {
            return (
              <DateButton
                className={`${key === el ? "bg-teal-600" : "bg-slate-400"}`}
                key={el + " " + idx}
                onClick={() => {
                  setKey(el);
                }}
              >
                {el}일차
              </DateButton>
            );
          })}
        </div>
        <div className="py-3">tag</div>
        {revealTag.map((el, idx) => (
          <button
            onClick={() => updateTag(el)}
            key={el}
            className={`m-2 rounded bg-gray-400 ${
              tag[key].includes(el) ? "bg-emerald-500" : "bg-gray-400"
            } px-2 py-2 text-sm font-medium text-white`}
          >
            {el}
          </button>
        ))}
      </div>
    </>
  );
}

const DateButton = styled.button`
  padding: 0.75rem;
  border-radius: 0.5rem /* 8px */;
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
`;

export function StepThree({ ctx }: StepProps) {
  const { info, setInfo } = useContext(ctx);
  return (
    <div className="flex flex-1 flex-col">
      <p className="text-sm">이게 마지막이에요! 화이팅!!</p>
      <div className="flex-1">
        <div>
          <label className="mb-2 block pt-4 text-sm font-medium text-gray-900">
            총금액
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

  const onClick = () => {
    router.replace(
      {
        pathname: "/plan/new/planDetail",
        query: {
          info: JSON.stringify(info),
        },
      },
      "/plan/new/planDetail"
    );
  };

  return (
    <>
      <div className="relative flex h-72 w-full flex-1 flex-col">
        <Image src={"/assets/done.png"} layout="fill" />
      </div>
      <div className="flex w-full justify-center">
        <button
          onClick={onClick}
          className=" mt-9 bg-sky-600 px-6 py-3 text-white"
        >
          complete
        </button>
      </div>
    </>
  );
}
