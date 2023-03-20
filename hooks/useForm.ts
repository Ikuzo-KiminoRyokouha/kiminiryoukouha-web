import { useRef } from "react";

interface UseFormRef {
  [key: string]: HTMLInputElement;
}

export default function useForm() {
  const inputRefs = useRef<UseFormRef>({});

  const register = (key: string, placeholder: string) => {
    const ref = (el: HTMLInputElement) => {
      inputRefs.current[key] = el;
    };

    return { ref, placeholder };
  };

  const handleSubmit = (cb: any) => {
    const body = {};
    Object.keys(inputRefs.current).map((el) => {
      body[el] = inputRefs.current[el].value;
    });

    cb(body);
  };
  return { register, handleSubmit };
}
