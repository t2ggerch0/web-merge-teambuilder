import React, { useState, FC } from "react";
import styles from "./LogIn.module.scss";
import LabelInput from "../../Components/LabelInput/LabelInput";
import MergeButton from "../../Components/MergeButton/MergeButton";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  changeBoxContent(): void;
  loginSuccess({ email, password }: { email: string; password: string }): void;
};

const LogIn: FC<LoginProps> = ({ changeBoxContent, loginSuccess }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChangeEmail = (name: string, value: string) => {
    setEmail(value);
  };
  const onChangePassword = (name: string, value: string) => {
    setPassword(value);
  };

  const onClickLogin = () => {
    loginSuccess({ email, password });
    navigate("/");
  };

  return (
    <div className={styles.login}>
      <div className={styles.title}>로그인</div>

      <LabelInput
        name={"email"}
        value={email}
        title={"이메일"}
        placeholder={"unicoop@g.skku.edu"}
        width={"70%"}
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
        width={"70%"}
        padding={12}
        isPassword={true}
        isReadOnly={false}
        onChange={onChangePassword}
      />

      <MergeButton backgroundColor={"#435EA4"} onClick={onClickLogin}>
        로그인
      </MergeButton>

      <div className={styles.account_check} onClick={changeBoxContent}>
        아직 계정이 없으신가요?
      </div>
    </div>
  );
};

export default LogIn;
