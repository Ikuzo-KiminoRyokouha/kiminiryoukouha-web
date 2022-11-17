import { RefObject } from "react";
import * as BABYLON from "babylonjs";
import { WebXREnterExitUI, WebXREnterExitUIButton } from "babylonjs";
import AROverlayDom from "../components/layout/AROverlay";

/**
 * @description AR관련 전반적인 처리를 다루는 클래스입니다.
 */
export default class AR {
  private canvasRef: RefObject<HTMLCanvasElement>;
  private engine: BABYLON.Engine;
  private setOverlayDomTrue: () => void;
  private setOverlayDomFalse: () => void;
  constructor(
    canvasRef: RefObject<HTMLCanvasElement>,
    setOverlayDomTrue: () => void,
    setOverlayDomFalse: () => void
  ) {
    this.canvasRef = canvasRef;
    // 3D 엔진 로딩
    this.engine = new BABYLON.Engine(this.canvasRef.current, true);

    this.setOverlayDomFalse = setOverlayDomFalse;
    this.setOverlayDomTrue = setOverlayDomTrue;
  }

  /**
   * @description AR 장면 테스팅 함수입니다.
   * @returns scene 장면을 반환 , loopEngine 의 매개변수로 활용합니다.
   */
  async createScene(button: HTMLButtonElement) {
    var scene = new BABYLON.Scene(this.engine);

    const alpha = (3 * Math.PI) / 2;
    const beta = Math.PI / 50;
    const radius = 220;
    const target = new BABYLON.Vector3(0, 0, 0);

    const camera = new BABYLON.ArcRotateCamera(
      "Camera",
      alpha,
      beta,
      radius,
      target,
      scene
    );
    camera.attachControl(this.canvasRef.current, true);

    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 0.6;

    var xr = await scene.createDefaultXRExperienceAsync({
      uiOptions: {
        // sessionMode: "immersive-ar",
        // referenceSpaceType: "local-floor",
        ignoreSessionGrantedEvent: true,
        onError: (error) => {
          alert(error);
        },
        customButtons: [
          new WebXREnterExitUIButton(button, "immersive-ar", "local-floor"),
        ],
      },
      optionalFeatures: true,
      // disableDefaultUI: true,
    });

    const fm = xr.baseExperience.featuresManager;

    const domOverlayFeature = fm.enableFeature(
      BABYLON.WebXRDomOverlay,
      "latest",
      {
        element: "#ar-overlay-dom",
      },
      undefined,
      false
    );

    xr.baseExperience.onStateChangedObservable.add((webXRState) => {
      switch (webXRState) {
        case BABYLON.WebXRState.ENTERING_XR:
        case BABYLON.WebXRState.IN_XR:
          // domOverlayType will be null when not supported.
          this.setOverlayDomTrue();
          break;
        case BABYLON.WebXRState.EXITING_XR:
          this.setOverlayDomFalse();
          break;
      }
    });

    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    box.position.x = 0;
    box.position.y = 0;
    box.position.z = 10;

    return scene;
  }

  /**
   * @description 엔진을 돌려서 씬을 렌더링 시키는 함수입니다.
   */
  loopEngine(scene: BABYLON.Scene) {
    this.engine.runRenderLoop(function () {
      scene.render();
    });
  }
}
