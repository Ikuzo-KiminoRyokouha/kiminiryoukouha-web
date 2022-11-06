import { useEffect, useState } from "react";

/**
 * @description 혹시 바꿀거면 민규한테 물어보고 바꿀 것
 * @param {string} src script 태그에서 쓰는 URL
 * @returns {loading, error} 로딩과 에러 정보를 반환시켜줌
 */
const useScript = (src: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [additionalScriptLoaing, setAdditionalScriptLoading] = useState(false);
  useEffect(() => {
    // document.write 메서드 잠시 저장
    const oldDocumentWrite = document.write;

    // document.write 잠시 바꾸기
    document.write = function (node) {
      // 노드를 스크립트 태그로 바꾸기 위한 작업
      const temp = document.createElement("template");
      temp.innerHTML = node;

      const script = document.createElement("script");
      script.src = (temp.content.firstChild as HTMLScriptElement).src;

      script.onload = () => {
        // 로드가 끝났으면 document.write 원상복구
        document.write = oldDocumentWrite;
        setAdditionalScriptLoading(true);
      };

      document.body.appendChild(script);
    };

    // 스크립트 태그가 있는지 확인
    let script: HTMLScriptElement = document.querySelector(
      `script[src="${src}"]`
    ) as HTMLScriptElement;

    // 없으면 만들어서 실행
    if (!script) {
      script = document.createElement("script") as HTMLScriptElement;
      script.src = src;
    }

    // 에러와 로딩이 끝났을 때의 핸들러 설정
    const handleLoad = () => {
      setLoading(false);
    };
    const handleError = (error: Error) => setError(error);

    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError as any);

    document.body.appendChild(script);

    // 핸들러 해제
    return () => {
      script.removeEventListener("load", handleLoad);
      script.removeEventListener("error", handleError as any);
    };
  }, [src]);

  return { loading, error, additionalScriptLoaing };
};

export default useScript;
