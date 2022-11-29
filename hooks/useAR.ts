import { MutableRefObject, useEffect, useState } from "react";
import { LatLng } from "../types/tmap.type";
import AR from "../utils/ar";
import { computeDistanceMeters } from "../utils/ar/threeHelper";
import useLocation from "./useLocation";

export default function useAR(
  buttonRef: MutableRefObject<HTMLButtonElement>,
  overlayDom: MutableRefObject<HTMLDivElement>
) {
  const [minAccuracy, setMinAccuracy] = useState<number>(1000);
  const { myLatLng, accuracy } = useLocation();
  const [ar, setAR] = useState<AR>();
  const [lastLatLng, setLastLatLng] = useState<LatLng>();

  /**
   * @description ar Class 초기화 및 제일 먼저 불러와져야 하는 함수들 호출 useLocation hook 에 dependency가 있습니다.
   */
  const arInit = async () => {
    const ar = new AR(buttonRef.current, overlayDom.current);
    await ar.start();

    setAR(ar);
  };

  useEffect(() => {
    if ((buttonRef.current, overlayDom.current)) {
      arInit();
    }
  }, [buttonRef.current]);

  useEffect(() => {
    if (minAccuracy > accuracy) {
      setMinAccuracy(accuracy);
      ar.updatePosition(myLatLng);
    }
    // gpsReceived();
  }, [accuracy]);

  /**
   *
   * @param target  오브젝트를 띄워줘야 하는 위도와 경도
   */
  const renderToLatLng = (target: LatLng | Array<LatLng>) => {
    if (!Array.isArray(target)) {
      ar.createBox(myLatLng, target);
    } else {
      target.forEach((latLng, _) => {
        ar.createBox(myLatLng, latLng);
      });
    }
  };

  /**
   * @description 해당 scene 의 모든 object를 삭제한다.
   */
  const removeAllMesh = () => {
    ar.scene.remove();
  };

  const gpsReceived = () => {
    let distMoved = Number.MAX_VALUE;
    if (accuracy <= minAccuracy) {
      if (!lastLatLng) {
        setLastLatLng(myLatLng);
      } else {
        distMoved = computeDistanceMeters(lastLatLng, myLatLng);
      }
      if (distMoved >= 0) {
        setLastLatLng(myLatLng);
        ar.updatePosition(myLatLng);
      }
    }
  };

  return { renderToLatLng, removeAllMesh, ar, myLatLng, accuracy };
}
