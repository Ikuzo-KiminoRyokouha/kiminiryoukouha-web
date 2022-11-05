import { useEffect, useRef } from "react";
import AR from "../utils/AR";

export default function Navigation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ar = new AR(canvasRef);
      ar.createScene().then((scene) => {
        ar.loopEngine(scene);
      });
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <div className="flex-1">
        <canvas className="h-full w-full" id="ar-canvas" ref={canvasRef} />
        <div id="sibal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          itaque dolores, aperiam explicabo, soluta quam excepturi quae alias
          perferendis est illum corporis deleniti ex optio omnis autem cumque
          veritatis aspernatur.
        </div>
        <div id="sibaltwo">this is anasfasdfasdfasdf</div>
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
