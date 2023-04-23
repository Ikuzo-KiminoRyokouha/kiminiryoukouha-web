import useTMap from "hooks/useTMap";
import { useEffect } from "react";

export default function AlbumByMap({ images }) {
  const { makeLayerForPlan, drawMyMarker } = useTMap("map", false);

  console.log(images);

  useEffect(() => {
    return () => console.log("hi");
  });

  return (
    <div className="relative flex-1">
      <div className="absolute top-3 left-1/2 h-[85%] w-[90%]  -translate-x-1/2  transform">
        <div id="map">{/* tmap */}</div>
      </div>
    </div>
  );
}
