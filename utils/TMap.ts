import axios from "axios";
import { LatLng } from "../types/tmap.type";

/**
 * @description TMap 관련 전반적인 처리를 다루는 클래스입니다.
 */
export default class TMap {
  private map: any;
  private targetDom: string = "";
  private marker_s: any;
  private marker_e: any;
  private marker_p1: any;
  private marker_p2: any;
  private totalMarkerArr: any[] = [];
  private drawInfoArr: any[] = [];
  private resultdrawArr: any[] = [];

  constructor() {}

  /**
   * @description 타켓돔을 대상으로 TMAP을 띄워주는 함수입니다.
   * @param targetDom TMap을 띄워야할 타겟돔의 id 혹은 class 의 쿼리 셀렉터 형식
   */
  initTmap(targetDom: string) {
    if (window.Tmapv2?.Map && !this.map) {
      this.targetDom = targetDom;
      // 1. 맵 띄우기
      this.map = new window.Tmapv2.Map(targetDom, {
        center: new window.Tmapv2.LatLng(
          37.566481622437934,
          126.98502302169841
        ),
        width: "100%",
        height: "100%",
        zoom: 15,
        https: true,
      });
    }
  }

  /**
   * @description 출발지와 도착지의 LatLng 형식을 받아서 맵상에 그려줌
   * @param start types/tmap.type.ts 에 정의된 LatLng 형식의 타입의 변수
   * @param end types/tmap.type.ts 에 정의된 LatLng 형식의 타입의 변수
   */
  async getDirection(start: LatLng, end: LatLng) {
    // 출발지 마킹
    this.marker_s = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(
        parseFloat(start.lat),
        parseFloat(start.lng)
      ),
      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png",
      iconSize: new window.Tmapv2.Size(24, 38),
      map: this.map,
    });

    // 도착지 마킹
    this.marker_e = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(
        parseFloat(end.lat),
        parseFloat(end.lng)
      ),
      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png",
      iconSize: new window.Tmapv2.Size(24, 38),
      map: this.map,
    });

    try {
      const result = await axios.post(
        "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
        {
          startX: start.lng,
          startY: start.lat,
          endX: end.lng,
          endY: end.lat,
          reqCoordType: "WGS84GEO",
          resCoordType: "EPSG3857",
          startName: "출발지",
          endName: "도착지",
        },
        {
          headers: {
            appKey: process.env.NEXT_PUBLIC_TMAP_API_KEY,
          },
        }
      );
      const data = result.data.features;
      if (data) {
        var tDistance =
          "총 거리 : " +
          (data[0].properties.totalDistance / 1000).toFixed(1) +
          "km,";
        var tTime =
          " 총 시간 : " + (data[0].properties.totalTime / 60).toFixed(0) + "분";

        // 기존 그려진 마크가 있다면 초기화
        if (this.resultdrawArr.length > 0) {
          for (var i in this.resultdrawArr) {
            this.resultdrawArr[i].setMap(null);
          }
          this.resultdrawArr = [];
        }

        this.drawInfoArr = [];
        for (var i in data) {
          //for문 [S]
          var geometry = data[i].geometry;
          var properties = data[i].properties;
          var polyline_;

          if (geometry.type == "LineString") {
            for (var j in geometry.coordinates) {
              // 경로들의 결과값(구간)들을 포인트 객체로 변환
              let latlng = new window.Tmapv2.Point(
                geometry.coordinates[j][0],
                geometry.coordinates[j][1]
              );

              // 포인트 객체를 받아 좌표값으로 변환
              let convertPoint =
                new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);

              // 포인트객체의 정보로 좌표값 변환 객체로 저장
              let convertChange = new window.Tmapv2.LatLng(
                convertPoint._lat,
                convertPoint._lng
              );

              // 배열에 담기
              this.drawInfoArr.push(convertChange);
            }
          } else {
            var markerImg = "";
            var pType = "";
            var size;
            let marker_p;

            if (properties.pointType == "S") {
              //출발지 마커
              markerImg =
                "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";
              pType = "S";
              size = new window.Tmapv2.Size(24, 38);
            } else if (properties.pointType == "E") {
              //도착지 마커
              markerImg =
                "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
              pType = "E";
              size = new window.Tmapv2.Size(24, 38);
            } else {
              //각 포인트 마커
              markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
              pType = "P";
              size = new window.Tmapv2.Size(8, 8);
            }

            // 경로들의 결과값들을 포인트 객체로 변환
            var latlon = new window.Tmapv2.Point(
              geometry.coordinates[0],
              geometry.coordinates[1]
            );

            // 포인트 객체를 받아 좌표값으로 다시 변환
            var convertPoint =
              new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);

            var routeInfoObj = {
              markerImage: markerImg,
              lng: convertPoint._lng,
              lat: convertPoint._lat,
              pointType: pType,
            };

            // Marker 추가
            marker_p = new window.Tmapv2.Marker({
              position: new window.Tmapv2.LatLng(
                routeInfoObj.lat,
                routeInfoObj.lng
              ),
              icon: routeInfoObj.markerImage,
              iconSize: size,
              map: this.map,
            });
          }
        } //for문 [E]
        this.drawLine(this.drawInfoArr);
      }
    } catch (err) {
      console.log("error is occured  : ", err);
    }
  }

  /**
   * @description 입력받은 위도 경도를 바탕으로 지도상의 센터를 재정의해주는 함수입니다.
   * @param latLng
   */
  reDefineCenterMap(latLng: LatLng) {
    this.map.setCenter(new window.Tmapv2.LatLng(latLng.lat, latLng.lng));
  }

  /**
   * @description 그러진 Tmap 위에 선을 그리는 함 수 입니다.
   */
  drawLine(arrPoint: any) {
    var polyline_;
    polyline_ = new window.Tmapv2.Polyline({
      path: arrPoint,
      strokeColor: "#DD0000",
      strokeWeight: 6,
      map: this.map,
    });
    this.resultdrawArr.push(polyline_);
  }

  getDistanceFromLatLonInKm(start: LatLng, end: LatLng) {
    function deg2rad(deg: any) {
      return deg * (Math.PI / 180);
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(parseFloat(end.lat) - parseFloat(start.lat)); // deg2rad below
    var dLon = deg2rad(parseFloat(end.lng) - parseFloat(start.lng));
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(parseFloat(start.lat))) *
        Math.cos(deg2rad(parseFloat(end.lat))) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  /**
   * @description 입력받은 장소를 기반으로 장소통합검색을 실시하는 함수입니다.
   * @param {string} keyword 검색하고 싶은 장소입니다
   */
  async searchTotalPOI(keyword: string) {
    return await axios.get(
      "https://apis.openapi.sk.com/tmap/pois?format=json&callback=result",
      {
        params: {
          version: 1,
          searchKeyword: keyword,
          searchType: "all",
          resCoordType: "EPSG3857",
          reqCoordType: "WGS84GEO",
          count: 10,
        },
        headers: {
          appKey: process.env.NEXT_PUBLIC_TMAP_API_KEY,
        },
      }
    );
  }
}

