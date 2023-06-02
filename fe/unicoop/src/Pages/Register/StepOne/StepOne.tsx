import React, { FC } from "react";
import styles from "./StepOne.module.scss";
import LabelInput from "../../../Components/LabelInput/LabelInput";
import EmailInput from "./EmailInput/EmailInput";
import MergeButton from "../../../Components/MergeButton/MergeButton";
import { authApi } from "../../../API/authApi";

type StepOneProps = {
  name: string;
  email: string;
  verifyCode: number;
  onChange(name: string, value: string): void;
  setRegisterStep(e: number): void;
};

const StepOne: FC<StepOneProps> = ({
  name,
  email,
  verifyCode,
  onChange,
  setRegisterStep,
}) => {
  const onClickNext = () => {
    setRegisterStep(2);
  };

  return (
    <div className={styles.stepOne}>
      <LabelInput
        name={"name"}
        value={name}
        title={"이름"}
        placeholder={"ex) 홍길동"}
        isPassword={false}
        isReadOnly={false}
        width={"70%"}
        height={30}
        onChange={onChange}
      />

      <EmailInput
        email={email}
        setEmail={onChange}
        sendCode={(email) => {
          authApi.sendCode(email).then();
        }}
      />

      <LabelInput
        name={"verifyCode"}
        value={verifyCode !== 0 ? verifyCode : ""}
        title={"인증번호"}
        placeholder={"ex) 123456"}
        isPassword={false}
        isReadOnly={false}
        width={"70%"}
        height={30}
        onChange={onChange}
      />

      <MergeButton backgroundColor={"blue"} onClick={onClickNext}>
        다음
      </MergeButton>
    </div>
  );
};

export default StepOne;
