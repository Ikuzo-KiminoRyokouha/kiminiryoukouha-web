import { LatLng } from "../types/tmap.type";

/**
 * @description 출발지점과 끝지점의 좌표를 받아 거리를 리턴해주는 함수입니다.
 */
export const getDistanceFromLatLon = (start: LatLng, end: LatLng): number => {
  function deg2rad(deg: any) {
    return deg * (Math.PI / 180);
  }

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(parseFloat(end.lat) - parseFloat(start.lat)); // deg2rad below
  var dLon = deg2rad(parseFloat(end.lng) - parseFloat(start.lng));
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(parseFloat(start.lat))) *
      Math.cos(deg2rad(parseFloat(end.lat))) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};
