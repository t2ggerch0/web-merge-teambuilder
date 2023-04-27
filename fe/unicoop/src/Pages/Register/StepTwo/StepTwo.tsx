import React, { FC } from "react";
import styles from "./StepTwo.module.scss";
import LabelInput from "../../../Components/LabelInput/LabelInput";
import PasswordInput from "./PasswordInput/PasswordInput";
import UnicoopButton from "../../../Components/UnicoopButton/UnicoopButton";
import { api } from "../../../API/api";
import { RegisterInfo } from "../../../interface";

type StepTwoProps = {
  studentId: number;
  major: string;
  password: string;
  isPasswordValid: boolean;
  setIsPasswordValid(e: boolean): void;
  passwordConfirm: string;
  setPasswordConfirm(e: string): void;
  onChange(name: string, value: string): void;
  setRegisterStep(e: number): void;
  changeBoxContent(): void;
  registerInfo: RegisterInfo;
};

const StepTwo: FC<StepTwoProps> = ({
  studentId,
  major,
  password,
  isPasswordValid,
  setIsPasswordValid,
  passwordConfirm,
  setPasswordConfirm,
  onChange,
  setRegisterStep,
  changeBoxContent,
  registerInfo,
}) => {
  const onClickPrevious = () => {
    setRegisterStep(1);
  };

  return (
    <div className={styles.stepTwo}>
      <LabelInput
        name={"studentId"}
        value={studentId !== 0 ? studentId : ""}
        title={"학번"}
        placeholder={"ex) 2023311234"}
        isPassword={false}
        isReadOnly={false}
        onChange={onChange}
      />

      <LabelInput
        name={"major"}
        value={major}
        title={"전공"}
        placeholder={"ex) 소프트웨어학과"}
        isPassword={false}
        isReadOnly={false}
        onChange={onChange}
      />

      <PasswordInput
        password={password}
        isPasswordValid={isPasswordValid}
        setIsPasswordValid={setIsPasswordValid}
        passwordConfirm={passwordConfirm}
        setPasswordConfirm={setPasswordConfirm}
        onChange={onChange}
      />

      <div className={styles.privacyNotice}>
        회원가입을 하시면, UNICOOP의 이용약관과 개인정보처리방침에 동의하게
        됩니다.
      </div>

      <div className={styles.buttons}>
        <UnicoopButton onClick={onClickPrevious}>이전</UnicoopButton>
        <UnicoopButton
          onClick={() =>
            api.verifyCode({
              changeBoxContent,
              isPasswordValid,
              passwordConfirm,
              registerInfo,
            })
          }
        >
          회원가입
        </UnicoopButton>
      </div>
    </div>
  );
};

export default StepTwo;
