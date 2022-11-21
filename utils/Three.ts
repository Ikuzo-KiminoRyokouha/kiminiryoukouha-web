import * as t from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import { browserHasImmersiveArCompatibility } from "./domUtil";

class ARTest {
  constructor() {}

  initXRApp() {
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

    document.body.appendChild(
      ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] })
    );

    // Pass the renderer to the  createScene-function
    this.createScene(renderer);

    // Display a welcome message to the user
    alert("hello");
  }

  async start() {
    // Check if browser supports WebXR with 'immersive-ar'
    const immersiveArSupported = await browserHasImmersiveArCompatibility();

    // Initailize app if supported.
    immersiveArSupported
      ? this.initXRApp()
      : alert(" xr feature is not supported for your browser");
  }

  createScene(renderer: t.WebGLRenderer) {
    const scene = new t.Scene();

    const camera = new t.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.02,
      20
    );

    const boxGeometry = new t.BoxGeometry(1, 1, 1);
    const boxMaterial = new t.MeshBasicMaterial({ color: 0xff0000 });
    const box = new t.Mesh(boxGeometry, boxMaterial);
    box.position.z = -3;

    scene.add(box);

    function renderLoop(timestamp: number, frame?: XRFrame) {
      // Only render content if XR view is presenting
      if (renderer.xr.isPresenting) {
        renderer.render(scene, camera);
      }
    }
    renderer.setAnimationLoop(renderLoop);
  }
}
