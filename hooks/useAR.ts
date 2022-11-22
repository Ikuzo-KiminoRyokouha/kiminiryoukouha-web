import { MutableRefObject, useEffect, useState } from "react";
import { LatLng } from "../types/tmap.type";
import AR from "../utils/ar";
import { getXYZFromLatLng } from "../utils/ar/threeHelper";

export default function useAR(
  buttonRef: MutableRefObject<HTMLButtonElement>,
  overlayDom: MutableRefObject<HTMLDivElement>
) {
  const [ar, setAR] = useState<AR>();
  /**
   * @description ar Class 초기화 및 제일 먼저 불러와져야 하는 함수들 호출
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

  const renderToLatLng = (base: LatLng, target: LatLng | Array<LatLng>) => {
    if (!Array.isArray(target)) {
      ar.createBox(getXYZFromLatLng(base, target));
    } else {
      target.forEach((latLng, _) => {
        ar.createBox(getXYZFromLatLng(base, latLng));
      });
    }
  };

  const removeAllMesh = () => {
    ar.scene.remove();
  };

  return { renderToLatLng, removeAllMesh };
}
