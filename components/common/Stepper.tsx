import { Dispatch, ReactSVGElement, SetStateAction } from "react";
import { Info } from "../../types/plan.interface";
import IProps from "../../types/props.interface";

interface Props extends IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  canGoNext: () => void;
  info: Info;
}

export default function Stepper({ children, step, setStep, canGoNext }: Props) {
  return (
    <div className="p-5">
      <div className="mx-4 p-4">
        <div className="flex items-center">
          <div
            className={`relative flex items-center ${
              step > 1 && "text-teal-600"
            } ${step === 1 && " text-white "}`}
          >
            <div
              className={`h-12 w-12 rounded-full border-2 ${
                step === 1 && "bg-teal-600"
              } border-teal-600 py-3 transition duration-500 ease-in-out`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-bookmark "
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div
              className={`absolute top-0 -ml-10 mt-16 w-32 text-center text-xs font-medium uppercase ${
                step >= 1 && "text-teal-600"
              }`}
            >
              Personal
            </div>
          </div>
          <div
            className={`flex-auto border-t-2 ${
              step >= 1 && "border-teal-600"
            } transition duration-500 ease-in-out`}
          ></div>
          <div
            className={`relative flex items-center  ${
              step >= 2 && "text-teal-600"
            } ${step > 2 && " text-white"}`}
          >
            <div
              className={`h-12 w-12 rounded-full border-2 ${
                step >= 2 && "border-teal-600 bg-white"
              } ${
                step < 2 && "border-gray-300"
              }  py-3 transition duration-500 ease-in-out`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-user-plus "
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </div>
            <div
              className={`absolute top-0 -ml-10 mt-16 w-32 text-center text-xs font-medium uppercase ${
                step >= 2 && "text-teal-600"
              }`}
            >
              Account
            </div>
          </div>
          <div
            className={`flex-auto border-t-2  ${
              step >= 2 && "border-teal-600"
            } border-gray-300 transition duration-500 ease-in-out`}
          ></div>
          <div
            className={`relative flex items-center ${
              step > 3 && "text-teal-600"
            } ${step === 3 && " text-white"}`}
          >
            <div
              className={`h-12 w-12 rounded-full border-2 ${
                step > 3 && "border-teal-600 bg-white"
              } ${
                step === 3 && "bg-teal-600"
              } py-3 transition duration-500 ease-in-out`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-mail "
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div
              className={`absolute top-0 -ml-10 mt-16 w-32 text-center text-xs font-medium uppercase ${
                step >= 3 && "text-teal-600"
              }`}
            >
              Message
            </div>
          </div>
          <div
            className={`flex-auto border-t-2  ${
              step >= 3 && "border-teal-600"
            } border-gray-300 transition duration-500 ease-in-out`}
          ></div>
          <div
            className={`relative flex items-center ${
              step > 4 && "text-teal-600"
            } ${step >= 4 && " text-white"}`}
          >
            <div
              className={`h-12 w-12 rounded-full border-2 ${
                step > 4 && "border-teal-600 bg-white"
              } ${
                step === 4 && "bg-teal-600"
              } py-3 transition duration-500 ease-in-out`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-database "
              >
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
              </svg>
            </div>
            <div
              className={`absolute top-0 -ml-10 mt-16 w-32 text-center text-xs font-medium uppercase ${
                step >= 4 && "text-teal-600"
              }`}
            >
              Confirm
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 p-4">
        {children}
        <div className="mt-4 flex p-2">
          {step < 4 && (
            <>
              <button
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
                  onClick={canGoNext}
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
      </div>
    </div>
  );
}

Stepper.Circle = function ({
  currentStep,
  icon,
  step,
}: {
  step: number;
  icon: ReactSVGElement;
  currentStep: number;
}) {
  return (
    <div
      className={`relative flex items-center ${
        currentStep > step && "text-teal-600"
      } ${currentStep === step && " text-white "}`}
    >
      <div
        className={`h-12 w-12 rounded-full border-2 ${
          currentStep === step && "bg-teal-600"
        } border-teal-600 py-3 transition duration-500 ease-in-out`}
      >
        {icon}
      </div>
      <div
        className={`absolute top-0 -ml-10 mt-16 w-32 text-center text-xs font-medium uppercase ${
          currentStep >= step && "text-teal-600"
        }`}
      >
        Personal
      </div>
    </div>
  );
};

Stepper.Line = function ({
  step,
  currentStep,
}: {
  step: number;
  currentStep: number;
}) {
  return (
    <div
      className={`flex-auto border-t-2 ${
        currentStep >= step && "border-teal-600"
      } transition duration-500 ease-in-out`}
    ></div>
  );
};
