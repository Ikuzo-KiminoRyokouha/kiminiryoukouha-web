import { useEffect, useState } from "react";

import TMap from "../utils/TMap";
import useScript from "./useScript";

import type { LatLng, Orientation, TMapPOIResult } from "../types/tmap.type";
import useInput from "./useInput";
/**
 * @description TMap Class를 다루기 위한 비지니스 로직을 모아놓은 hook 입니다.
 * @param targetDom 돔 상에 TMap을 그려주기 위해 선택되는 id 값입니다.
 * @returns
 */
export default function useTMap(
  targetDom: string,
  needMyPosition: boolean = true
) {
  /* 출발지 이름 */
  const source = useInput("", "出発地");
  /* 도착지 이름 */
  const destination = useInput("", "到着地");
  /* 출발지 좌표 */
  const [start, setStart] = useState<LatLng>();
  /* 도착지 좌표 */
  const [end, setEnd] = useState<LatLng>();
  /* 검색 결과 */
  const [searchResult, setSearchResult] = useState<Array<TMapPOIResult>>();
  /* 내가 검색한게 출발인지 도착인지 */
  const [direction, setDirection] = useState<"도착" | "출발">();
  /* TMap instance */
  const [tmap, setTmap] = useState<TMap>(new TMap());
  /* Tmap이  생성됐는지 안됐는지 식별하기 위한 변수 */
  const [pending, setPending] = useState<boolean>(false);

  const [searchAroundResult, setSearchAroundResult] =
    useState<Array<TMapPOIResult>>();

  const { additionalScriptLoaing } = useScript(
    `https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${process.env.NEXT_PUBLIC_TMAP_API_KEY}`
  );

  /**
   *  @description GPS에 접근해 내 위치를 저장하는 함수 입니다. (1 회성)
   */
  const getMyPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const latLng: LatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setStart(latLng);
        source.onChange("내 위치");
        needMyPosition && drawMyMarker(latLng);
        needMyPosition && tmap.reDefineCenterMap(latLng);
      },
      () => {
        alert("GPS 에 연결할 수 없습니다.");
      }
    );
  };

  /**
   * @description 지도상에 나의 마커를 띄워주는 함수입니다.
   */
  const drawMyMarker = (latLng: LatLng) => {
    tmap.removeMyMarker();
    tmap.makeMyMarker(latLng, "http://localhost:3000/assets/my-marker.png");
  };

  useEffect(() => {
    // useScript로 해당 tmap 스크립트가 불러와져야 tmap을 그려줍니다.
    if (additionalScriptLoaing) {
      tmap.initTmap(targetDom);
      needMyPosition && getMyPosition();
      setPending(true);
    }
  }, [additionalScriptLoaing]);

  useEffect(() => {
    if (start && end) {
      startGuide();
    }
  }, [start, end]);

  /**
   * @description 키워드를 기반으로 지도 상의 10개의 검색 결과를 제공해주는 함수입니다.
   * @param keyword POI 검색 키워드 입니다
   * @param direction 도착지에 대한 정보인지 출발지에 대한 정보인지 체크해줘야합니다.
   */
  const searchToKeyword = async (
    keyword: string,
    direction?: "도착" | "출발"
  ) => {
    const res = await tmap.searchTotalPOI(keyword);
    const latLng: LatLng = tmap.convertLatLng(
      Number(res.data.searchPoiInfo.pois.poi[0].frontLat),
      Number(res.data.searchPoiInfo.pois.poi[0].frontLon)
    );
    if (res.data) {
      setSearchResult(() => {
        return res.data.searchPoiInfo.pois.poi;
      });
      if (direction) {
        setDirection(() => direction);
        setResult(latLng, direction, res.data.searchPoiInfo.pois.poi[0].name);
      }
    }
  };

  const searchToKeywordNoMarker = async (keyword: string) => {
    const res = await tmap.searchTotalPOINoMarker(keyword);
    return res;
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

  /**
   * @description 출발좌표와 끝지점 좌표를 기반으로 방향을 지도를 그려주는 함수입니다.
   */
  const startGuide = () => {
    start && end && tmap.getDirection(start, end);
  };

  const searchAroundPOI = async (keyword: string) => {
    const res = await tmap.searchAroundPOI(keyword);
    setSearchAroundResult(() => res.data.searchPoiInfo.pois.poi);
  };

  const makeLayerForPlan = (
    startLatLng: LatLng,
    endLatLng: LatLng,
    ...wayPointLatLng: Array<LatLng>
  ) => {
    tmap.makeLayerForPlan(startLatLng, endLatLng, ...wayPointLatLng);
  };
  const pushDrawableMarker = (latLng: LatLng) => {
    tmap.pushDrawableMarker(latLng);
  };

  const drawLineWithPanning = () => {
    tmap.drawLineWithPanning();
  };

  const reDefineCenterMap = (latLng: LatLng) => {
    tmap.reDefineCenterMap(latLng);
  };

  const makeStartMarker = (latLng: LatLng) => {
    tmap.makeStartMarker(latLng);
  };

  const makeEndMarker = (latLng: LatLng) => {
    tmap.makeEndMarker(latLng);
  };

  const resetMarker = async () => {
    await tmap.resetMarker();
  };

  const getDirectionUseTransfort = async (
    startLatLng: LatLng,
    endLatLng: LatLng
  ) => {
    return tmap.getDirectionUseTransfort(startLatLng, endLatLng);
  };

  const drawPolygonWithOrientation = async (
    orientation: Orientation,
    myLatLng: LatLng
  ) => {
    await tmap.removePolygon();
    tmap.drawPolygonWithOrientation(orientation, myLatLng);
  };

  return {
    additionalScriptLoaing,
    resetMarker,
    pushDrawableMarker,
    drawMyMarker,
    makeStartMarker,
    makeEndMarker,
    reDefineCenterMap,
    drawLineWithPanning,
    searchToKeyword,
    getDirectionUseTransfort,
    searchAroundPOI,
    searchToKeywordNoMarker,
    makeLayerForPlan,
    searchResult,
    setResult,
    direction,
    source,
    setResultToReserve,
    destination,
    convertLatLng,
    searchAroundResult,
    start,
    end,
    markerLatLngArr: tmap.markerLatLngArr,
    tmap,
    pending,
    drawPolygonWithOrientation,
  };
}
