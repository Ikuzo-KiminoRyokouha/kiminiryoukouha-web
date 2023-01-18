import {
  ComponentType,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
} from "react";
import { Info } from "../../types/plan.interface";
import IProps from "../../types/props.interface";
import React from "react";
import dynamic from "next/dynamic";

// Stepper 컴포넌트의 메인 타입
interface Props extends IProps {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  info: Info;
  title: string;
  sub: string;
}

// Stepper의 하위컴포넌트에서 공통적으로 쓰는 Props Context
const StepperContext = createContext<
  Pick<Props, "currentStep" | "setCurrentStep">
>({
  currentStep: 0,
  setCurrentStep: undefined,
});

/**
 * @description 단계적으로 정해진 틀의 무언가를 제시해주는 컴포넌트입니다.
 */
export default function Stepper({
  children,
  currentStep,
  setCurrentStep,
  title,
  sub,
}: Props) {
  return (
    <StepperContext.Provider value={{ currentStep, setCurrentStep }}>
      <div className="flex flex-1 flex-col items-center justify-center p-10 ">
        <div className="w-full max-w-2xl border p-2 shadow-xl ">
          <div>
            <p className="text-bold p-2 text-lg">{title}</p>
          </div>
          <div>
            <p className="text-bold p-2 text-base">{sub}</p>
          </div>
          <div className="p-0 md:p-5">{children}</div>
        </div>
      </div>
    </StepperContext.Provider>
  );
}

/**
 * @description Stepper의 각 단계별 아이콘과 타이틀을 표시해주는 원 컴포넌트 입니다.
 */
Stepper.Circle = ({
  icon,
  step,
  title,
}: {
  step: number;
  icon: string;
  title: string;
}) => {
  const { currentStep } = useContext(StepperContext);
  const Icon = dynamic(() =>
    import(`react-icons/${icon.substring(0, 2).toLowerCase()}/index.js`).then(
      (module) => module[icon]
    )
  );

  return (
    <div
      className={`relative flex items-center  ${
        step > currentStep && "text-teal-600"
      } ${step === currentStep && " text-white"}
 `}
    >
      <div
        className={`h-12 w-12 rounded-full border-2 ${
          step <= currentStep && "border-teal-600 bg-teal-600"
        } ${
          step < currentStep && "border-gray-300 bg-white text-white"
        }  flex items-center justify-center py-3 transition duration-500 ease-in-out`}
      >
        <Icon />
      </div>
      <div
        className={`absolute top-0 -ml-10 mt-16 w-32 text-center text-xs font-medium uppercase ${
          step >= currentStep && "text-teal-600"
        }`}
      >
        {title}
      </div>
    </div>
  );
};

/**
 * @description Stepper의 원과 원 사이를 이어주는 컴포넌트 입니다.
 */
Stepper.Line = ({ step }: { step: number }) => {
  const { currentStep } = useContext(StepperContext);
  return (
    <div
      className={`flex-auto border-t-2 ${
        currentStep >= step && "border-teal-600"
      } transition duration-500 ease-in-out`}
    ></div>
  );
};

interface HeaderProps extends IProps {}
/**
 * @description Stepper의 상단 Progress Bar를 감싸는 컴포넌트 입니다.
 */
Stepper.Header = ({ children }: HeaderProps) => {
  return (
    <div className="mx-4 p-4">
      <div className="flex items-center">{children}</div>
    </div>
  );
};

interface BodyProps extends IProps {}
/**
 * @description Stepper 메인(내용)부분입니다.
 */
Stepper.Body = ({ children }: BodyProps) => {
  return <div className="mt-8 p-4">{children}</div>;
};

interface StepButtonProps {
  maxStep: number;
  canNext: boolean;
}
/**
 * @description Stepper 하단부분의 Step진행 버튼들 입니다.
 */
Stepper.StepButton = ({ maxStep, canNext }: StepButtonProps) => {
  const { currentStep, setCurrentStep } = useContext(StepperContext);

  const goPrev = () => {
    if (currentStep < maxStep && currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goNext = () => {
    canNext && setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="mt-4 flex p-2">
      {currentStep < maxStep && (
        <>
          <button
            onClick={goPrev}
            className="flex cursor-pointer justify-center rounded border border-gray-600 bg-gray-100 px-4 py-2 text-base 
font-bold  
text-gray-700 
transition 
duration-200 ease-in-out hover:scale-110 
hover:bg-gray-200 focus:outline-none"
          >
            Previous
          </button>
          <div className="flex flex-auto flex-row-reverse">
            <button
              onClick={goNext}
              className="ml-2  flex  cursor-pointer justify-center rounded border border-teal-600 bg-teal-600 px-4 py-2 text-base 
font-bold  
text-teal-100 
transition 
duration-200 ease-in-out hover:scale-110 
hover:bg-teal-600 focus:outline-none"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
