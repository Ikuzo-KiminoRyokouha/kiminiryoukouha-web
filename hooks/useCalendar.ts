import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";

/**
 * @description Calendar component에서 쓰는 비지니스 로직을 모아놓은 함수입니다.
 */
export default function useCalendar() {
  /**
   * @description 월별로 끝나는 날
   */
  const DateOfMonth = useMemo(
    () => ({
      1: 31,
      2:
        (dayjs().year() % 4 == 0 && dayjs().year() % 100 != 0) ||
        dayjs().year() % 400 == 0
          ? 29
          : 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31,
    }),
    [dayjs().year()]
  );

  /**
   * 월 별 문자열
   */
  const MonthtoString = useMemo(
    () => ({
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "Nobember",
      12: "December",
    }),
    []
  );
  /* 선택 일*/
  const [d, setD] = useState(dayjs().date());
  /* 선택 월 */
  const [m, setM] = useState(dayjs().month());
  /* 선택 년도 */
  const [y, setY] = useState(dayjs().year());
  /* 선택된 날짜의 dayjs 타입 */
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>();
  /* calendar내부에서만 쓰는 함수 */
  const [startDay, setStartDay] = useState<number>(
    dayjs().set("date", 1).day()
  );
  /* mode가 startEnd일 때, 시작 날짜 */
  const [startDate, setStartDate] = useState<dayjs.Dayjs>();
  /* mode가 startEnd일 때, 끝 날짜 */
  const [endDate, setEndDate] = useState<dayjs.Dayjs>();
  /* 월별로 월이 끝나는 날 */
  const [monthEndDate, setMonthEndDate] = useState<number>(DateOfMonth[m + 1]);

  useEffect(() => {
    setStartDay(dayjs().set("month", m).set("date", 1).day());
    setMonthEndDate(DateOfMonth[m + 1]);
  }, [m]);

  useEffect(() => {
    setSelectedDate(dayjs(`${y - m - d}`));
  }, [y, m, d]);

  /**
   * @description 다음 달로 달력을 이동시켜주는 함수
   */
  const nextMonth = () => {
    if (m == 11) {
      setM(0);
      setY(y + 1);
      setD(undefined);

      return;
    }
    setM((prev) => prev + 1);
    setD(undefined);
  };

  /**
   * @description 저번 달로 달력을 이동시켜주는 함수
   */
  const prevMonth = () => {
    if (m == 1) {
      setM(11);
      setY((prev) => prev - 1);
      setD(undefined);

      return;
    }
    setM((prev) => prev - 1);
    setD(undefined);
  };

  /**
   * @description 날짜 선택함수
   */
  const setDate = (date: number) => {
    setD(date);
  };

  return {
    d,
    m,
    y,
    startDay,
    monthEndDate,
    selectedDate,
    DateOfMonth,
    MonthtoString,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    nextMonth,
    prevMonth,
    setDate,
  };
}
