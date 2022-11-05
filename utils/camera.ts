import { RefObject } from "react";
import * as BABYLON from "babylonjs";

/**
 * @param {RefObject<HTMLVideoElement>} videoRef - 카메라로부터 전달되어서 온 메타데이터를 담을 변수
 * @description 카메라관련 전반적인 처리를 다룰 예정의 클래스
 */
export default class ARCamera {
  private videoRef: RefObject<HTMLVideoElement>;
  private canvasRef: RefObject<HTMLCanvasElement>;
  private engine: BABYLON.Engine;

  constructor(
    videoRef: RefObject<HTMLVideoElement>,
    canvasRef: RefObject<HTMLCanvasElement>
  ) {
    // 비디오와 캔버스 초기화
    this.videoRef = videoRef;
    this.canvasRef = canvasRef;

    // 3D 엔진 로딩
    this.engine = new BABYLON.Engine(this.canvasRef.current, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });
  }

  /**
   * @description 카메라 접근후 메타데이터를 변수에 전달하는 함수
   */
  async accessCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    const video = this.videoRef.current;
    if (video) {
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
      };
    }
  }

  /**
   * @description 카메라와 캔버스가 존재한다면 캔버스에 비디오를 그려준다. accessCamera() 함수가 선행되어야 한다.
   *
   */
  drawCanvas() {
    const video = this.videoRef?.current;
    const canvas = this.canvasRef?.current;
    if (video && canvas) {
      const render = () => {
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(video, 0, 0, 600, 400);
        requestAnimationFrame(render);
      };
      requestAnimationFrame(render);
    }
  }

  async createScene() {
    // 기본 BJS 씬 오브젝트
    const scene = new BABYLON.Scene(this.engine);

    // 카메라를 0,5,-10 포지션에 배치
    const camera = new BABYLON.FreeCamera(
      "camera1",
      new BABYLON.Vector3(0, 5, -10),
      scene
    );

    // 씬 오리진 부분(0,0,0)를 바라봄
    camera.setTarget(BABYLON.Vector3.Zero());

    // 이 카메라를 캔버스에 붙임
    camera.attachControl(this.canvasRef.current, false);

    var light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );

    light.intensity = 0.7;

    var sphere = BABYLON.MeshBuilder.CreateSphere(
      "sphere1",
      { segments: 16, diameter: 2 },
      scene
    );
    sphere.position.y = 2;
    sphere.position.z = 5;

    const xr = await scene.createDefaultXRExperienceAsync({
      // ask for an ar-session
      uiOptions: {
        sessionMode: "immersive-ar",
      },
    });

    return scene;
  }
}
