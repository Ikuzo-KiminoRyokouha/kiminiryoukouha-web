import RatingInput from "../input/RatingInput";
import RatingStar from "../RatingStar";

import type { TMapPOIResult } from "../../types/tmap.type";
import { useLayoutEffect } from "react";
import TMap from "../../utils/TMap";
interface Props {
  poi: TMapPOIResult;
  direction: "출발" | "도착";
  idx: number;
}
export default function NavigationCard({ poi, direction, idx }: Props) {
  return (
    <div className="w-full space-y-2 border p-2">
      <div className="flex justify-between">
        <p>
          {idx}. {poi.name}
        </p>
        <p>1.9 km</p>
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
        <button className="rounded-lg border bg-sky-600 px-2 py-1  text-white">
          {direction}
        </button>
      </div>
    </div>
  );
}
