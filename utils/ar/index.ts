import * as t from "three";
import { LatLng } from "../../types/tmap.type";
import { browserHasImmersiveArCompatibility } from "../domUtil";
import ARCustomButton from "./ARCustomButton";

export default class ARTest {
  private button: HTMLButtonElement;
  private domOverlayRoot: HTMLDivElement;

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
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(devicePixelRatio);

    // Enable XR functionality on the renderer
    renderer.xr.enabled = true;

    // Add it to the Dom
    document.body.appendChild(renderer.domElement);

    ARCustomButton.connectToButton(this.button, renderer, {
      domOverlay: { root: this.domOverlayRoot },
      optionalFeatures: ["dom-overlay", "dom-overlay-for-handheld-ar"],
    });

    // Pass the renderer to the  createScene-function
    this.createScene(renderer);
  }

  /**
   * @description
   */
  async start() {
    // Check if browser supports WebXR with 'immersive-ar'
    const immersiveArSupported = await browserHasImmersiveArCompatibility();

    // Initailize app if supported.
    immersiveArSupported
      ? this.initXRApp()
      : console.log(" xr feature is not supported for your browser");
  }

  private createScene(renderer: t.WebGLRenderer) {
    const scene = new t.Scene();
    const camera = new t.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    const boxGeometry = new t.BoxGeometry(0.1, 0.1, 0.1);
    const boxMaterial = new t.MeshBasicMaterial({ color: 0xff0000 });
    const box = new t.Mesh(boxGeometry, boxMaterial);
    box.position.set(-2.171883021654733, 0, -0.9907470404624489);

    scene.add(box);

    function renderLoop(timestamp: number, frame?: XRFrame) {
      box.rotation.x += 0.01;
      box.rotation.y += 0.01;

      // Only render content if XR view is presenting
      if (renderer.xr.isPresenting) {
        renderer.render(scene, camera);
      }
    }
    renderer.setAnimationLoop(renderLoop);
  }

  createBoxOnSopa(scene: t.Scene, myLatLng: LatLng) {
    const position = { x: 0, y: 0, z: 0 };
  }
}
