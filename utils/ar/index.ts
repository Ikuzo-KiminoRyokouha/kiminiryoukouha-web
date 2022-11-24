import * as t from "three";
import { XYZ } from "../../types/ar.interface";
import { LatLng } from "../../types/tmap.type";
import { browserHasImmersiveArCompatibility } from "../domUtil";
import ARCustomButton from "./ARCustomButton";
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
      this.updatePosition();
    };

    const onError = () => {};

    this.watchId = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 27000,
    });
  }

  /**
   * @description
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
      if (child.name === "box") {
        const { x, y, z } = getXYZFromLatLng(
          this.myLatLng,
          this.childrenLatLng[idx]
        );
        child.position.set(x, y, z);
        child.updateMatrix();
      }
    });
  }

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

    this.animate();
  }

  private animate() {
    const renderer = this.renderer;
    this.renderer.setAnimationLoop(() => this.render(renderer));
    this.camera.updateMatrixWorld();
  }

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
    const texture = this.createTexture(distance);
    const boxMaterial = new t.MeshBasicMaterial({
      map: texture,
      side: t.DoubleSide,
    });

    const box = new t.Mesh(boxGeometry, boxMaterial);
    box.position.set(x, y, z);

    box.name = "b ox";

    this.childrenLatLng.push(latLng);
    this.scene.add(box);
  }

  /**
   *
   * @param distance  현재 나의 좌표와 해당 포인트가 얼마나 먼지 에 대한 거리 (단위 : meter)
   */
  createTexture(distance: number) {
    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 1000;
    const ctx = canvas.getContext("2d");
    ctx.font = "Bold 100px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255,0,0,0.95)";
    const text = distance > 1000 ? distance / 1000 + "km" : distance + "m";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new t.Texture(canvas);

    texture.needsUpdate = true;

    return texture;
  }
}
