import { useEffect, useState } from "react";
import { useTMap } from "../../../hooks";

export default function PlanDetail() {
  const {
    searchToKeywordNoMarker,
    convertLatLng,
    makeLayerForPlan,
    additionalScriptLoaing,
  } = useTMap("map");

  const tempSearch = async () => {
    let latLngArr = [
      {
        lat: 35.78681255436075,
        lng: 129.33247253051985,
      },
      {
        lat: 35.78681255436075,
        lng: 129.33247253051985,
      },
      {
        lat: 35.83313867650138,
        lng: 129.2275359539618,
      },
      {
        lat: 35.83511045324921,
        lng: 129.21573137667983,
      },
    ];
    //  const res1 = await searchToKeywordNoMarker("불국사");
    //  var latLng = {
    //    lat: res1.data.searchPoiInfo.pois.poi[0].frontLat,
    //    lon: res1.data.searchPoiInfo.pois.poi[0].frontLon,
    //  };
    //  latLngArr = [...latLngArr, convertLatLng(latLng.lat, latLng.lon)];

    //  const res2 = await searchToKeywordNoMarker("불국사");
    //  var latLng = {
    //    lat: res2.data.searchPoiInfo.pois.poi[0].frontLat,
    //    lon: res2.data.searchPoiInfo.pois.poi[0].frontLon,
    //  };
    //  latLngArr = [...latLngArr, convertLatLng(latLng.lat, latLng.lon)];

    //  const res3 = await searchToKeywordNoMarker("동궁과 월지");
    //  var latLng = {
    //    lat: res3.data.searchPoiInfo.pois.poi[0].frontLat,
    //    lon: res3.data.searchPoiInfo.pois.poi[0].frontLon,
    //  };
    //  latLngArr = [...latLngArr, convertLatLng(latLng.lat, latLng.lon)];

    //  const res4 = await searchToKeywordNoMarker("첨성대");
    //  var latLng = {
    //    lat: res4.data.searchPoiInfo.pois.poi[0].frontLat,
    //    lon: res4.data.searchPoiInfo.pois.poi[0].frontLon,
    //  };
    //  latLngArr = [...latLngArr, convertLatLng(latLng.lat, latLng.lon)];
    //  console.log("좌표 : ", latLngArr);
    return latLngArr;
  };
  useEffect(() => {
    if (additionalScriptLoaing) {
      tempSearch().then((res) =>
        makeLayerForPlan(res[0], res[3], res[1], res[2])
      );
      // makeLayerForPlan(latLngArr[0], latLngArr[3], latLngArr[1], latLngArr[2]);
    }
  }, [additionalScriptLoaing]);
  return (
    <>
      <div className="flex h-screen w-full justify-center bg-black">
        <div className="flex h-full w-full max-w-2xl flex-col items-center md:max-w-7xl">
          <h1 className="pt-20 pb-10 text-4xl font-bold text-white">
            경주 역사탐방
          </h1>
          <h2 className="text-2xl text-white">
            석굴암, 불국사, 동궁과 월지, 첨성대 등
          </h2>
          <h2 className="text-2xl text-white">
            신라시대의 유적들이 가득한 경주의 역사를 경험해 보세요
          </h2>
          <div className="flex w-full justify-around pt-12">
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg text-white">일정</p>
              <p className="pt-3 text-2xl font-semibold text-white">당일치기</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg text-white">예상경비</p>
              <p className="pt-3 text-2xl font-semibold text-white">약7만원</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg text-white">관광시간</p>
              <p className="pt-3 text-2xl font-semibold text-white">약5시간</p>
            </div>
          </div>
          <div className="mt-14 w-full max-w-2xl md:max-w-5xl">
            <div className="flex h-80 w-full items-center justify-center rounded-lg bg-[#434343]">
              <div className="flex h-[85%] w-[92%]">
                <div className="h-full w-3/4 rounded-lg">
                  <div id="map">{/* tmap */}</div>
                </div>
                <div className="flex h-full w-1/4 flex-col items-start justify-evenly pl-4 md:pl-12">
                  <button className="text-2xl font-semibold text-white">
                    석굴암
                  </button>
                  <button className="text-2xl font-semibold text-white">
                    불국사
                  </button>
                  <button className="text-2xl font-semibold text-white">
                    동궁과 월지
                  </button>
                  <button className="text-2xl font-semibold text-white">
                    첨성대
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
