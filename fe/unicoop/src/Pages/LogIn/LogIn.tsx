import React, { useState } from "react";
import styles from "./LogIn.module.scss";
import axios from "axios";
import LabelInput from "../../Components/LabelInput/LabelInput";
import UnicoopButton from "../../Components/UnicoopButton/UnicoopButton";
type LoginProps = {
  changeBoxContent: () => void;
};
const LogIn = ({ changeBoxContent }: LoginProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChangeEmail = (name: string, value: string) => {
    setEmail(value);
  };
  const onChangePassword = (name: string, value: string) => {
    setPassword(value);
  };

  const onClickLogin = () => {
    axios
      .post("https://port-0-unicoop-nx562olfpi8ozh.sel3.cloudtype.app/login", {
        email,
        password,
        userType: "student",
      })
      .then((res) => {
        console.log("res", res.data);
        if (res.data.code === 1) {
          //로그인 성공
        } else {
          // 로그인 실패
        }
      });
  };
  return (
    <div className={styles.login}>
      <div className={styles.title}>로그인</div>
      <div className={styles.account_check} onClick={changeBoxContent}>
        계정이 없으신가요?
      </div>

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
    </div>
  );
};

export default LogIn;
