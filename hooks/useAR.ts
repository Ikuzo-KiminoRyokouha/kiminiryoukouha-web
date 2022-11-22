import { MutableRefObject, useEffect, useState } from "react";
import { LatLng } from "../types/tmap.type";
import AR from "../utils/ar";

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

  /**
   *
   * @param target  오브젝트를 띄워줘야 하는 위도와 경도
   */
  const renderToLatLng = (target: LatLng | Array<LatLng>) => {
    if (!Array.isArray(target)) {
      ar.createBox(target);
    } else {
      target.forEach((latLng, _) => {
        ar.createBox(latLng);
      });
    }
  };

  /**
   * @description 해당 scene 의 모든 object를 삭제한다.
   */
  const removeAllMesh = () => {
    ar.scene.remove();
  };

  return { renderToLatLng, removeAllMesh, ar };
}
