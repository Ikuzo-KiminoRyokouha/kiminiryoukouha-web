import { useEffect, useState } from "react";
import { LatLng } from "../types/tmap.type";

export default function useLocation(keepWatch: boolean = true) {
  /* 내 좌표 */
  const [myLatLng, setMyLatLng] = useState<LatLng>();
  /* navigator 의 정확도 변수 DEBUG용 */
  const [accuracy, setAccuracy] = useState<number>();

  let watchId: number;

  /**
   * @description GPS에 접근해 내 위치를 지속적으로 감시하는 함수입니다. (지속)
   */
  const watchMyPosition = () => {
    const onSuccess = (position: GeolocationPosition) => {
      setAccuracy(position.coords.accuracy);
      const newRecord = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setMyLatLng(newRecord);
    };

    const onError = (err) => {
      console.log(err.message);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 27000,
      maximumAge: 0,
    };

    watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);
  };

  /**
   * @description 자신위치 추적 취소 함수
   */
  const stopWatchMyPosition = () => {
    navigator.geolocation.clearWatch(watchId);
  };

  useEffect(() => {
    keepWatch && watchMyPosition();
    return () => {
      keepWatch && stopWatchMyPosition();
    };
  }, []);

  useEffect(() => {
    getMyPositionOnce().then((res) => setMyLatLng(res));
  }, []);

  /**
   *  @description GPS에 접근해 내 위치를 저장하는 함수 입니다. (1 회성)
   */
  const getMyPositionOnce = (): Promise<LatLng> => {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const latLng: LatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          resolve(latLng);
        },
        (err) => {
          reject(err);
        },
        {
          enableHighAccuracy: true,
        }
      )
    );
  };

  return { getMyPositionOnce, myLatLng, accuracy };
}
