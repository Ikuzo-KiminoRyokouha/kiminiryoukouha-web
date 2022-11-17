import { MdClose } from "react-icons/md";
import useTMap from "../../../hooks/useTMap";
import { LatLng } from "../../../types/tmap.type";

interface Props {
  visible: boolean;
  arExitAction: () => void;
  start: LatLng;
  end: LatLng;
}

export default function AROverlayDom({
  visible,
  arExitAction,
  start,
  end,
}: Props) {
  const { myLatLng } = useTMap("mobile-map");
  return (
    <div id="ar-overlay-dom" className={`${visible ? "block" : "hidden"}`}>
      <div className="flex h-screen w-screen flex-col justify-between">
        <div className="m-2 flex-1">
          <div className="flex justify-between">
            <div className="m-2 h-16 min-w-fit bg-white p-1">
              <p>거리 : 250 m</p>
              <p>목적지 : 영진전문대학교 글로벌 캠퍼스</p>
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
    </div>
  );
}
