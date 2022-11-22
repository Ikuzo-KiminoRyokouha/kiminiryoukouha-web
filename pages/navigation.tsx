import { useRef } from "react";
import { TbExchange } from "react-icons/tb";
import { GiSteampunkGoggles } from "react-icons/gi";
import { MdAssistantNavigation, MdClose } from "react-icons/md";
import NavigationCard from "../components/card/NavigationCard";
import useTMap from "../hooks/useTMap";
import useToggle from "../hooks/useToggle";
import AROverlayDom from "../components/layout/AROverlay";
import useAR from "../hooks/useAR";

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
    start,
    end,
    accuracy,
    markerLatLngArr,
  } = useTMap("map");

  /* 모바일 상에서 Navigation Toggle State */
  const isVisible = useToggle(false);
  /* ar 진입 버튼 */
  const buttonRef = useRef<HTMLButtonElement>(null);
  /* ar 그리는 ref */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /* ar 진입 오버레이 돔에 대한 ref */
  const overlayDom = useRef<HTMLDivElement>(null);

  const { renderToLatLng, removeAllMesh } = useAR(buttonRef, overlayDom);
  /**
   * @description 네비게이션의 길찾기를 바탕으로 받아온 정보가 있다면, AR상에 해당 좌표를 기반으로 오브젝트 모델을 띄워줌
   */
  // useEffect(() => {
  //   if (myLatLng && markerLatLngArr.length > 1) {
  //     removeAllMesh();
  //     renderToLatLng(myLatLng, markerLatLngArr);
  //   }
  // }, [myLatLng, , markerLatLngArr]);

  return (
    <>
      <div className="max-w-8xl mx-auto mb-[53px] flex max-h-full w-full flex-1 md:mb-0">
        <div
          className={`absolute inset-0 ${
            isVisible.value ? "top-16" : "top-full"
          } z-50 basis-full border bg-white transition-all duration-300 md:relative md:top-auto md:z-0 md:flex md:basis-1/4 md:flex-col`}
        >
          <div className="absolute flex h-full flex-col overflow-hidden">
            <div className="flex items-center justify-between p-3 text-2xl font-bold">
              <span>Navigation</span>
              <button className="md:hidden">
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
        <div className="relative basis-full md:basis-3/4">
          <div className="absolute h-full w-full space-y-2 p-2 md:hidden">
            <div className="flex justify-end">
              <button
                className="z-10 rounded-lg border border-gray-300 bg-white p-1 text-sky-600"
                onClick={isVisible.setTrue}
              >
                <MdAssistantNavigation size={36}></MdAssistantNavigation>
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
            <div className="flex justify-end">
              <span className="z-10">{accuracy}</span>
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
