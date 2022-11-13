import { useRef } from "react";
import { TbExchange } from "react-icons/tb";

import NavigationCard from "../components/card/NavigationCard";
import useTMap from "../hooks/useTMap";

export default function Navigation() {
  const {
    source,
    destination,
    searchToKeyword,
    searchResult,
    setResult,
    setResultToReserve,
    direction,
    myLatLng,
    convertLatLng,
  } = useTMap("map");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /*   useEffect(() => {
    const ar = new AR(canvasRef);
    ar.createScene().then((scene) => {
      ar.loopEngine(scene);
    });
  }, []); */

  return (
    <>
      <div className="max-w-8xl mx-auto flex max-h-full w-full flex-1">
        <div className="relative hidden basis-1/4 border md:flex md:flex-col">
          <div className="absolute flex h-full flex-col overflow-hidden">
            <p className="px-2 text-2xl font-bold">Navigation</p>
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
                <input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchToKeyword(destination.value, "도착");
                    }
                  }}
                  className="w-full border p-1"
                  {...destination}
                />
              </div>
              <button className="border p-1" onClick={setResultToReserve}>
                <TbExchange size={25} />
              </button>
            </div>
            <div className="relative my-2 flex-1">
              <div className="absolute flex max-h-full w-full flex-col">
                <p className="p-2">検索結果　</p>
                <div className="overflow-scroll overflow-x-hidden">
                  {searchResult &&
                    direction &&
                    searchResult.map((poi, idx) => {
                      return (
                        <NavigationCard
                          convertLatLng={convertLatLng}
                          myLatLng={myLatLng}
                          key={poi.name + idx}
                          idx={idx}
                          poi={poi}
                          setResult={setResult}
                          direction={direction}
                        />
                      );
                    })}
                </div>
              </div>
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
