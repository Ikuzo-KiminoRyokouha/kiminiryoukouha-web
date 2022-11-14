import { ChangeEvent, useState } from "react";

/**
 * @description input 태그에서 value 와 onChange property의 코드량을 줄이기 위한 훅
 */
const useInput = (initailState: string, placeholder: string) => {
  const [value, setValue] = useState<string>(initailState);
  const onChange = (e: ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e === "string") {
      setValue(e);
    } else {
      setValue(e.target.value);
    }
  };

  return { value, onChange, placeholder };
};

export default useInput;
