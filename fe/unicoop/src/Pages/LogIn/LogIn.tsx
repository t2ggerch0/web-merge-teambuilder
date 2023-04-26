import React, { useState, FC } from "react";
import styles from "./LogIn.module.scss";
import LabelInput from "../../Components/LabelInput/LabelInput";
import UnicoopButton from "../../Components/UnicoopButton/UnicoopButton";
import { ToastContainer } from "react-toastify";
import { MyInfoType } from "../../interface";
import { api } from "../../API/api";

type LoginProps = {
  changeBoxContent(): void;
  loginSuccess({ email, password }: { email: string; password: string }): void;
};

const LogIn: FC<LoginProps> = ({ changeBoxContent, loginSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChangeEmail = (name: string, value: string) => {
    setEmail(value);
  };
  const onChangePassword = (name: string, value: string) => {
    setPassword(value);
  };

  const onClickLogin = async () => {
    loginSuccess({ email, password });
  };

  return (
    <div className={styles.login}>
      <div className={styles.title}>로그인</div>

      <LabelInput
        name={"email"}
        value={email}
        title={"이메일"}
        placeholder={"unicoop@g.skku.edu"}
        width={"100%"}
        padding={12}
        isPassword={false}
        isReadOnly={false}
        onChange={onChangeEmail}
      />

      <LabelInput
        name={"password"}
        value={password}
        title={"비밀번호"}
        placeholder={"비밀번호를 입력하세요"}
        width={"100%"}
        padding={12}
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
