import React, { FormEvent, FC } from "react";
import styles from "./EmailInput.module.scss";
import LabelInput from "../../../Components/LabelInput/LabelInput";
import UnicoopButton from "../../../Components/UnicoopButton/UnicoopButton";

type EmailInputProps = {
  email: string;
  setEmail(e: string): void;
  sendCode(): void;
};

const EmailInput: FC<EmailInputProps> = ({ email, setEmail, sendCode }) => {
  const onChange = (name: string, value: string) => {
    setEmail(value);
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={styles.emailInput} onSubmit={onSubmit}>
      <LabelInput
        name={"email"}
        value={email}
        title={"이메일"}
        placeholder={"ex) unicoop@g.skku.edu"}
        isPassword={false}
        isReadOnly={false}
        onChange={onChange}
      />
      <UnicoopButton onClick={sendCode}>인증받기</UnicoopButton>
    </form>
  );
};

export default EmailInput;
