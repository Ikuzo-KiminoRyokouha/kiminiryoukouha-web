import { MutableRefObject } from "react";

/**
 * @param {MutableRefObject<HTMLVideoElement>} videoRef - 카메라로부터 전달되어서 온 메타데이터를 담을 변수
 * @description 카메라관련 전반적인 처리를 다룰 예정의 클래스
 */
export default class Camera {
  private videoRef: MutableRefObject<HTMLVideoElement>;

  constructor(videoRef: MutableRefObject<HTMLVideoElement>) {
    this.videoRef = videoRef;
  }

  /**
   * @description 카메라 접근후 메타데이터를 변수에 전달하는 함수
   */
  async accessCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
      },
      audio: false,
    });
    this.videoRef.current.srcObject = stream;
  }
}
