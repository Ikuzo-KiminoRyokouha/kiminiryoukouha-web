import ReactDom from "react-dom";
import IProps from "@/types/props.interface";
import { useEffect, useState } from "react";

interface Props extends IProps {
  qs: string;
}
const Portal = ({ children, qs }: Props) => {
  const [element, setElement] = useState<HTMLElement | Element | null>(null);

  useEffect(() => {
    setElement(document.querySelector(qs));
  }, []);

  if (!element) {
    return <></>;
  }

  return ReactDom.createPortal(children, element);
};

export default Portal;