export const mockData = {
  totalCount: "1219963",
  count: "10",
  page: "1",
  pois: {
    poi: [
      {
        id: "1000559884",
        pkey: "100055988401",
        navSeq: "1",
        collectionType: "poi",
        name: "서울특별시",
        telNo: "",
        frontLat: "4518445.89020310",
        frontLon: "14135042.07127481",
        noorLat: "4518445.89020310",
        noorLon: "14135042.07127481",
        upperAddrName: "서울",
        middleAddrName: "중구",
        lowerAddrName: "소공동",
        detailAddrName: "",
        mlClass: "1",
        firstNo: "",
        secondNo: "",
        roadName: "",
        firstBuildNo: "",
        secondBuildNo: "",
        radius: "0.0",
        bizName: "",
        upperBizName: "AOI",
        middleBizName: "지역",
        lowerBizName: "시/도",
        detailBizName: "기타",
        rpFlag: "4",
        parkFlag: "0",
        detailInfoFlag: "0",
        desc: "",
        dataKind: "",
        zipCode: "",
        newAddressList: {
          newAddress: [
            {
              centerLat: "4518445.89020310",
              centerLon: "14135042.07127481",
              frontLat: "4518445.89020310",
              frontLon: "14135042.07127481",
              roadName: "",
              bldNo1: "",
              bldNo2: "",
              roadId: "",
              fullAddressRoad: "서울 중구",
            },
          ],
        },
        evChargers: {
          evCharger: [],
        },
      },
      {
        id: "211608",
        pkey: "21160800",
        navSeq: "0",
        collectionType: "poi",
        name: "노량진수산시장",
        telNo: "02-2254-8000",
        frontLat: "4511185.21843001",
        frontLon: "14130858.85757555",
        noorLat: "4511099.45836322",
        noorLon: "14130654.79235027",
        upperAddrName: "서울",
        middleAddrName: "동작구",
        lowerAddrName: "노량진동",
        detailAddrName: "",
        mlClass: "1",
        firstNo: "13",
        secondNo: "6",
        roadName: "노들로",
        firstBuildNo: "674",
        secondBuildNo: "",
        radius: "0.0",
        bizName: "",
        upperBizName: "쇼핑",
        middleBizName: "시장",
        lowerBizName: "농수축산물시장",
        detailBizName: "수산물시장",
        rpFlag: "16",
        parkFlag: "1",
        detailInfoFlag: "1",
        desc: "전통노량진수산시장입니다. \r\n전국에서 올라오는 수산물 천국으로 쇼핑 오십시요.\r\n경매장 2106평, 판매장 2564평, 활어 보관장 175평 12개실로 되어 있습니다.",
        dataKind: "",
        zipCode: "06900",
        newAddressList: {
          newAddress: [
            {
              centerLat: "4511099.45836322",
              centerLon: "14130654.79235027",
              frontLat: "4511185.21843001",
              frontLon: "14130858.85757555",
              roadName: "노들로",
              bldNo1: "674",
              bldNo2: "",
              roadId: "00049",
              fullAddressRoad: "서울 동작구 노들로 674",
            },
          ],
        },
        evChargers: {
          evCharger: [],
        },
      },
      {
        id: "211608",
        pkey: "21160801",
        navSeq: "1",
        collectionType: "poi",
        name: "노량진수산시장 승용주차장",
        telNo: "02-2254-8000",
        frontLat: "4511185.21843001",
        frontLon: "14130858.85757555",
        noorLat: "4511185.21843001",
        noorLon: "14130858.85757555",
        upperAddrName: "서울",
        middleAddrName: "동작구",
        lowerAddrName: "노량진동",
        detailAddrName: "",
        mlClass: "1",
        firstNo: "13",
        secondNo: "6",
        roadName: "노들로",
        firstBuildNo: "674",
        secondBuildNo: "",
        radius: "0.0",
        bizName: "",
        upperBizName: "쇼핑",
        middleBizName: "시장",
        lowerBizName: "농수축산물시장",
        detailBizName: "수산물시장",
        rpFlag: "16",
        parkFlag: "0",
        detailInfoFlag: "1",
        desc: "전통노량진수산시장입니다. \r\n전국에서 올라오는 수산물 천국으로 쇼핑 오십시요.\r\n경매장 2106평, 판매장 2564평, 활어 보관장 175평 12개실로 되어 있습니다.",
        dataKind: "",
        zipCode: "06900",
        newAddressList: {
          newAddress: [
            {
              centerLat: "4511185.21843001",
              centerLon: "14130858.85757555",
              frontLat: "4511185.21843001",
              frontLon: "14130858.85757555",
              roadName: "노들로",
              bldNo1: "674",
              bldNo2: "",
              roadId: "00049",
              fullAddressRoad: "서울 동작구 노들로 674",
            },
          ],
        },
        evChargers: {
          evCharger: [],
        },
      },
      {
        id: "211608",
        pkey: "21160803",
        navSeq: "3",
        collectionType: "poi",
        name: "노량진수산시장 화물주차장",
        telNo: "02-2254-8000",
        frontLat: "4511076.07425696",
        frontLon: "14130815.57304651",
        noorLat: "4511076.07425696",
        noorLon: "14130815.57304651",
        upperAddrName: "서울",
        middleAddrName: "동작구",
        lowerAddrName: "노량진동",
        detailAddrName: "",
        mlClass: "1",
        firstNo: "13",
        secondNo: "6",
        roadName: "노들로",
        firstBuildNo: "674",
        secondBuildNo: "",
        radius: "0.0",
        bizName: "",
        upperBizName: "쇼핑",
        middleBizName: "시장",
        lowerBizName: "농수축산물시장",
        detailBizName: "수산물시장",
        rpFlag: "16",
        parkFlag: "0",
        detailInfoFlag: "1",
        desc: "전통노량진수산시장입니다. \r\n전국에서 올라오는 수산물 천국으로 쇼핑 오십시요.\r\n경매장 2106평, 판매장 2564평, 활어 보관장 175평 12개실로 되어 있습니다.",
        dataKind: "",
        zipCode: "06900",
        newAddressList: {
          newAddress: [
            {
              centerLat: "4511076.07425696",
              centerLon: "14130815.57304651",
              frontLat: "4511076.07425696",
              frontLon: "14130815.57304651",
              roadName: "노들로",
              bldNo1: "674",
              bldNo2: "",
              roadId: "00049",
              fullAddressRoad: "서울 동작구 노들로 674",
            },
          ],
        },
        evChargers: {
          evCharger: [],
        },
      },
      {
        id: "11614",
        pkey: "1161400",
        navSeq: "0",
        collectionType: "poi",
        name: "김포국제공항국내선",
        telNo: "16612626",
        frontLat: "4517349.41549014",
        frontLon: "14115677.36242061",
        noorLat: "4517302.61124637",
        noorLon: "14115637.16842511",
        upperAddrName: "서울",
        middleAddrName: "강서구",
        lowerAddrName: "공항동",
        detailAddrName: "",
        mlClass: "1",
        firstNo: "1373",
        secondNo: "0",
        roadName: "하늘길",
        firstBuildNo: "111",
        secondBuildNo: "0",
        radius: "0.0",
        bizName: "",
        upperBizName: "교통편의",
        middleBizName: "교통시설",
        lowerBizName: "공항",
        detailBizName: "기타",
        rpFlag: "10",
        parkFlag: "1",
        detailInfoFlag: "0",
        desc: "",
        dataKind: "",
        zipCode: "07505",
        newAddressList: {
          newAddress: [
            {
              centerLat: "4517302.61124637",
              centerLon: "14115637.16842511",
              frontLat: "4517349.41549014",
              frontLon: "14115677.36242061",
              roadName: "하늘길",
              bldNo1: "111",
              bldNo2: "0",
              roadId: "00502",
              fullAddressRoad: "서울 강서구 하늘길 111",
            },
          ],
        },
        evChargers: {
          evCharger: [],
        },
      },
      {
        id: "11614",
        pkey: "1161401",
        navSeq: "1",
        collectionType: "poi",
        name: "김포국제공항국내선 출국장",
        telNo: "16612626",
        frontLat: "4517349.41549014",
        frontLon: "14115677.36242061",
        noorLat: "4517349.41549014",
        noorLon: "14115677.36242061",
        upperAddrName: "서울",
        middleAddrName: "강서구",
        lowerAddrName: "공항동",
        detailAddrName: "",
        mlClass: "1",
        firstNo: "1373",
        secondNo: "0",
        roadName: "하늘길",
        firstBuildNo: "111",
        secondBuildNo: "0",
        radius: "0.0",
        bizName: "",
        upperBizName: "교통편의",
        middleBizName: "교통시설",
        lowerBizName: "공항",
        detailBizName: "기타",
        rpFlag: "10",
        parkFlag: "0",
        detailInfoFlag: "0",
        desc: "",
        dataKind: "",
        zipCode: "07505",
        newAddressList: {
          newAddress: [
            {
              centerLat: "4517349.41549014",
              centerLon: "14115677.36242061",
              frontLat: "4517349.41549014",
              frontLon: "14115677.36242061",
              roadName: "하늘길",
              bldNo1: "111",
              bldNo2: "0",
              roadId: "00502",
              fullAddressRoad: "서울 강서구 하늘길 111",
            },
          ],
        },
        evChargers: {
          evCharger: [],
        },
      },
      {
        id: "11614",
        pkey: "1161402",
        navSeq: "2",
        collectionType: "poi",
        name: "김포국제공항국내선 입국장",
        telNo: "16612626",
        frontLat: "4517368.91756897",
        frontLon: "14115705.18932014",
        noorLat: "4517368.91756897",
        noorLon: "14115705.18932014",
        upperAddrName: "서울",
        middleAddrName: "강서구",
        lowerAddrName: "공항동",
        detailAddrName: "",
        mlClass: "1",
        firstNo: "1373",
        secondNo: "0",
        roadName: "하늘길",
        firstBuildNo: "111",
        secondBuildNo: "0",
        radius: "0.0",
        bizName: "",
        upperBizName: "교통편의",
        middleBizName: "교통시설",
        lowerBizName: "공항",
        detailBizName: "기타",
        rpFlag: "10",
        parkFlag: "0",
        detailInfoFlag: "0",
        desc: "",
        dataKind: "",
        zipCode: "07505",
        newAddressList: {
          newAddress: [
            {
              centerLat: "4517368.91756897",
              centerLon: "14115705.18932014",
              frontLat: "4517368.91756897",
              frontLon: "14115705.18932014",
              roadName: "하늘길",
              bldNo1: "111",
              bldNo2: "0",
              roadId: "00502",
              fullAddressRoad: "서울 강서구 하늘길 111",
            },
          ],
        },
        evChargers: {
          evCharger: [],
        },
      },
      {
        id: "11614",
        pkey: "1161403",
        navSeq: "3",
        collectionType: "poi",
        name: "김포국제공항국내선 1주차장",
        telNo: "16612626",
        frontLat: "4517446.92881716",
        frontLon: "14115930.89817914",
        noorLat: "4517446.92881716",
        noorLon: "14115930.89817914",
        upperAddrName: "서울",
        middleAddrName: "강서구",
        lowerAddrName: "공항동",
        detailAddrName: "",
        mlClass: "1",
        firstNo: "1373",
        secondNo: "0",
        roadName: "하늘길",
        firstBuildNo: "111",
        secondBuildNo: "0",
        radius: "0.0",
        bizName: "",
        upperBizName: "교통편의",
        middleBizName: "교통시설",
        lowerBizName: "공항",
        detailBizName: "기타",
        rpFlag: "16",
        parkFlag: "0",
        detailInfoFlag: "0",
        desc: "",
        dataKind: "",
        zipCode: "07505",
        newAddressList: {
          newAddress: [
            {
              centerLat: "4517446.92881716",
              centerLon: "14115930.89817914",
              frontLat: "4517446.92881716",
              frontLon: "14115930.89817914",
              roadName: "하늘길",
              bldNo1: "111",
              bldNo2: "0",
              roadId: "00502",
              fullAddressRoad: "서울 강서구 하늘길 111",
            },
          ],
        },
        evChargers: {
          evCharger: [],
        },
      },
      {
        id: "11614",
        pkey: "1161404",
        navSeq: "4",
        collectionType: "poi",
        name: "김포국제공항국내선 2주차장",
        telNo: "16612626",
        frontLat: "4517329.92337724",
        frontLon: "14116091.68093572",
        noorLat: "4517329.92337724",
        noorLon: "14116091.68093572",
        upperAddrName: "서울",
        middleAddrName: "강서구",
        lowerAddrName: "공항동",
        detailAddrName: "",
        mlClass: "1",
        firstNo: "1373",
        secondNo: "0",
        roadName: "하늘길",
        firstBuildNo: "111",
        secondBuildNo: "0",
        radius: "0.0",
        bizName: "",
        upperBizName: "교통편의",
        middleBizName: "교통시설",
        lowerBizName: "공항",
        detailBizName: "기타",
        rpFlag: "16",
        parkFlag: "0",
        detailInfoFlag: "0",
        desc: "",
        dataKind: "",
        zipCode: "07505",
        newAddressList: {
          newAddress: [
            {
              centerLat: "4517329.92337724",
              centerLon: "14116091.68093572",
              frontLat: "4517329.92337724",
              frontLon: "14116091.68093572",
              roadName: "하늘길",
              bldNo1: "111",
              bldNo2: "0",
              roadId: "00502",
              fullAddressRoad: "서울 강서구 하늘길 111",
            },
          ],
        },
        evChargers: {
          evCharger: [],
        },
      },
      {
        id: "1195057",
        pkey: "119505701",
        navSeq: "1",
        collectionType: "poi",
        name: "신사동가로수길",
        telNo: "",
        frontLat: "4512054.71569643",
        frontLon: "14140109.88212602",
        noorLat: "4512054.71569643",
        noorLon: "14140109.88212602",
        upperAddrName: "서울",
        middleAddrName: "강남구",
        lowerAddrName: "신사동",
        detailAddrName: "",
        mlClass: "1",
        firstNo: "",
        secondNo: "",
        roadName: "",
        firstBuildNo: "",
        secondBuildNo: "",
        radius: "0.0",
        bizName: "",
        upperBizName: "AOI",
        middleBizName: "놀거리",
        lowerBizName: "기타",
        detailBizName: "기타",
        rpFlag: "4",
        parkFlag: "0",
        detailInfoFlag: "1",
        desc: "예술적 손맛을 가진 디자이너들의 패션아트 거리 신사동 가로수길은 3호선 신사역부근 압구정동 현대고등학교까지 이어지는 25년이상이된 106여그루의 은행나무가 촘촘히 서있는 은행 나무길로 왕복 2차선 도로를 가로수길이라고 부르고 있습니다.오랜 가로수길 위에 세워진 가게들은 고급스러우면서 특별한 인테리어를 원하는 사람들이 주로 찾는 곳으로 국내에서 수입되지 않는 유명 디자이너와 브랜드의 제품을 구 할 수 있는 곳이기도 합니다.신사동 가로수길 주변 맛집을 추천하자면 가로수길 중간지점에 보면 다이닝텐트라는 레스토랑 같은 분위기가 물씬 풍기는 곳이 있는데 일단 음식이 아주 깔끔하고 맛갈스럽다고 할까 연인끼리 꼭 가보시길 추천합니다.파스타와 스파게티 전문점으로 가격이 비싼메뉴는 2만원대고 웬만한건 2만원 이하로 즐길수 있을것입니다.또다른 이색적인 느낌이 드는 음식점으로 킹콩스테이크 맛집이 있습니다.위치는 가로수길에 구스띠모 아이스크림점 골목으로 쭉 들어가서 편의점 바로 옆에 있습니다. 이곳은 유명한지 평일낮에도 사람들이 북적이는 곳으로 와인에 과일넣는 치킨 샐러드가 일품입니다. 꽃등심 스테이크도 한번 드셔 보시길 입에 들어가면 아주 살살 녹습니다.",
        dataKind: "",
        zipCode: "",
        newAddressList: {
          newAddress: [
            {
              centerLat: "4512054.71569643",
              centerLon: "14140109.88212602",
              frontLat: "4512054.71569643",
              frontLon: "14140109.88212602",
              roadName: "",
              bldNo1: "",
              bldNo2: "",
              roadId: "",
              fullAddressRoad: "서울 강남구",
            },
          ],
        },
        evChargers: {
          evCharger: [],
        },
      },
    ],
  },
};
