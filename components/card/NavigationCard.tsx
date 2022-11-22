import { useMemo, useRef } from "react";

import RatingInput from "../input/RatingInput";
import RatingStar from "./RatingStar";

import type { LatLng, TMapPOIResult } from "../../types/tmap.type";
import { getDistanceFromLatLon } from "../../utils/math";
interface Props {
  poi: TMapPOIResult;
  direction: "출발" | "도착";
  idx: number;
  setResult: (latLng: LatLng, direction: "출발" | "도착", name: string) => void;
  convertLatLng: (lat: number, lng: number) => LatLng;
  myLatLng?: LatLng;
}

export default function NavigationCard({
  poi,
  direction,
  idx,
  setResult,
  myLatLng,
  convertLatLng,
}: Props) {
  const latLng = useMemo(() => {
    return convertLatLng(Number(poi.frontLat), Number(poi.frontLon));
  }, []);

  const distance = useMemo(() => {
    return myLatLng && getDistanceFromLatLon(myLatLng, latLng);
  }, [myLatLng, latLng]);

  return (
    <div className="w-full space-y-2 border p-2">
      <div className="flex justify-between">
        <p>
          {idx}. {poi.name}
        </p>
        <p>
          {distance && distance > 1
            ? Math.round(distance!) + " km"
            : Math.round(distance! * 1000) + "m"}{" "}
        </p>
      </div>
      <div className="space-y-1">
        <p>TEL : {poi.telNo ? poi.telNo : "-"}</p>
        <p>
          <>ADDR : {poi.newAddressList.newAddress[0].fullAddressRoad}</>
        </p>
      </div>
      <div className="flex items-center justify-between">
        <RatingStar rating={4.96} />
        <RatingInput />
        <button
          onClick={() => setResult(latLng, direction, poi.name)}
          className="rounded-lg border bg-sky-600 px-2 py-1  text-white"
        >
          {direction}
        </button>
      </div>
    </div>
  );
}
