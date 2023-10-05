import dayjs from "dayjs";
import { LatLng, Orientation } from "../types/tmap.type";
import { Dispatch, SetStateAction } from "react";

/**
 * @description 시작날짜와 끝날짜를 받아서 한국어로 바꿉니다.
 * @param start 시작날짜
 * @param end 끝날짜
 * @returns
 */
export const convertDateToKorean = (start: string, end: string): string => {
  const diffDate = dayjs(end).diff(dayjs(start), "d");
  if (diffDate === 0) return "日帰り";
  return diffDate + "泊" + Number(diffDate + 1) + "日";
};

export const cookieStringToObject = (cookieString: string | string[]): any => {
  if (!cookieString) {
    return "";
  } else {
    cookieString = (cookieString as string).split("; ");
    let result = {};

    for (var i = 0; i < cookieString.length; i++) {
      var cur = cookieString[i].split("=");
      result[cur[0]] = cur[1];
    }
    return result;
  }
};

/**
 * @description 월(month)를 받아서 영어 month로 바꿉니다.
 */
export function convertMonthToEnglish(month) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (month >= 1 && month <= 12) {
    return monthNames[month - 1];
  } else {
    return "Invalid month";
  }
}

/**
 * @description 디바이스의 방향정보를 받아오기 위한 이벤트 리스너 입니다.
 */
function orientationHandler(
  e: DeviceOrientationEvent,
  setState: Dispatch<SetStateAction<Orientation>>
) {
  const { alpha, beta, gamma, absolute } = e;
  setState({ alpha, beta, gamma, absolute });
}

/**
 * @descrip
 * tion 핸들러 삭제를 위해 핸들러에 대한 정보를 답아줄 변수입니다.
 */
let handlerWrapper;

/**
 * @description 디바이스 방향정보를 받아오는 리스너를 등록하는 함수
 */
export const getOrientation = (
  setState: Dispatch<SetStateAction<Orientation>>
) => {
  handlerWrapper = (e) => orientationHandler(e, setState);

  window.addEventListener("deviceorientationabsolute", handlerWrapper, true);
};

/**
 * @description 디바이스 방향정보를 받아오는 리스너를 삭제하는 함수
 */
export const stopOrientation = () => {
  window.removeEventListener("deviceorientationabsolute", handlerWrapper, true);
};
