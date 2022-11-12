import { useEffect, useRef, useState } from "react";
import { TbExchange } from "react-icons/tb";

import NavigationCard from "../components/card/NavigationCard";
import useInput from "../hooks/useInput";
import useScript from "../hooks/useScript";
import TMap from "../utils/TMap";

import type { LatLng, TMapPOIResult } from "../types/tmap.type";
export default function Navigation() {
  const source = useInput("", "出発地");
  const destination = useInput("", "到着地");
  const [searchResult, setSearchResult] = useState<Array<TMapPOIResult>>();
  const [direction, setDirection] = useState<"도착" | "출발">();

  const { additionalScriptLoaing } = useScript(
    `https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${process.env.NEXT_PUBLIC_TMAP_API_KEY}`
  );

  const [tmap, setTmap] = useState<TMap>(new TMap());

  const canvasRef = useRef<HTMLCanvasElement>(null);

  /*   useEffect(() => {
    const ar = new AR(canvasRef);
    ar.createScene().then((scene) => {
      ar.loopEngine(scene);
    });
  }, []); */

  useEffect(() => {
    if (additionalScriptLoaing) {
      const start: LatLng = {
        lat: "37.464991",
        lng: "126.883937",
      };
      const end: LatLng = {
        lat: "37.566158",
        lng: "126.98894",
      };
      tmap.initTmap("map");
      tmap.getDirection(start, end).then(() => {
        tmap.reDefineCenterMap(start);
      });
    }
  }, [additionalScriptLoaing]);

  const searchToKeyword = async (
    keyword: string,
    direction: "도착" | "출발"
  ) => {
    const res = await tmap.searchTotalPOI(keyword);
    console.log(res);
    if (res.data) {
      setSearchResult(() => {
        return res.data.searchPoiInfo.pois.poi;
      });
      setDirection(() => direction);
    }
  };

  return (
    <>
      <div className="max-w-8xl mx-auto flex max-h-full w-full flex-1">
        <div className="hidden basis-1/4 border md:block">
          <p className="px-2 text-2xl font-bold">Navigation</p>
          <div></div>
          <div className="my-3 flex space-x-2 border-y px-2 py-2">
            <div className="space-y-2 px-3">
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchToKeyword(source.value, "출발");
                  }
                }}
                className="w-full border p-1"
                {...source}
              />
              <input className="w-full border p-1" {...destination} />
            </div>
            <button className="border p-1">
              <TbExchange size={25} />
            </button>
          </div>
          <div className="my-2 px-2">
            <p className="p-2">検索結果　</p>
            <div className="">
              {searchResult &&
                direction &&
                searchResult.map((poi, idx) => (
                  <NavigationCard
                    key={poi.name + idx}
                    idx={idx}
                    poi={poi}
                    direction={direction}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="basis-3/4">
          <div id="map"></div>
        </div>
      </div>
    </>
  );
}
