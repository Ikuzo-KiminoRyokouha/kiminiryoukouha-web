import dayjs from "dayjs";
import { LatLng } from "../types/tmap.type";

/**
 * @description 시작날짜와 끝날짜를 받아서 한국어로 바꿉니다.
 * @param start 시작날짜
 * @param end 끝날짜
 * @returns
 */
export const convertDateToKorean = (start: string, end: string): string => {
  const diffDate = dayjs(end).diff(dayjs(start), "d");
  if (diffDate === 0) return "당일치기";
  return diffDate + "박" + Number(diffDate + 1) + "일";
};
