import { useEffect, useRef, useState } from "react";
import { GiSteampunkGoggles } from "react-icons/gi";
import { MdAssistantNavigation, MdClose } from "react-icons/md";
import { TbExchange } from "react-icons/tb";

import NavigationCard from "../components/common/card/NavigationCard";
import AROverlayDom from "../components/layout/AROverlay";
import { useAR, useToggle, useTMap, useLocation } from "../hooks";
import { getOrientation, stopOrientation } from "../utils/common";
import { LatLng, Orientation } from "../types/tmap.type";

export default function Navigation() {
  const {
    source,
    destination,
    searchToKeyword,
    searchResult,
    setResult,
    setResultToReserve,
    direction,
    convertLatLng,
    drawMyMarker,
    drawPolygonWithOrientation,
    start,
    end,
    pending,
  } = useTMap("map");
  /* 모바일 상에서 Navigation Toggle State */
  const isVisible = useToggle(false);
  /* ar 진입 버튼 */
  const buttonRef = useRef<HTMLButtonElement>(null);
  /* ar 그리는 ref */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /* ar 진입 오버레이 돔에 대한 ref */
  const overlayDom = useRef<HTMLDivElement>(null);
  /* 디바이스의 방향 정보를 담는 객체입니다. */
  const [orientation, setOrientation] = useState<Orientation>(undefined);

  const { renderToLatLng, removeAllMesh, ar, myLatLng, accuracy } = useAR(
    buttonRef,
    overlayDom
  );

  useEffect(() => {
    getOrientation(setOrientation);
    return () => {
      stopOrientation();
    };
  }, []);

  useEffect(() => {
    start && end && isVisible.setFalse();
  }, [start, end]);

  useEffect(() => {
    if (pending && myLatLng) {
      drawMyMarker(myLatLng);
      drawPolygonWithOrientation(orientation, myLatLng);
    }
  }, [myLatLng, pending, orientation?.alpha]);

  /**
   * @description 네비게이션의 길찾기를 바탕으로 받아온 정보가 있다면, AR상에 해당 좌표를 기반으로 오브젝트 모델을 띄워줌
   */
  // useEffect(() => {
  //   if (markerLatLngArr.length > 1) {
  //     markerLatLngArr.forEach((latLng) => {
  //       ar.createRoadSignBox(myLatLng, latLng);
  //       alert(latLng.lng + "-" + latLng.lat);
  //     });
  //     alert("rendererd");
  //   }
  // }, [markerLatLngArr]);
  const renderObject = async () => {
    const color = ["skyblue", "red", "green", "yellow"];
    const latLngArr: Array<LatLng> = [
      {
        lat: myLatLng?.lat + 0.00001,
        lng: myLatLng?.lng + 0.00001,
      },
      {
        lat: myLatLng?.lat + 0.00001,
        lng: myLatLng?.lng - 0.00001,
      },
    ];

    latLngArr.forEach(async (latLng, idx) => {
      await ar.createBox(myLatLng, latLng, color[idx]);
    });

    ar.drawLine(myLatLng, ...latLngArr);
  };

  useEffect(() => {
    // if (ar) {
    //   ar.drawLine();
    // }
    if (ar && myLatLng) renderObject();
  }, [ar]);
  return (
    <>
      <div className="max-w-8xl mx-auto mb-[53px] flex max-h-full w-full flex-1 lg:mb-0">
        <div
          className={`absolute inset-0 ${
            isVisible.value ? "top-16" : "top-full"
          } z-50 basis-full border bg-white transition-all duration-300 lg:relative lg:top-auto lg:z-0 lg:flex lg:basis-1/4 lg:flex-col`}
        >
          <div className="absolute flex h-full flex-col overflow-hidden">
            <div className="flex items-center justify-between p-3 text-2xl font-bold">
              <span>Navigation</span>
              <button className=" lg:hidden">
                <MdClose onClick={isVisible.setFalse} />
              </button>
            </div>
            <div className="mb-3 flex space-x-2 border-y px-2 py-2">
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
            <div className="relative mt-2 flex-1">
              <div className="absolute flex max-h-full min-h-full w-full flex-col">
                <p className="p-2">検索結果　</p>
                <div className="flex-1 overflow-scroll overflow-x-hidden">
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
        <div className="relative basis-full lg:basis-3/4">
          <div className="absolute h-full w-full space-y-2 p-2 lg:hidden">
            <div className="flex justify-end">
              <button
                className="z-10 rounded-lg border border-gray-300 bg-white p-1 text-sky-600"
                onClick={isVisible.setTrue}
              >
                <MdAssistantNavigation size={36} />
              </button>
            </div>
            <div className="flex justify-end">
              {/*  ar 진입 버튼, 나중에 길찾기를 했을 떄만 가능 하도록 수정할 예정 */}
              <button
                ref={buttonRef}
                className="z-10 rounded-lg  border border-gray-300 bg-white p-1 text-sky-600"
              >
                <GiSteampunkGoggles size={36}></GiSteampunkGoggles>
              </button>
            </div>
            <div className="flex flex-col justify-end">
              <span className="z-10">{myLatLng?.lat}</span>
              <span className="z-10">{myLatLng?.lng}</span>
              <span className="z-10">{accuracy}</span>
              <div style={{ color: "blue", zIndex: 10 }}>
                <span className="z-10">
                  {ar?.renderer.xr.getCamera().position.x}
                </span>
                <span className="z-10">
                  {ar?.renderer.xr.getCamera().position.z}
                </span>
                <span className="z-10">
                  {ar?.renderer.xr.getCamera().position.z}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <p className="z-10">alpha : {orientation?.alpha || "null"}</p>
              <p className="z-10">beta : {orientation?.beta || "null"}</p>
              <p className="z-10">gamma : {orientation?.gamma || "null"}</p>
              <p className="z-10">
                absoulte : {String(orientation?.absolute) || "null"}
              </p>
            </div>
            {/* <button
              ref={buttonRef}
              className="z-10 hidden  rounded-lg  border border-gray-300 bg-white p-1 text-sky-600"
            ></button> */}
          </div>
          <div id="map"></div>
          <div className="hidden">
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>
      </div>
      <div id="ar-overlay-dom" ref={overlayDom} style={{ display: "none" }}>
        <AROverlayDom
          accuracy={accuracy}
          myLatLng={myLatLng}
          arExitAction={() => {
            buttonRef.current.click();
          }}
          start={start}
          end={end}
        />
      </div>
    </>
  );
}
