import { degToRad } from "three/src/math/MathUtils";
import { LatLng } from "../../types/tmap.type";

/**
 * @description 위도와 경도를 바탕으로 미터 거리를 계산해주는 함수입니다.
 */
export function computeDistanceMeters(base: LatLng, dest: LatLng) {
  var dlongitude = degToRad(dest.lng - base.lng);
  var dlatitude = degToRad(dest.lat - base.lat);

  var a =
    Math.sin(dlatitude / 2) * Math.sin(dlatitude / 2) +
    Math.cos(degToRad(base.lat)) *
      Math.cos(degToRad(dest.lat)) *
      (Math.sin(dlongitude / 2) * Math.sin(dlongitude / 2));
  var angle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // var distance = angle * 6378160;

  var distance = angle * 6378135;

  return distance;
}

/***
 * @description 기준좌표와 상대좌표를 기반으로 기준좌표기준 상대좌표의 vector값을 리턴해줍니다.
 */
export function getXYZFromLatLng(base: LatLng, dest: LatLng) {
  const position = { x: 0, y: 0, z: 0 };
  // update position.x
  let dstCoords = {
    lng: dest.lng,
    lat: base.lat,
  };

  position.x = computeDistanceMeters(base, dstCoords);
  position.x *= dest.lng > base.lng ? 1 : -1;

  // update position.z
  dstCoords = {
    lng: base.lng,
    lat: dest.lat,
  };

  position.z = computeDistanceMeters(base, dstCoords);
  position.z *= dest.lat > base.lat ? -1 : 1;

  return position;
}
