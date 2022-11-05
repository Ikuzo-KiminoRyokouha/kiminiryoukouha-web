import { ChangeEvent, useState } from "react";

/**
 * @description input 태그에서 value 와 onChange property의 코드량을 줄이기 위한 훅
 */
const useInput = (initailState: string) => {
  const [value, setValue] = useState<string>(initailState);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return { value, onChange };
};

export default useInput;
