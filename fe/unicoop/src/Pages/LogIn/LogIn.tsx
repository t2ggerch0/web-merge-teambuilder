import React, { useState } from "react";
import styles from "./LogIn.module.scss";
import axios from "axios";
import LabelInput from "../../Components/LabelInput/LabelInput";
import UnicoopButton from "../../Components/UnicoopButton/UnicoopButton";
import { ToastContainer } from "react-toastify";

import { MyInfoType } from "../../interface";
import { viewToastError } from "../../helper";

type LoginProps = {
  changeBoxContent: () => void;
  loginSuccess: (userInfo: MyInfoType) => void;
};
const LogIn = ({ changeBoxContent, loginSuccess }: LoginProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChangeEmail = (name: string, value: string) => {
    setEmail(value);
  };
  const onChangePassword = (name: string, value: string) => {
    setPassword(value);
  };

  const onClickLogin = async () => {
    try {
      await axios
        .post("/login", {
          email,
          password,
          userType: "student",
        })
        .then((res) => {
          console.log("res", res.data);
          if (res.data.code === 1) {
            localStorage.setItem("token", res.data.token);
            loginSuccess({
              name: res.data.user.name,
              classes: res.data.user.classes,
              email: res.data.user.email,
              major: res.data.user.major,
              password: res.data.user.password,
              studentId: res.data.user.studentId,
              userType: res.data.user.userType,
            });
          }
        });
    } catch (e) {
      viewToastError("일치하는 회원정보가 없습니다!");
    }
  };
  return (
    <div className={styles.login}>
      <div className={styles.title}>로그인</div>

      <LabelInput
        name={"email"}
        value={email}
        title={"이메일"}
        placeholder={"unicoop@g.skku.edu"}
        isPassword={false}
        isReadOnly={false}
        onChange={onChangeEmail}
      />
      <LabelInput
        name={"password"}
        value={password}
        title={"비밀번호"}
        placeholder={"비밀번호를 입력하세요"}
        isPassword={true}
        isReadOnly={false}
        onChange={onChangePassword}
      />

      <UnicoopButton onClick={onClickLogin}>로그인</UnicoopButton>

      <div className={styles.account_check} onClick={changeBoxContent}>
        아직 계정이 없으신가요?
      </div>

      <ToastContainer
        className={styles.toast}
        position="top-center"
        hideProgressBar
        closeButton={false}
        rtl={false}
        theme="colored"
      />
    </div>
  );
};

export default LogIn;
