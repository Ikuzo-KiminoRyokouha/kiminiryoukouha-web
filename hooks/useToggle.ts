import { useState } from "react";

/**
 * @description True 와 False값의 State를 다룰 때 쓸 hooks 입니다.
 */
export default function useToggle(initailState: boolean) {
  const [value, setValue] = useState<boolean>(initailState);

  /**
   * @description value의 값을 이전의 값과 반대로 설정하는 함수입니다/
   */
  const onClick = () => {
    setValue((prev) => !prev);
  };

  /**
   * @description value의 값을 항상 true로 설정하는 함수입니다.
   */
  const setTrue = () => {
    setValue(() => true);
  };

  /**
   * @description value의 값을 항상 false로 설정하는 함수입니다.
   */
  const setFalse = () => {
    setValue(() => false);
  };

  return { value, onClick, setTrue, setFalse };
}
