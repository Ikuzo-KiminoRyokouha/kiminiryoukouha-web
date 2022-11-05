import axios from "axios";

/**
 * @description 돔을 이용해 지도를 띄워주는 함수 입니다.
 * @require useScript를 통해 https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=YOUR_KEY 를 불러와야 합니다.
 * @param targetDom 지도를 띄워줄 돔입니다.
 */
export default async function initTmap(targetDom: string) {
  console.log("this function is called");
  const map = new window.Tmapv2.Map(targetDom, {
    center: new window.Tmapv2.LatLng(37.566481622437934, 126.98502302169841),
    width: "100%",
    height: "500px",
    zoom: 15,
    https: true,
  });
}
