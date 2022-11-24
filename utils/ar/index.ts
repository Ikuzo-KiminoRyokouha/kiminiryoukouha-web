import * as t from "three";
import { LatLng } from "../../types/tmap.type";
import { browserHasImmersiveArCompatibility } from "../domUtil";
import ARCustomButton from "./ARCustomButton";
import {
  createDistanceTexture,
  createRoadSignMaterial,
} from "./object/roadSignBox";
import { computeDistanceMeters, getXYZFromLatLng } from "./threeHelper";

export default class AR {
  private button: HTMLButtonElement;
  private domOverlayRoot: HTMLDivElement;
  private camera: t.PerspectiveCamera;
  private renderer: t.WebGLRenderer;
  private childrenLatLng: Array<LatLng> = [];
  private watchId: number;
  scene: t.Scene;
  myLatLng: LatLng = { lat: 0, lng: 0 };

  constructor(button: HTMLButtonElement, domOverlayRoot: HTMLDivElement) {
    this.button = button;
    this.domOverlayRoot = domOverlayRoot;
  }

  /**
   * @description xr app 에 있어서 초기화 작업이 일어나는 함수입니다.
   */
  private initXRApp() {
    const { devicePixelRatio, innerHeight, innerWidth } = window;

    // Create a bew WebGL renderer and set the size + pixel ratio
    // antialias : 모델이 장면에 렌더링 될 때, 더 깨끗하게 보임
    // alpha  : 장면내에 투영되는 모든 항목에 대해 투명도를 설정가능
    const renderer = new t.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer = renderer;
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(devicePixelRatio);

    // Enable XR functionality on the renderer
    renderer.xr.enabled = true;

    ARCustomButton.connectToButton(this.button, renderer, {
      domOverlay: { root: this.domOverlayRoot },
      optionalFeatures: ["dom-overlay", "dom-overlay-for-handheld-ar"],
    });
    // Pass the renderer to the  createScene-function
    this.createScene(renderer);

    const onSuccess = (position: GeolocationPosition) => {
      const newRecord = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.myLatLng = newRecord;
      this.updateRoadSignBox();
      this.updatePosition();
    };

    const onError = () => {};

    this.watchId = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 3000,
    });
  }

  /**
   * @description 모든 함수보다 제일 먼저 실행되어야 하는 함수  (but 생성자 안에는 안됨.) browser 인식 x
   */
  async start() {
    // Check if browser supports WebXR with 'immersive-ar'
    const immersiveArSupported = await browserHasImmersiveArCompatibility();

    // Initailize app if supported.
    return immersiveArSupported
      ? this.initXRApp()
      : console.log(" xr feature is not supported for your browser");
  }

  private updatePosition() {
    this.scene.children.forEach((child, idx) => {
      const { x, y, z } = getXYZFromLatLng(
        this.myLatLng,
        this.childrenLatLng[idx]
      );
      child.position.set(x, y, z);
    });
  }

  /**
   * @description 화면상에 3d 장면을 렌더링 해주는 함수입니다.
   */
  private createScene(renderer: t.WebGLRenderer) {
    const scene = new t.Scene();
    this.scene = scene;
    const camera = new t.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera = camera;

    this.createRoadSignBox();

    this.animate();
  }

  /**
   * @description render를 60프레임으로 돌려주는 함수입니다/
   */
  private animate() {
    const renderer = this.renderer;
    this.renderer.setAnimationLoop(() => this.render(renderer));
    this.camera.updateMatrixWorld();
  }

  /**
   * @description 화면상에 카메라와 3d장면을 세팅해주는 함수입니다.
   */
  private render(renderer: t.WebGLRenderer) {
    if (renderer.xr.isPresenting) {
      renderer.render(this.scene, this.camera);
    }
  }

  /**
   * @param latLng  박스가 위치할 위도와 경로
   * @description 위도와 경도와 나의 위치를 기반으로 가상세계에 박스를 로딩해줍니다.
   */
  async createBox(latLng: LatLng) {
    const { x, y, z } = getXYZFromLatLng(this.myLatLng, latLng);
    const distance = computeDistanceMeters(this.myLatLng, latLng);
    const boxGeometry = new t.BoxGeometry(0.1, 0.1, 0.1);
    const texture = createDistanceTexture(distance);
    const boxMaterial = new t.MeshBasicMaterial({
      map: texture,
      side: t.DoubleSide,
    });

    const box = new t.Mesh(boxGeometry, boxMaterial);
    box.position.set(x, y, z);

    box.name = "box";

    this.childrenLatLng.push(latLng);
    this.scene.add(box);
  }

  /**
   * @description 표지만을 만드는 함수입니다. 각종 포인트 마다 표지만을 띄워 해당 포인트까지 얼마나 거리가 먼지를 나타내주는 역할을합니다.
   */
  createRoadSignBox() {
    const boxGeometry = new t.BoxGeometry(0.1, 0.1, 0.02);
    const distance = computeDistanceMeters(this.myLatLng, {
      lat: 35.9475028,
      lng: 128.4636795,
    });

    const boxMaterial = createRoadSignMaterial(distance);
    const box = new t.Mesh(boxGeometry, boxMaterial);
    box.position.set(0, 0, -0.2);
    box.name = "roadSignBox";

    this.scene.add(box);
    // wireframe
    var geo = new t.EdgesGeometry(box.geometry);
    var mat = new t.LineBasicMaterial({ color: 0x000000 });
    var wireframe = new t.LineSegments(geo, mat);
    this.childrenLatLng.push({
      lat: 35.9475028,
      lng: 128.4636795,
    });
    box.add(wireframe);
  }

  /**
   * @description roadSignBox의 위치와 거리를 업데이트 하는 함수입니다.
   */
  updateRoadSignBox() {
    const distance = computeDistanceMeters(this.myLatLng, {
      lat: 35.9474443,
      lng: 128.4637799,
    });

    const boxMaterial = createRoadSignMaterial(Math.round(distance));
    (this.scene.getObjectByName("roadSignBox") as t.Mesh).material =
      boxMaterial;
  }
}
