import React, { useState } from "react";
import styles from "./Register.module.scss";
import axios from "axios";
import UserTypeInput from "./UserTypeInput/UserTypeInput";
import EmailInput from "./EmailInput/EmailInput";
import PasswordInput from "./PasswordInput/PasswordInput";
import LabelInput from "../../Components/LabelInput/LabelInput";
import UnicoopButton from "../../Components/UnicoopButton/UnicoopButton";
import { viewToastError } from "../../helper";
import { RegisterInfo, UserTypeType } from "../../interface";
type RegisterProps = {
  changeBoxContent: () => void;
};
const Register = ({ changeBoxContent }: RegisterProps) => {
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    name: "",
    studentId: 0,
    major: "",
    password: "",
    verifyCode: 0,
  });
  const { name, studentId, major, password, verifyCode } = registerInfo;

  const [userType, setUserType] = useState<UserTypeType>("");
  const [email, setEmail] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const onChange = (name: string, value: string | number) => {
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  const sendCode = async () => {
    try {
      const response = await axios.post("/email", {
        email,
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const submit = async () => {
    if (userType !== "student" && userType !== "professor") {
      console.log("abc");
      viewToastError("회원 가입 유형을 선택해주세요.");
      return;
    } else if (name === "") {
      viewToastError("이름을 입력해주세요.");
      return;
    } else if (studentId === 0) {
      viewToastError("학번을 입력해주세요.");
      return;
    } else if (major === "") {
      viewToastError("전공을 입력해주세요.");
      return;
    } else if (!password || !isPasswordValid || password !== passwordConfirm) {
      viewToastError("비밀번호를 올바르게 입력하셨는지 확인해주세요.");
      return;
    }
    try {
      const response = await axios.post("/verify", registerInfo);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.title}>회원가입</div>
      <div className={styles.account_check} onClick={changeBoxContent}>
        이미 계정이 있으신가요?
      </div>
      <UserTypeInput userType={userType} setUserType={setUserType} />
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
      <EmailInput email={email} setEmail={setEmail} sendCode={sendCode} />
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
      <UnicoopButton onClick={submit}>회원가입</UnicoopButton>
    </div>
  );
};

export default Register;
