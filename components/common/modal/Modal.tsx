import Image from "next/image";
import IProps from "../../../types/props.interface";
import { FiX } from "react-icons/fi";

interface Props extends IProps {}

export default function Modal({ children }: Props) {
  return (
    /* background blur window */
    <div
      className="fixed inset-0
    z-50 flex items-center justify-center overflow-auto backdrop-blur-sm transition-all"
    >
      {/* main modal window */}
      <div className="flex min-h-fit w-full flex-col space-y-4 overflow-hidden border bg-white p-6 lg:w-1/6 lg:max-w-xl">
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
        <FiX />
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
  return <span className="overflow-hidden">{text}</span>;
};
