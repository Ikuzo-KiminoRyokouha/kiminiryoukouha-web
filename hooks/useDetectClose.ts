import { useEffect, useRef, useState } from "react";

export default function useDetectClose(init: boolean) {
  const [isOpen, setIsOpen] = useState<boolean>(init);
  const ref = useRef(null);

  const removeHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current !== null && !ref.current.contains(e.target as Node)) {
        setIsOpen(!isOpen);
      }
    };
    if (isOpen) {
      window.addEventListener("click", onClick);
    }
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen]);

  return { isOpen, ref, removeHandler };
}
