/**
 * @description TMap 클래스에 필요한 위도 경도의 타입
 */
export type LatLng = {
  lat: string;
  lng: string;
};

/**
 * @description TMap POI 검색 결과 중 필요한 타입
 */
export type TMapPOIResult = {
  name: string;
  telNo: string;
  frontLat: string;
  frontLon: string;
  newAddressList: {
    newAddress: [
      {
        centerLat: string;
        centerLon: string;
        frontLat: string;
        frontLon: string;
        roadName: string;
        bldNo1: string;
        bldNo2: string;
        roadId: string;
        fullAddressRoad: string;
      }
    ];
  };
};
