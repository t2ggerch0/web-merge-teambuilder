import React, { useState, FC } from "react";
import styles from "./Register.module.scss";
import UserTypeInput from "./UserTypeInput/UserTypeInput";
import EmailInput from "./EmailInput/EmailInput";
import PasswordInput from "./PasswordInput/PasswordInput";
import LabelInput from "../../Components/LabelInput/LabelInput";
import UnicoopButton from "../../Components/UnicoopButton/UnicoopButton";
import { RegisterInfo } from "../../interface";
import { ToastContainer } from "react-toastify";
import { api } from "../../API/api";

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

  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const onChange = (name: string, value: string) => {
    if (name === "studentId" || name === "verifyCode") {
      setRegisterInfo({ ...registerInfo, [name]: parseInt(value) });
    } else {
      setRegisterInfo({ ...registerInfo, [name]: value });
    }
  };

  /*const sendCode = async () => {
    try {
      const response = await axios.post("/email", {
        email,
      });
      viewToastSuccess("인증코드를 전송했습니다. 메일을 확인해 주세요.");
    } catch (e) {
      viewToastError("이메일 주소가 올바르지 않습니다.");
    }
  };*/

  return (
    <div className={styles.register}>
      <div className={styles.title}>회원가입</div>
      <div className={styles.account_check} onClick={changeBoxContent}>
        이미 계정이 있으신가요?
      </div>
      <UserTypeInput userType={userType} setUserType={onChange} />
      <LabelInput
        name={"name"}
        value={name}
        title={"이름"}
        placeholder={"ex) 홍길동"}
        isPassword={false}
        isReadOnly={false}
        onChange={onChange}
      />
      <LabelInput
        name={"studentId"}
        value={studentId}
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
      <EmailInput
        email={email}
        setEmail={onChange}
        sendCode={(email) => {
          api.sendCode(email).then();
        }}
      />
      <LabelInput
        name={"verifyCode"}
        value={verifyCode}
        title={"인증번호"}
        placeholder={"ex) 12345"}
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
      <UnicoopButton
        onClick={() =>
          api.verifyCode({
            changeBoxContent,
            isPasswordValid,
            passwordConfirm,
            registerInfo,
          })
        }>
        회원가입
      </UnicoopButton>
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
