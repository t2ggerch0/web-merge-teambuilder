import React, { useState, FC } from "react";
import styles from "./Register.module.scss";
import StepOne from "./StepOne/StepOne";
import StepTwo from "./StepTwo/StepTwo";
import { RegisterInfo } from "../../interface";
import { ToastContainer } from "react-toastify";

type RegisterProps = {
  changeBoxContent: () => void;
};

const Register: FC<RegisterProps> = ({ changeBoxContent }) => {
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    name: "",
    studentId: 0,
    email: "",
    major: "",
    password: "",
    userType: "",
    verifyCode: 0,
  });
  const { name, studentId, major, password, verifyCode, email, userType } =
    registerInfo;
  const [registerStep, setRegisterStep] = useState<number>(1);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const onChange = (name: string, value: string) => {
    if (name === "studentId" || name === "verifyCode") {
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
          userType={userType}
          name={name}
          email={email}
          verifyCode={verifyCode}
          onChange={onChange}
          setRegisterStep={setRegisterStep}
        />
      ) : (
        <StepTwo
          studentId={studentId}
          major={major}
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

      <ToastContainer
        className={styles.toast}
        position="top-center"
        hideProgressBar
        closeButton={false}
        rtl={false}
      />
    </div>
  );
};

export default Register;
