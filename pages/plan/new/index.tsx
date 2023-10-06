import Stepper from "@/common/Stepper";
import { Info } from "@/types/plan.interface";
import stepMap from "@/utils/dataMap/planStepperStepMap.json";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import React from "react";

import {
  StepFour,
  StepOne,
  StepThree,
  StepTwo,
} from "../../../components/plan/Step";

const StepInfoContext = createContext<{
  info: Info;
  setInfo: Dispatch<SetStateAction<Info>>;
  setCanNext: Dispatch<SetStateAction<boolean>>;
}>({
  info: undefined,
  setInfo: undefined,
  setCanNext: undefined,
});

export default function New() {
  const [info, setInfo] = useState<Info>({
    tag: undefined,
    region: "",
    startDate: "",
    endDate: "",
    money: 0,
    areacode: "",
    sigungucode: "",
  });
  const [step, setStep] = useState<number>(1); //현재스탭에대한 값
  const [canNext, setCanNext] = useState<boolean>(false);

  return (
    <StepInfoContext.Provider value={{ info, setInfo, setCanNext }}>
      <Stepper
        title={"旅行前設定"}
        sub={"旅行計画のための情報を入力してください"}
        info={info}
        currentStep={step}
        setCurrentStep={setStep}
      >
        <Stepper.Header>
          {stepMap.map((step, idx) => {
            return (
              <React.Fragment key={idx + 10}>
                <Stepper.Circle {...step} />
                {idx + 1 < stepMap.length && <Stepper.Line step={step.step} />}
              </React.Fragment>
            );
          })}
        </Stepper.Header>
        <Stepper.Body>
          {/* 나라 선택 */}
          {step === 1 && <StepOne ctx={StepInfoContext} />}
          {step === 2 && <StepTwo ctx={StepInfoContext} />}
          {step === 3 && <StepThree ctx={StepInfoContext} />}
          {step === 4 && <StepFour ctx={StepInfoContext} />}
        </Stepper.Body>
        <Stepper.StepButton
          canNext={canNext}
          maxStep={stepMap.length}
        ></Stepper.StepButton>
      </Stepper>
    </StepInfoContext.Provider>
  );
}
