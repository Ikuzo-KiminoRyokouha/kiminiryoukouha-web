import { RefObject } from "react";
import * as BABYLON from "babylonjs";
import { WebXREnterExitUIButton } from "babylonjs";
import { LatLng } from "../types/tmap.type";

/**
 * @description AR관련 전반적인 처리를 다루는 클래스입니다.
 */
export default class AR {
  private canvasRef: RefObject<HTMLCanvasElement>;
  private engine: BABYLON.Engine;
  private scene: BABYLON.Scene;
  private standardVector: BABYLON.Vector3;
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
    const scene = new BABYLON.Scene(this.engine);
    this.scene = scene;

    const camera = new BABYLON.FreeCamera(
      "camera",
      new BABYLON.Vector3(0, 0, 0)
    );
    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );

    var xr = await scene.createDefaultXRExperienceAsync({
      uiOptions: {
        ignoreSessionGrantedEvent: true,
        onError: (error) => {
          alert(error);
        },
        customButtons: [
          new WebXREnterExitUIButton(button, "immersive-ar", "local-floor"),
        ],
      },
      optionalFeatures: true,
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
      console.log(webXRState);
      switch (webXRState) {
        case BABYLON.WebXRState.ENTERING_XR:
        case BABYLON.WebXRState.IN_XR:
          this.setOverlayDomTrue();
          break;
        case BABYLON.WebXRState.EXITING_XR:
          this.setOverlayDomFalse();
          break;
      }
    });

    const arrow = await this.createArrow(scene);
    arrow.position = new BABYLON.Vector3(0, -10, 50);
    return scene;
  }

  /**
   * @description 화살표를 그리는 함수입니다/
   */

  async createArrow(scene: BABYLON.Scene): Promise<BABYLON.AbstractMesh> {
    const arrow = await BABYLON.SceneLoader.ImportMeshAsync(
      "arrow",
      "./assets/",
      "arrow.babylon",
      scene
    );
    return scene.getMeshByName("arrow");
  }

  /**
   * @description 위도 경도를 기반으로 가상세계의 좌표를 추측해주는 함수입니다.
   * @param lat 위도
   * @param lng 경도
   * @param radiusEarth  지구의 반지름 default 6371
   * @returns
   */
  getCoordinatesFromLatLng(
    lat: number,
    lng: number,
    radiusEarth = 6371
  ): BABYLON.Vector3 {
    let latitude_rad = (lat * Math.PI) / 180;
    let longitude_rad = (lng * Math.PI) / 180;

    console.log(latitude_rad, longitude_rad);

    let xPos = radiusEarth * Math.cos(latitude_rad) * Math.cos(longitude_rad);
    let zPos = radiusEarth * Math.cos(latitude_rad) * Math.sin(longitude_rad);
    let yPos = radiusEarth * Math.sin(latitude_rad);

    return new BABYLON.Vector3(xPos, yPos, zPos);
  }

  /**
   * @description 엔진을 돌려서 씬을 렌더링 시키는 함수입니다.
   */
  loopEngine(scene: BABYLON.Scene) {
    this.engine.runRenderLoop(function () {
      scene.render();
    });
  }

  /**
   * @description 위도와 경도에 대한 정보를 기반으로 준이 되는 벡터를 잡아주는 변수입니다.
   * @param latLng 위도와 경도에 대한 정보
   */
  setStandardVector(latLng: LatLng) {
    this.standardVector = this.getCoordinatesFromLatLng(
      parseFloat(latLng.lat),
      parseFloat(latLng.lng)
    );
    return this.standardVector;
  }
}
