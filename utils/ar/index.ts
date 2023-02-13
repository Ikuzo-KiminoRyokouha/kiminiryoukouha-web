import * as t from "three";
import { Mesh } from "three";
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
  group: t.Group;
  renderer: t.WebGLRenderer;
  scene: t.Scene;
  camera: t.PerspectiveCamera;
  myLatLng: LatLng = { lat: 0, lng: 0 };
  EARTH = 40075016.68;
  HALF_EARTH = 20037508.34;
  private childrenLatLng: Array<LatLng> = [this.myLatLng];

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
    renderer.xr.getCamera().position.set(0, 0, 0);

    ARCustomButton.connectToButton(this.button, renderer, {
      domOverlay: { root: this.domOverlayRoot },
      optionalFeatures: ["dom-overlay", "dom-overlay-for-handheld-ar"],
    });
    // Pass the renderer to the  createScene-function
    this.createScene(renderer);
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
      : console.log("xr feature is not supported for your browser");
  }

  lonToSphMerc(lon: number) {
    return (lon / 180) * this.HALF_EARTH;
  }

  latToSphMerc(lat: number) {
    var y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180);
    return (y * this.HALF_EARTH) / 180.0;
  }
  project(latLng: LatLng) {
    return [this.lonToSphMerc(latLng.lng), this.latToSphMerc(latLng.lat)];
  }

  add(object: Mesh, latLng: LatLng) {
    this.setWorldPosition(object, latLng);

    this.scene.add(object);
  }

  updatePosition(myLatLng: LatLng) {
    this.scene.children.forEach((child, idx) => {
      if (idx === 0) return;
      this.setWorldPosition(child, this.childrenLatLng[idx]);
    });
  }

  lonLatToWorldCoords(latLng: LatLng) {
    const projectedPos = this.project(latLng);
    return [projectedPos[0], -projectedPos[1]];
  }

  setWorldPosition(object: t.Object3D, latLng: LatLng, elev?: number) {
    const worldCoords = this.lonLatToWorldCoords(latLng);
    // console.log("worldCoords", worldCoords);
    // alert(worldCoords);
    [object.position.x, object.position.z] = worldCoords;

    if (elev !== undefined) {
      object.position.y = elev;
    }
  }

  setARCameraPosition(latLng: LatLng) {
    // const xrCamera = this.renderer.xr.getCamera();

    this.setWorldPosition(this.group, latLng);
    this.group.updateMatrix();
    console.log("group : ", this.group.position);
    // xrCamera.updateMatrixWorld(true);
    // this.renderer.xr.updateCamera(this.camera);
    // this.renderer.xr.updateCamera(xrCamera);
  }

  /**
   * @description 화면상에 3d 장면을 렌더링 해주는 함수입니다.
   */
  private createScene(renderer: t.WebGLRenderer) {
    const scene = new t.Scene();
    this.scene = scene;
    const camera = new t.PerspectiveCamera(
      80,
      2, // window.innerWidth / window.innerHeight,
      0.1,
      50000
    );
    // camera.lookAt(0, 0, 0);
    this.camera = camera;
    this.group = new t.Group();
    this.group.add(camera);

    scene.add(this.group);
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
  async createBox(myLatLng: LatLng, latLng: LatLng, color: string = "skyblue") {
    // const { x, y, z } = getXYZFromLatLng(myLatLng, latLng);
    const distance = computeDistanceMeters(myLatLng, latLng);
    const boxGeometry = new t.BoxGeometry(0.1, 0.1, 0.1);
    const texture = createDistanceTexture(distance, color);
    const boxMaterial = createRoadSignMaterial(distance, color);
    // const boxMaterial = new t.MeshBasicMaterial({
    //   map: texture,
    //   side: t.DoubleSide,
    // });

    const box = new t.Mesh(boxGeometry, boxMaterial);
    // box.position.set(0, 0, -5);
    // this.scene.add(box);

    this.childrenLatLng.push(latLng);
    this.add(box, latLng);
  }

  /**
   * @description 표지만을 만드는 함수입니다. 각종 포인트 마다 표지만을 띄워 해당 포인트까지 얼마나 거리가 먼지를 나타내주는 역할을합니다.
   */
  createRoadSignBox(myLatLng: LatLng, destLatLng: LatLng) {
    const boxGeometry = new t.BoxGeometry(0.1, 0.1, 0.02);
    const distance = computeDistanceMeters(myLatLng, destLatLng);
    const boxMaterial = createRoadSignMaterial(distance);
    const box = new t.Mesh(boxGeometry, boxMaterial);
    // const { x, y, z } = getXYZFromLatLng(myLatLng, destLatLng);

    // box.position.set(x, y, z);
    this.setWorldPosition(box, destLatLng);
    box.name = "roadSignBox";

    this.scene.add(box);
    // wireframe
    var geo = new t.EdgesGeometry(box.geometry);
    var mat = new t.LineBasicMaterial({ color: 0x000000 });
    var wireframe = new t.LineSegments(geo, mat);
    this.childrenLatLng.push(destLatLng);
    box.add(wireframe);
  }

  /**
   * @description roadSignBox의 위치와 거리를 업데이트 하는 함수입니다.
   */
  updateRoadSignBox(myLatLng: LatLng, destLatLng: LatLng) {
    const distance = computeDistanceMeters(myLatLng, destLatLng);

    const boxMaterial = createRoadSignMaterial(Math.round(distance));
    (this.scene.getObjectByName("roadSignBox") as t.Mesh).material =
      boxMaterial;
  }

  /**
   * @description 위도 경도를 바탕으로 사이에 선을 그려주는 함수입니다.
   */
  drawLine(...latLngArr: Array<LatLng>) {
    const material = new t.LineBasicMaterial({ color: 0x0000ff, linewidth: 3 });

    const points = [
      // new t.Vector3(14304207.259265166, 0, -4293172.723276655),
      // new t.Vector3(14304209.485654984, 0, -4293172.723276655),
    ];

    // console.log(this.group.position);

    latLngArr.forEach((latLng) => {
      const worldCoords = this.lonLatToWorldCoords(latLng);
      const [x, z] = worldCoords;
      const vector = new t.Vector3(x, 0, z);
      points.push(vector);
    });

    const geometry = new t.BufferGeometry().setFromPoints(points);
    const line = new t.Line(geometry, material);

    this.scene.add(line);
  }
}
