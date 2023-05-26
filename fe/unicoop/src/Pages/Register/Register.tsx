import React, { useState, FC } from "react";
import styles from "./Register.module.scss";
import StepOne from "./StepOne/StepOne";
import StepTwo from "./StepTwo/StepTwo";
import { RegisterInfo } from "../../interface";

type RegisterProps = {
  changeBoxContent: () => void;
};

const Register: FC<RegisterProps> = ({ changeBoxContent }) => {
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    name: "",
    email: "",
    password: "",
    verifyCode: 0,
  });
  const { name, password, verifyCode, email } = registerInfo;
  const [registerStep, setRegisterStep] = useState<number>(1);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const onChange = (name: string, value: string) => {
    if (name === "verifyCode") {
      setRegisterInfo({ ...registerInfo, [name]: parseInt(value) });
    } else {
      setRegisterInfo({ ...registerInfo, [name]: value });
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.title}>회원가입 {registerStep} / 2</div>

      <div className={styles.account_check} onClick={changeBoxContent}>
        이미 계정이 있으신가요?
      </div>

      {registerStep === 1 ? (
        <StepOne
          name={name}
          email={email}
          verifyCode={verifyCode}
          onChange={onChange}
          setRegisterStep={setRegisterStep}
        />
      ) : (
        <StepTwo
          password={password}
          isPasswordValid={isPasswordValid}
          setIsPasswordValid={setIsPasswordValid}
          passwordConfirm={passwordConfirm}
          setPasswordConfirm={setPasswordConfirm}
          onChange={onChange}
          setRegisterStep={setRegisterStep}
          changeBoxContent={changeBoxContent}
          registerInfo={registerInfo}
        />
      )}
    </div>
  );
};

export default Register;
