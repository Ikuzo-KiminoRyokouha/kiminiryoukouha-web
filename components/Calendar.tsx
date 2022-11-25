import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import useCalendar from "../hooks/useCalendar";

interface Props {
  getDate?: (date: dayjs.Dayjs) => void;
  getStartDate?: (date: dayjs.Dayjs) => void;
  getEndDate?: (date: dayjs.Dayjs) => void;
  mode?: "single" | "startEnd";
}

export default function Calendar({
  getDate,
  getStartDate,
  getEndDate,
  mode = "single",
}: Props) {
  const {
    d,
    m,
    y,
    startDay,
    startDate,
    endDate,
    monthEndDate,
    selectedDate,
    DateOfMonth,
    MonthtoString,
    setStartDate,
    setEndDate,
    nextMonth,
    prevMonth,
    setDate,
  } = useCalendar();

  /* 선택된 날짜가 바뀔때마다 바뀐 날짜를 반환해주는 effect*/
  useEffect(() => {
    getDate && getDate(selectedDate);
  }, [selectedDate]);

  /* mode가 startEnd일떄 시작 날짜가 바뀔때마다 바뀐 날짜를 반환해주는 effect*/
  useEffect(() => {
    getStartDate && getStartDate(startDate);
  }, [startDate]);

  /* mode가 startEnd일떄 시작 날짜가 바뀔때마다 바뀐 날짜를 반환해주는 effect*/
  useEffect(() => {
    getEndDate && getEndDate(endDate);
  }, [endDate]);

  const [count, setCount] = useState<number>(0);

  const setMultiDateFn = useCallback(
    (date: dayjs.Dayjs) => {
      if (count % 2 === 0) {
        setStartDate(date);
        setEndDate(undefined);
        setCount((prev) => prev + 1);
      } else {
        if (startDate?.isBefore(date)) {
          setEndDate(date);
          setCount((prev) => prev + 1);
        }
      }
    },
    [count, startDate]
  );

  console.log(count);

  return (
    <div className="flex rounded-md bg-white shadow-lg">
      <div>
        {/* 달 과 달 앞뒤 이동 아이콘 맨 위에있는거 */}
        <div className="flex flex-col px-6 pt-3 pb-6">
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={prevMonth}
              className="flex items-center justify-center rounded-xl p-2"
            >
              <svg className="h-6 w-6 stroke-current text-gray-900" fill="none">
                <path
                  d="M13.25 8.75L9.75 12l3.5 3.25"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="p-2">{MonthtoString[m + 1]}</div>
            <button
              onClick={nextMonth}
              className="flex items-center justify-center rounded-xl p-2"
            >
              <svg className="h-6 w-6 stroke-current text-gray-900" fill="none">
                <path
                  d="M10.75 8.75l3.5 3.25-3.5 3.25"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-7 text-center text-xs text-gray-900">
            {/*  요일 한줄 */}
            <span className="item-cetner flex h-10 w-10 justify-center rounded-lg">
              Su
            </span>
            <span className="item-cetner flex h-10 w-10 justify-center rounded-lg">
              Mo
            </span>
            <span className="item-cetner flex h-10 w-10 justify-center rounded-lg">
              Tu
            </span>
            <span className="item-cetner flex h-10 w-10 justify-center rounded-lg">
              We
            </span>
            <span className="item-cetner flex h-10 w-10 justify-center rounded-lg">
              Th
            </span>
            <span className="item-cetner flex h-10 w-10 justify-center rounded-lg">
              Fr
            </span>
            <span className="item-cetner flex h-10 w-10 justify-center rounded-lg">
              Sa
            </span>
            {/* 날짜 시작 */}
            {Array.from({ length: 42 }).map((_, idx) => {
              if (idx < startDay) {
                return (
                  <span
                    key={idx}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-300"
                  >
                    {DateOfMonth[m == 0 ? 12 : m] + idx + 1 - startDay}
                  </span>
                );
              } else if (idx - startDay >= monthEndDate) {
                return (
                  <span
                    key={idx}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-300"
                  >
                    {idx - startDay - monthEndDate}
                  </span>
                );
              }
              const date = idx - startDay + 1;
              console.log(
                startDate?.isAfter(dayjs(`${y}-${m}-${date}`)) &&
                  endDate?.isBefore(dayjs(`${y}-${m}-${date}`))
              );
              return (
                <div
                  key={idx}
                  className={`${
                    startDate?.isBefore(dayjs(`${y}-${m}-${date}`)) &&
                    endDate?.isAfter(dayjs(`${y}-${m}-${date}`))
                      ? "bg-sky-200"
                      : ""
                  } ${
                    startDate?.isSame(dayjs(`${y}-${m}-${date}`))
                      ? " rounded-l-full bg-sky-200 text-white"
                      : ""
                  } ${
                    endDate?.isSame(dayjs(`${y}-${m}-${date}`))
                      ? " rounded-r-full bg-sky-200 text-white"
                      : ""
                  }`}
                >
                  <button
                    id="bt"
                    onClick={() => {
                      if (mode === "single") {
                        setDate(date);
                      } else if (mode === "startEnd") {
                        setMultiDateFn(dayjs(`${y}-${m}-${date}`));
                      }
                    }}
                    className={`flex h-10 w-10 items-center  justify-center rounded-full ${
                      d === date ? "bg-teal-200 text-white" : ""
                    }  ${
                      startDate?.isSame(dayjs(`${y}-${m}-${date}`)) ||
                      endDate?.isSame(dayjs(`${y}-${m}-${date}`))
                        ? "bg-sky-500 text-white"
                        : ""
                    }`}
                  >
                    {date}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
