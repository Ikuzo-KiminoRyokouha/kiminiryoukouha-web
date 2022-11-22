import * as t from "three";
import { XYZ } from "../../types/ar.interface";
import { browserHasImmersiveArCompatibility } from "../domUtil";
import ARCustomButton from "./ARCustomButton";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

export default class AR {
  private button: HTMLButtonElement;
  private domOverlayRoot: HTMLDivElement;
  private camera: t.PerspectiveCamera;
  private renderer: t.WebGLRenderer;

  scene: t.Scene;

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

    // // Add it to the Dom
    // document.body.appendChild(renderer.domElement);

    ARCustomButton.connectToButton(this.button, renderer, {
      domOverlay: { root: this.domOverlayRoot },
      optionalFeatures: ["dom-overlay", "dom-overlay-for-handheld-ar"],
    });
    // Pass the renderer to the  createScene-function
    this.scene = this.createScene(renderer);
    return this.scene;
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

  private createScene(renderer: t.WebGLRenderer) {
    const scene = new t.Scene();
    this.scene = scene;
    const camera = new t.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera = camera;

    this.createText({ x: 0, y: 0, z: -0.2 });
    // this.createBox({ x: 1, y: 1, z: 1 });

    // this.createBox({ x: 0, y: 0, z: 0.2 });

    // function renderLoop(timestamp: number, frame?: XRFrame) {
    //   // Only render content if XR view is presenting
    //   if (renderer.xr.isPresenting) {
    //     renderer.render(scene, camera);
    //   }
    // }
    // renderer.setAnimationLoop(renderLoop);
    this.animate();
    return scene;
  }

  animate() {
    const renderer = this.renderer;
    this.renderer.setAnimationLoop(() => this.render(renderer));
    this.camera.updateMatrixWorld();
  }

  render(renderer: t.WebGLRenderer) {
    if (renderer.xr.isPresenting) {
      renderer.render(this.scene, this.camera);
    }
  }

  /**
   * @description X,Y,Z 값을 기반으로 박스를 렌더링 해주는 함수입니다.
   */
  createBox({ x, y, z }: XYZ) {
    const boxGeometry = new t.BoxGeometry(0.1, 0.1, 0.1);
    const boxMaterial = new t.MeshBasicMaterial({ color: 0xff0000 });
    const box = new t.Mesh(boxGeometry, boxMaterial);
    box.position.set(x, y, z);
    this.scene.add(box);
  }

  /**
   *
   */
  createText({ x, y, z }: XYZ) {
    var MyWords = "Thomas Sebastian";
    var shape = new TextGeometry(MyWords, {
      font: "helvetiker",
      size: 24,
      curveSegments: 20,
      height: 4,
    });
    var wrapper = new t.MeshPhongMaterial({
      color: 0x65676,
      specular: 0x009900,
      shininess: 30,
    });
    var words = new t.Mesh(shape, wrapper);
    words.position.x = -80;
    words.position.z = 0;
    words.position.y = 20;
    this.scene.add(words);
  }
}
