import { useEffect, useRef } from "react";
import ARCamera from "../utils/camera";

export default function Navigation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      const camera = new ARCamera(videoRef, canvasRef);
      camera.accessCamera().then(() => {
        videoRef && camera.drawCanvas();
        camera.createScene();
      });
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <div className="flex-1">
        <video
          className="hidden h-full w-full"
          width={600}
          height={600}
          ref={videoRef}
        />
        <canvas
          className="h-full w-full"
          width={600}
          height={400}
          ref={canvasRef}
        />
      </div>
      <div className="flex-1 bg-slate-300"></div>
    </div>
  );
}
