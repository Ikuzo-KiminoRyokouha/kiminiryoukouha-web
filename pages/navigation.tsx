import { useEffect, useRef, useState } from "react";
import useScript from "../hooks/useScript";
import { LatLng } from "../types/tmap.type";
import AR from "../utils/AR";
import TMap from "../utils/TMap";

export default function Navigation() {
  const { loading, error, additionalScriptLoaing } = useScript(
    `https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${process.env.NEXT_PUBLIC_TMAP_API_KEY}`
  );

  const [tmap, setTmap] = useState<TMap>(new TMap());

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ar = new AR(canvasRef);
    ar.createScene().then((scene) => {
      ar.loopEngine(scene);
    });
  }, []);

  // useEffect(() => {
  //   if (additionalScriptLoaing) {
  //     const start: LatLng = {
  //       lat: "37.464991",
  //       lng: "126.883937",
  //     };
  //     const end: LatLng = {
  //       lat: "37.566158",
  //       lng: "126.98894",
  //     };
  //     tmap.initTmap("map");
  //     tmap.getDirection(start, end).then(() => {
  //       console.log("this");
  //       tmap.reDefineCenterMap(start);
  //     });
  //   }
  // }, [additionalScriptLoaing]);
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <div className="flex-1">
        <canvas className="h-full w-full" id="ar-canvas" ref={canvasRef} />
      </div>
      <div className="flex-1 bg-slate-300">
        <div id="map"></div>
        <script
          src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=YOUR_KEY"
          type="text/javascript"
        ></script>
      </div>
    </div>
  );
}
