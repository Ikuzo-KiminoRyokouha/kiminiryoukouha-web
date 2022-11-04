import { useRef } from "react";

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return <video ref={videoRef}></video>;
}
