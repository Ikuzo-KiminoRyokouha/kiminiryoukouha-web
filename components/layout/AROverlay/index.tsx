import { MdClose } from "react-icons/md";
import { LatLng } from "../../../types/tmap.type";

interface Props {
  arExitAction: () => void;
  start: LatLng;
  end: LatLng;
  myLatLng: LatLng;
  accuracy: number;
}

export default function AROverlayDom({
  arExitAction,
  start,
  myLatLng,
  accuracy,
}: Props) {
  return (
    <div className="flex h-screen w-screen flex-col justify-between">
      <div className="m-2 flex-1">
        <div className="flex justify-between">
          <div className="m-2 h-16 min-w-fit bg-white p-1">
            <p>거리 : 250 m</p>
            <p>목적지 : 영진전문대학교 글로벌 캠퍼스</p>
            <p>
              lat : {myLatLng?.lat} lng {myLatLng?.lng}
            </p>
            <p>정확도 : {accuracy}</p>
          </div>
          <MdClose color="red" size={40} onClick={arExitAction} />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="m-6 h-36 w-36 rounded-full">
          <div id="map"></div>
        </div>
      </div>
    </div>
  );
}
