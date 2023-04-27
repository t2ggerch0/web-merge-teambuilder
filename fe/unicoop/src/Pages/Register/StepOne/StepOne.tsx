import React, { FC } from "react";
import styles from "./StepOne.module.scss";
import UserTypeInput from "./UserTypeInput/UserTypeInput";
import LabelInput from "../../../Components/LabelInput/LabelInput";
import EmailInput from "./EmailInput/EmailInput";
import UnicoopButton from "../../../Components/UnicoopButton/UnicoopButton";
import { api } from "../../../API/api";
import { UserTypeType } from "../../../interface";

type StepOneProps = {
  userType: UserTypeType;
  name: string;
  email: string;
  verifyCode: number;
  onChange(name: string, value: string): void;
  setRegisterStep(e: number): void;
};

const StepOne: FC<StepOneProps> = ({
  userType,
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
      <UserTypeInput userType={userType} setUserType={onChange} />

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
          api.sendCode(email).then();
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

      <UnicoopButton backgroundColor={"blue"} onClick={onClickNext}>
        다음
      </UnicoopButton>
    </div>
  );
};

export default StepOne;
