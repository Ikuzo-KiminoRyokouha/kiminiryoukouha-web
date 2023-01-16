import Stepper from "@/common/Stepper";
import { Info } from "@/types/plan.interface";
import stepMap from "@/utils/dataMap/planStepperStepMap.json";
import dynamic from "next/dynamic";
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
}>({
  info: undefined,
  setInfo: undefined,
});

export default function New() {
  const [info, setInfo] = useState<Info>({
    tag: undefined,
    region: "",
    startDate: "",
    endDate: "",
    money: 0,
  });
  const [step, setStep] = useState<number>(1);

  const goNext = () => {
    if (step === 1) {
      if (!info.startDate || !info.endDate) {
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!info.region) {
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!info.money) {
        return;
      }
      setStep(4);
    }
  };

  return (
    <StepInfoContext.Provider value={{ info, setInfo }}>
      <Stepper
        title={"여행 사전 설정"}
        sub={"여행 계획을 위한 사전정보를 입력해주세요"}
        info={info}
        currentStep={step}
        setCurrentStep={setStep}
      >
        <Stepper.Header>
          {stepMap.map((step, idx) => {
            return (
              <React.Fragment key={idx}>
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
          maxStep={stepMap.length}
          goNext={goNext}
        ></Stepper.StepButton>
      </Stepper>
    </StepInfoContext.Provider>
  );
}
