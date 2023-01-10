import { LatLng } from "../types/tmap.type";

/**
 * @description 출발지점과 끝지점의 좌표를 받아 거리를 리턴해주는 함수입니다.
 */
export const getDistanceFromLatLon = (start: LatLng, end: LatLng): number => {
  function deg2rad(deg: any) {
    return deg * (Math.PI / 180);
  }

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(end.lat - start.lat); // deg2rad below
  var dLon = deg2rad(end.lng - start.lng);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(start.lat)) *
      Math.cos(deg2rad(end.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};

/**
 * @description 초 정보를 받아 문자열로 리턴해주는 함수입니다.
 * @param {number} sec 초 정보
 */
export const convertSecToTimeObj = (sec: number) => {
  let min = Math.floor(sec / 60);
  if (min < 0) {
    return { sec };
  }
  if (min < 60) {
    return { min, sec };
  }
  let hour = Math.floor(min / 60);
  min -= hour * 60;

  return { hour, min, sec };
};
