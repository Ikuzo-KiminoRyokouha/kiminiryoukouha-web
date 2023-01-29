import { LatLng, Orientation } from "../types/tmap.type";
import apiRequest from "./request/apiRequest";

/**
 * @description TMap 관련 전반적인 처리를 다루는 클래스입니다.
 */
export default class TMap {
  private map: any;
  private targetDom: string = "";
  private marker_s: any;
  private marker_e: any;
  private marker_me: any;
  private totalMarkerArr: any[] = [];
  drawInfoArr: any[] = [];
  private resultdrawArr: any[] = [];
  private routeLayer: any;
  private markerLayer: any;
  private markerWaypointLayer: any;
  markerLatLngArr: Array<LatLng> = [];

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
    await this.resetMarker();

    // 출발지 마킹
    this.marker_s = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(start.lat, start.lng),
      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png",
      iconSize: new window.Tmapv2.Size(24, 38),
      map: this.map,
    });

    this.reDefineCenterMap(start);

    // 도착지 마킹
    this.marker_e = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(end.lat, end.lng),
      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png",
      iconSize: new window.Tmapv2.Size(24, 38),
      map: this.map,
    });

    try {
      const result = await apiRequest.post(
        "/tmap/routes/pedestrian?version=1&format=json&callback=result",
        {
          startX: start.lng,
          startY: start.lat,
          endX: end.lng,
          endY: end.lat,
          reqCoordType: "WGS84GEO",
          resCoordType: "EPSG3857",
          startName: "출발지",
          endName: "도착지",
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
            await this.resultdrawArr[i].setMap(null);
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

              // 내가 선언해놓은 LatLng 타입에 맞춰서 받은 마커의 좌표를 배열에 넣어줌
              // AR 에서 오브젝트를 띄워줄 때 사용할 예정
              let markerLatLng: LatLng = {
                lat: convertPoint._lat,
                lng: convertPoint._lng,
              };
              // 포인트객체의 정보로 좌표값 변환 객체로 저장
              let convertChange = new window.Tmapv2.LatLng(
                convertPoint._lat,
                convertPoint._lng
              );

              // 배열에 담기
              this.drawInfoArr.push(convertChange);

              this.markerLatLngArr.push(markerLatLng);
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
            this.totalMarkerArr.push(marker_p);
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
  drawLine(arrPoint: any, strokeColor: string = "#DD0000") {
    var polyline_;
    polyline_ = new window.Tmapv2.Polyline({
      path: arrPoint,
      strokeColor,
      strokeWeight: 6,
      map: this.map,
    });
    this.resultdrawArr.push(polyline_);
  }

  async searchAroundPOI(keyword: string) {
    await this.resetMarker();
    const tmapLatLng = this.map.getCenter();
    console.log(tmapLatLng._lat, tmapLatLng._lng);
    const res = await apiRequest.get(
      "/tmap/pois/search/around?version=1&format=json&callback=result",
      {
        params: {
          version: 1,
          searchKeyword: keyword,
          searchType: "name",
          searchtypCd: "A",
          radius: 1,
          centerLon: tmapLatLng._lng,
          centerLat: tmapLatLng._lat,

          resCoordType: "EPSG3857",
          reqCoordType: "WGS84GEO",
          count: 10,
        },
      }
    );

    const positionBound = new window.Tmapv2.LatLngBounds(); // 맵에 결과물을 확인 하기위한 객체 생성

    const data = res.data.searchPoiInfo.pois.poi;

    // 마커 지도상에 띄우기
    data.forEach((poi: any, idx: number) => {
      const noorLat = Number(poi.noorLat);
      const noorLon = Number(poi.noorLon);
      const { name } = poi;

      var { lat, lng: lon } = this.convertLatLng(noorLat, noorLon);

      var markerPosition = new window.Tmapv2.LatLng(lat, lon);

      const marker = new window.Tmapv2.Marker({
        position: markerPosition,
        //icon : "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_a.png",
        icon:
          "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_" +
          idx +
          ".png",
        iconSize: new window.Tmapv2.Size(24, 38),
        title: name,
        map: this.map,
      });

      this.resultdrawArr.push(marker);
      positionBound.extend(markerPosition);
    });

    this.map.panToBounds(positionBound);

    this.map.zoomOut();
    return res;
  }

  async searchTotalPOINoMarker(keyword: string) {
    const res = await apiRequest.get("/tmap/pois?format=json&callback=result", {
      params: {
        version: 1,
        searchKeyword: keyword,
        searchType: "all",
        resCoordType: "EPSG3857",
        reqCoordType: "WGS84GEO",
        count: 10,
      },
    });
    return res;
  }

  /**
   * @description 입력받은 장소를 기반으로 장소통합검색을 실시하는 함수입니다.
   * @param {string} keyword 검색하고 싶은 장소입니다
   */
  async searchTotalPOI(keyword: string) {
    await this.resetMarker();

    const res = await apiRequest.get("/tmap/pois?format=json&callback=result", {
      params: {
        version: 1,
        searchKeyword: keyword,
        searchType: "all",
        resCoordType: "EPSG3857",
        reqCoordType: "WGS84GEO",
        count: 10,
      },
    });
    // 마커 리셋

    const positionBound = new window.Tmapv2.LatLngBounds(); // 맵에 결과물을 확인 하기위한 객체 생성

    const data = res.data.searchPoiInfo.pois.poi;

    // 마커 지도상에 띄우기
    data.forEach((poi: any, idx: number) => {
      const noorLat = Number(poi.noorLat);
      const noorLon = Number(poi.noorLon);
      const { name } = poi;

      var { lat, lng: lon } = this.convertLatLng(noorLat, noorLon);

      var markerPosition = new window.Tmapv2.LatLng(lat, lon);

      const marker = new window.Tmapv2.Marker({
        position: markerPosition,
        //icon : "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_a.png",
        icon:
          "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_" +
          idx +
          ".png",
        iconSize: new window.Tmapv2.Size(24, 38),
        title: name,
        map: this.map,
      });

      this.resultdrawArr.push(marker);
      positionBound.extend(markerPosition);
    });

    this.map.panToBounds(positionBound);

    this.map.zoomOut();

    return res;
  }

  async resetMarker() {
    // 기존 그려진 마크가 있다면 초기화
    if (this.resultdrawArr.length > 0) {
      for (var i in this.resultdrawArr) {
        await this.resultdrawArr[i].setMap(null);
      }
      this.resultdrawArr = [];
    }

    if (this.totalMarkerArr.length > 0) {
      for (var i in this.totalMarkerArr) {
        await this.totalMarkerArr[i].setMap(null);
      }
    }
    this.totalMarkerArr = [];

    this.marker_e && (await this.marker_e.setMap(null));
    this.marker_s && (await this.marker_s.setMap(null));

    this.drawInfoArr = [];

    this.markerLatLngArr = [];
  }
  /**
   * @description 위도와 경도를 바탕으로 WGS84GEO 형식의 좌표값으로 변환해주는 함수입니다.
   * @returns
   */
  convertLatLng(lat: number, lng: number): LatLng {
    var pointCng = new window.Tmapv2.Point(lng, lat);
    var projectionCng = new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
      pointCng
    );
    return { lat: projectionCng._lat, lng: projectionCng._lng };
  }

  /**
   * @description 좌포를 바탕으로 지도 상에 마커를 띄워주는 함수입니다.
   */
  private makeMarker(latLng: LatLng, img_url: string, isCircle?: boolean) {
    return new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(latLng.lat, latLng.lng),
      icon: img_url,
      iconSize: isCircle
        ? new window.Tmapv2.Size(24, 24)
        : new window.Tmapv2.Size(24, 38),
      map: this.map,
    });
  }

  makeMyMarker(latLng: LatLng, img_url: string) {
    this.marker_me = this.makeMarker(latLng, img_url, true);
  }
  async removeMyMarker() {
    await this.marker_me?.setMap(null);
  }

  pushDrawableMarker(latLng: LatLng) {
    const pointlatLng = new window.Tmapv2.LatLng(latLng.lat, latLng.lng);
    this.drawInfoArr.push(pointlatLng);
  }

  makeStartMarker(latLng: LatLng) {
    this.marker_s = this.makeMarker(
      latLng,
      "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png"
    );
    return this.marker_s;
  }
  makeEndMarker(latLng: LatLng) {
    this.marker_e = this.makeMarker(
      latLng,
      "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png"
    );
    return this.marker_e;
  }
  drawLineWithPanning() {
    const positionBound = new window.Tmapv2.LatLngBounds();
    this.drawInfoArr.forEach((drawInfo) => {
      positionBound.extend(drawInfo);
    });
    this.map.panToBounds(positionBound);

    this.map.zoomOut();
    this.drawLine(this.drawInfoArr);
  }

  async makeLayerForPlan(
    startLatLng: LatLng,
    endLatLng: LatLng,
    ...wayPointLatLng: Array<LatLng>
  ) {
    await this.resetMarker();
    // this.routeLayer = new window.Tmapv2.Layer.Vector("route"); // 백터 레이어 생성
    // this.markerLayer = new window.Tmapv2.Layer.Markers("point"); //마커 레이어 생성
    // this.markerWaypointLayer = new window.Tmapv2.Layer.Markers("waypoint"); // 마커 레이어 생성

    // this.map.addLayer(this.routeLayer); //맵에 레이어 추가
    // this.map.addLayer(this.markerLayer); //map에 마커 레이어 추가
    // this.map.addLayer(this.markerWaypointLayer); //map에 마커 레이어 추가

    this.marker_s = this.makeStartMarker(startLatLng);

    this.marker_e = this.makeEndMarker(endLatLng);
    wayPointLatLng.forEach((el, idx) => {
      this.makeMarker(
        el,
        `http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_${idx}.png`
      );
    });

    this.reDefineCenterMap(startLatLng);

    const latLngArr = [
      new window.Tmapv2.LatLng(startLatLng.lat, startLatLng.lng),
      ...wayPointLatLng.map((el) => new window.Tmapv2.LatLng(el.lat, el.lng)),
      new window.Tmapv2.LatLng(endLatLng.lat, endLatLng.lng),
    ];

    this.drawInfoArr = latLngArr;

    this.drawLineWithPanning();

    let viaPoints = wayPointLatLng.map((el) => {
      return [
        {
          viaPointId: "test01",
          viaPointName: "test01",
          viaX: el.lat,
          viaY: el.lng,
          viaTime: 600,
        },
      ];
    });

    this.drawLineWithPanning();
  }

  async getDirectionUseTransfort(startLatLng: LatLng, endLatLng: LatLng) {
    try {
      return await apiRequest.post("/transit/routes", {
        startX: "128.4538673",
        startY: "35.9442657",
        endX: "129.3892089957",
        endY: "35.7951432974",
        lang: 0,
        format: "json",
        count: 10,
      });
    } catch (e) {
      console.error(e);
    }
  }

  polygon;
  async drawPolygonWithOrientation(orientation: Orientation, myLatLng: LatLng) {
    const { alpha, beta, gamma } = orientation;
    if (this.polygon) await this.polygon.setMap(null);
    this.polygon = new window.Tmapv2.Polygon({
      paths: [
        new window.Tmapv2.LatLng(myLatLng.lat, myLatLng.lng),
        new window.Tmapv2.LatLng(
          myLatLng.lat +
            Math.cos((Math.PI / 180) * (-alpha + 45 - 22.5)) * 0.001,
          myLatLng.lng +
            Math.sin((Math.PI / 180) * (-alpha + 45 - 22.5)) * 0.001
        ),
        new window.Tmapv2.LatLng(
          myLatLng.lat +
            Math.cos((Math.PI / 180) * (-alpha - 45 - 22.5)) * 0.001,
          myLatLng.lng +
            Math.sin((Math.PI / 180) * (-alpha - 45 - 22.5)) * 0.001
        ),
      ],
      fillColor: "pink", // 다각형 내부 색상
      map: this.map,
    });
  }
}
