import { WebGLRenderer } from "three";
import { ARButtonSessionInit } from "three/examples/jsm/webxr/ARButton";

interface ARCustomButtonSessionInit extends ARButtonSessionInit {}

export default class ARCustomButton {
  /**
   * @description AR 진입 / 나가기 기능을 돔 안의 버튼을 대상으로 연결시켜주는 함수
   */
  static connectToButton(
    button: HTMLButtonElement,
    renderer: WebGLRenderer,
    sessionInit: ARCustomButtonSessionInit
  ) {
    function showStartAR() {
      if (sessionInit.domOverlay === undefined) {
        const overlay = document.createElement("div");
        overlay.style.display = "none";
        document.body.appendChild(overlay);

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svg.setAttribute("width", "38");
        svg.setAttribute("height", "38");
        svg.style.position = "absolute";
        svg.style.right = "20px";
        svg.style.top = "20px";
        svg.addEventListener("click", function () {
          currentSession.end();
        });
        overlay.appendChild(svg);

        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        path.setAttribute("d", "M 12,12 L 28,28 M 28,12 12,28");
        path.setAttribute("stroke", "#fff");
        path.setAttribute("stroke-width", "2");
        svg.appendChild(path);

        if (sessionInit.optionalFeatures === undefined) {
          sessionInit.optionalFeatures = [];
        }

        sessionInit.optionalFeatures.push("dom-overlay");
        sessionInit.domOverlay = { root: overlay };
      }
      let currentSession: XRSession = null;

      async function onSessionStarted(session: XRSession) {
        session.addEventListener("end", onSessionEnded);

        renderer.xr.setReferenceSpaceType("local");

        await renderer.xr.setSession(session);

        sessionInit.domOverlay.root.style.display = "block";

        currentSession = session;
      }

      function onSessionEnded(/*event*/) {
        currentSession.removeEventListener("end", onSessionEnded);

        sessionInit.domOverlay.root.style.display = "none";

        currentSession = null;
      }

      button.onclick = function click() {
        if (currentSession === null) {
          console.log(currentSession);
          navigator.xr
            .requestSession("immersive-ar", sessionInit)
            .then(onSessionStarted);
        } else {
          currentSession.end();
        }
      };
    }

    function disableButton() {
      button.onclick = () => {};
    }

    function showARNotSupported() {
      disableButton();
    }

    function showARNotAllowed(exception: Error) {
      disableButton();
    }

    if ("xr" in navigator) {
      navigator.xr
        .isSessionSupported("immersive-ar")
        .then((supported) => {
          supported ? showStartAR() : showARNotSupported();
        })
        .catch(showARNotAllowed);
      return button;
    } else {
      const message = document.createElement("a");

      if (window.isSecureContext === false) {
        message.href = document.location.href.replace(/^http:/, "https:");
        message.innerHTML = "WEBXR NEEDS HTTPS"; // TODO Improve message
      } else {
        message.href = "https://immersiveweb.dev/";
        message.innerHTML = "WEBXR NOT AVAILABLE";
      }

      message.style.left = "calc(50% - 90px)";
      message.style.width = "180px";
      message.style.textDecoration = "none";

      return message;
    }
  }
}
