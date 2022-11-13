import { useEffect, useState } from "react";

import TMap from "../utils/TMap";
import useScript from "./useScript";

import type { LatLng, TMapPOIResult } from "../types/tmap.type";
import useInput from "./useInput";
/**
 * @description TMap Class를 다루기 위한 비지니스 로직을 모아놓은 hook 입니다.
 * @param targetDom 돔 상에 TMap을 그려주기 위해 선택되는 id 값입니다.
 * @returns
 */
export default function useTMap(targetDom: string) {
  const source = useInput("", "出発地");
  const destination = useInput("", "到着地");
  const [start, setStart] = useState<LatLng>();
  const [end, setEnd] = useState<LatLng>();
  const [myLatLng, setMyLatLng] = useState<LatLng>();

  const [searchResult, setSearchResult] = useState<Array<TMapPOIResult>>();
  const [direction, setDirection] = useState<"도착" | "출발">();

  const [tmap, setTmap] = useState<TMap>(new TMap());

  const { additionalScriptLoaing } = useScript(
    `https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${process.env.NEXT_PUBLIC_TMAP_API_KEY}`
  );

  /**
   *  @description GPS에 접근해 내 위치를 저장하는 함수 입니다.
   */
  const getMyDirection = () => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const latLng: LatLng = {
          lat: String(position.coords.latitude),
          lng: String(position.coords.longitude),
        };
        setMyLatLng(latLng);
        setStart(latLng);
        source.onChange("내 위치");
        tmap.reDefineCenterMap(latLng);
      },
      () => {
        alert("GPS 에 연결할 수 없습니다.");
      }
    );
  };

  useEffect(() => {
    // useScript로 해당 tmap 스크립트가 불러와져야 tmap을 그려줍니다.
    if (additionalScriptLoaing) {
      tmap.initTmap(targetDom);
      getMyDirection();
    }
  }, [additionalScriptLoaing]);

  /**
   * @description 키워드를 기반으로 지도 상의 10개의 검색 결과를 제공해주는 함수입니다.
   * @param keyword POI 검색 키워드 입니다
   * @param direction 도착지에 대한 정보인지 출발지에 대한 정보인지 체크해줘야합니다.
   */
  const searchToKeyword = async (
    keyword: string,
    direction: "도착" | "출발"
  ) => {
    const res = await tmap.searchTotalPOI(keyword);
    const latLng: LatLng = {
      lat: res.data.searchPoiInfo.pois.poi[0].frontLat,
      lng: res.data.searchPoiInfo.pois.poi[0].frontLon,
    };
    if (res.data) {
      setSearchResult(() => {
        return res.data.searchPoiInfo.pois.poi;
      });
      setDirection(() => direction);
      setResult(latLng, direction, res.data.searchPoiInfo.pois.poi[0].name);
    }
  };

  /**
   *@description 위도와 경도를 바탕으로 WGS84GEO 형식의 좌표값으로 변환해주는 함수입니다.
   */
  const convertLatLng = (lat: number, lng: number): LatLng => {
    return tmap.convertLatLng(lat, lng);
  };

  /**
   * @description 검색 결과를 기반으로 지도 상에 표시하기 위해서 결과를 입력하는 함수입니다.
   * @param latLng 좌표값
   * @param direction 출발인지 도착인지 식별하는 변수
   * @param name 선택한 장소에 대한 이르,ㅁ
   */
  const setResult = (latLng: LatLng, direction: string, name: string) => {
    if (direction === "출발") {
      setStart(latLng);
      source.onChange(name);
    } else {
      setEnd(latLng);
      destination.onChange(name);
    }
    startGuide();
  };

  /**
   * @description 선택한 출발지와 도착지를 바꿔주는 함수입니다.
   */
  const setResultToReserve = () => {
    setStart(() => end);
    setEnd(() => start);
    destination.onChange(source.value);
    source.onChange(destination.value);
  };

  const startGuide = () => {
    start && end && tmap.getDirection(start, end);
  };

  return {
    searchToKeyword,
    searchResult,
    setResult,
    direction,
    source,
    setResultToReserve,
    destination,
    myLatLng,
    convertLatLng,
  };
}
