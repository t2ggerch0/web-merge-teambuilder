import React, { useState, FC } from "react";
import styles from "./Register.module.scss";
import axios from "axios";
import UserTypeInput from "./UserTypeInput/UserTypeInput";
import EmailInput from "./EmailInput/EmailInput";
import PasswordInput from "./PasswordInput/PasswordInput";
import LabelInput from "../../Components/LabelInput/LabelInput";
import UnicoopButton from "../../Components/UnicoopButton/UnicoopButton";
import { viewToastError, viewToastSuccess } from "../../helper";
import { RegisterInfo, UserTypeType } from "../../interface";
import { ToastContainer } from "react-toastify";
import { api } from "../../API/api";

type RegisterProps = {
  changeBoxContent(): void;
};

const Register: FC<RegisterProps> = ({ changeBoxContent }) => {
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

  const submit = async () => {
    if (userType !== "student" && userType !== "professor") {
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
      await axios
        .post("/verify", {
          email,
          password,
          userType,
          verifyCode,
          name,
          studentId,
          major,
        })
        .then(() => {
          viewToastSuccess("회원가입에 성공했습니다.");
          setTimeout(() => {
            changeBoxContent();
          }, 3000);
        });
    } catch (e) {
      viewToastError("인증코드가 올바르지 않습니다.");
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
      <EmailInput
        email={email}
        setEmail={setEmail}
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
      <UnicoopButton onClick={submit}>회원가입</UnicoopButton>
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
