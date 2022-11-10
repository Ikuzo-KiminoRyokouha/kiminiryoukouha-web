import { useEffect, useRef, useState } from "react";

import useScript from "../hooks/useScript";
import TMap from "../utils/TMap";
import { TbExchange } from "react-icons/tb";

import useInput from "../hooks/useInput";
import type { LatLng } from "../types/tmap.type";
export default function Navigation() {
  const source = useInput("", "出発地");
  const destination = useInput("", "到着地");

  const { loading, error, additionalScriptLoaing } = useScript(
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
        console.log("this");
        tmap.reDefineCenterMap(start);
      });
    }
  }, [additionalScriptLoaing]);
  return (
    <>
      <div className="max-w-8xl mx-auto flex h-full w-full flex-1">
        <div className="hidden w-1/4 border md:block">
          <p className="px-2 text-2xl">Navigation</p>
          <div></div>
          <div className="my-3 flex space-x-2 border-y px-2 py-2">
            <div className="space-y-2 px-3">
              <input className="w-full border p-1" {...source} />
              <input className="w-full border p-1" {...destination} />
            </div>
            <button className="border p-1">
              <TbExchange size={25} />
            </button>
          </div>
          {/* <p className="h-1 border-t"></p> */}
        </div>
        <div className="flex-1">
          <div id="map"></div>
        </div>
      </div>
    </>
  );
}
