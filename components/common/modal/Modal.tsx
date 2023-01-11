import Image from "next/image";
import IProps from "../../../types/props.interface";
import { FiX } from "react-icons/fi";
import { useMemo, useRef } from "react";
import { FaTimes } from "react-icons/fa";

interface Props extends IProps {}

export default function Modal({ children }: Props) {
  return (
    /* background blur window */
    <div
      className="fixed inset-0
    z-50 flex items-center justify-center overflow-auto backdrop-blur-sm transition-all"
    >
      {/* main modal window */}
      <div className="flex min-h-fit w-full flex-col space-y-4 overflow-hidden border bg-white p-6  lg:max-w-md">
        {children}
      </div>
    </div>
  );
}

Modal.Header = function ({ children, hide }: Props & { hide: () => void }) {
  return (
    <div className="flex">
      <div className="flex-1">{children}</div>
      <div className="cursor-pointer" onClick={hide}>
        <FaTimes />
      </div>
    </div>
  );
};

Modal.Title = function ({ text }: { text: string }) {
  return (
    <p className="">
      <span className="text-lg font-bold tracking-widest">{text}</span>
    </p>
  );
};

Modal.Image = function ({ src }: { src: string }) {
  return (
    <div className="relative w-full">
      <Image
        className="z-50"
        src={src}
        width={1}
        height={1}
        layout={"responsive"}
      ></Image>
    </div>
  );
};

Modal.Description = function ({ text }: { text: string }) {
  const ref = useRef(0);
  const descriptionArr = useMemo(
    () =>
      text.split("<br />").filter((el) => {
        if (!el) ref.current++;

        return ref.current < 3;
      }),
    [text]
  );

  console.log(descriptionArr);

  return (
    <span className="overflow-hidden text-xs">
      {descriptionArr.map((description) => {
        return (
          <span>
            {description}
            <br />
          </span>
        );
      })}
    </span>
  );
};
