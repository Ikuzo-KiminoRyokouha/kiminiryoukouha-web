import { ChangeEvent, ChangeEventHandler, useState } from "react";

/**
 * @description input 태그에서 value 와 onChange property의 코드량을 줄이기 위한 훅
 */
const useInput = <T = string>(
  initailState: T,
  placeholder?: string,
  mode: string = "text"
) => {
  const [value, setValue] = useState<T>(initailState);
  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
  ) => {
    if (typeof e === "string") {
      setValue(e as T);
    } else if (mode === "number") {
      const numV = parseInt(e.target.value);
      if (isNaN(numV)) {
        if (!e.target.value) {
          setValue(0 as T);
        }
        return;
      }
      if (numV > 999) {
        setValue(999 as T);
      }
      setValue(numV as T);
    } else {
      setValue(e.target.value as T);
    }
  };

  return { value, onChange, placeholder };
};

export default useInput;
