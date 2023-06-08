import React, { FC } from "react";
import styles from "./StepTwo.module.scss";
import PasswordInput from "./PasswordInput/PasswordInput";
import MergeButton from "../../../../Components/MergeButton/MergeButton";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../../API/authApi";
import { RegisterInfo } from "../../../../interface";

type StepTwoProps = {
  password: string;
  isPasswordValid: boolean;
  setIsPasswordValid(e: boolean): void;
  passwordConfirm: string;
  setPasswordConfirm(e: string): void;
  onChange(name: string, value: string): void;
  setRegisterStep(e: number): void;
  setJoinMode(e: string): void;
  registerInfo: RegisterInfo;
};

const StepTwo: FC<StepTwoProps> = ({
  password,
  isPasswordValid,
  setIsPasswordValid,
  passwordConfirm,
  setPasswordConfirm,
  onChange,
  setRegisterStep,
  setJoinMode,
  registerInfo,
}) => {
  const navigate = useNavigate();

  const onClickPrevious = () => {
    setRegisterStep(1);
  };

  return (
    <div className={styles.stepTwo}>
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
        <MergeButton width={190} onClick={onClickPrevious}>
          이전
        </MergeButton>
        <MergeButton
          backgroundColor={"#435EA4"}
          width={190}
          onClick={() => {
            authApi
              .verifyCode({
                isPasswordValid,
                passwordConfirm,
                registerInfo,
              })
              .then();

            setTimeout(() => {
              setJoinMode("login");
            }, 3000);
            navigate("/");
          }}
        >
          회원가입
        </MergeButton>
      </div>
    </div>
  );
};

export default StepTwo;
