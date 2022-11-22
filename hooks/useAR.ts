import { RefObject, useEffect, useMemo, useState } from "react";
import { LatLng } from "../types/tmap.type";
import AR from "../utils/AR";
import useToggle from "./useToggle";

export default function useAR(
  canvasRef: RefObject<HTMLCanvasElement>,
  buttonRef: RefObject<HTMLButtonElement>
) {
  /* ar 내부의 UI 활성화 비활성화 */
  const arUiVisible = useToggle(false);
  /* ar 객체 */
  const [ar, setAR] = useState<AR>(null);
  /* 유저의 위도 경도에 대한 정보 */
  const [myLatLng, setMyLatLng] = useState<LatLng>();

  /**
   * @description ar기능의 초기화 함수
   */
  const init = async () => {
    const ar = new AR(canvasRef, arUiVisible.setTrue, arUiVisible.setFalse);
    const scene = await ar.createScene(buttonRef.current);
    ar.loopEngine(scene);
    setAR(ar);
  };

  useEffect(() => {
    init();
  }, []);

  // 위도와 경도를 기반으로 기준이 되는 벡터를 갱신하는 hook
  useEffect(() => {
    if (myLatLng && ar) {
      console.log(myLatLng);
      console.log(ar.setStandardVector(myLatLng));
      console.log(ar.getCoordinatesFromLatLng(35.9474453, 128.464));
    }
  }, [myLatLng, ar]);

  return { arUiVisible, myLatLng, setMyLatLng };
}
