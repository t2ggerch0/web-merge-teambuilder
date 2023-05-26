import React, { FormEvent, FC } from "react";
import styles from "./EmailInput.module.scss";
import LabelInput from "../../../../Components/LabelInput/LabelInput";
import MergeButton from "../../../../Components/MergeButton/MergeButton";

type EmailInputProps = {
  email: string;
  setEmail(name: string, value: string): void;
  sendCode(e: string): void;
};

const EmailInput: FC<EmailInputProps> = ({ email, setEmail, sendCode }) => {
  const onChange = (name: string, value: string) => {
    setEmail(name, value);
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
        height={30}
        onChange={onChange}
      />
      <MergeButton
        fontSize={14}
        backgroundColor={"#cc4730"}
        borderRadius={8}
        padding={"12px 20px"}
        onClick={() => sendCode(email)}
      >
        인증받기
      </MergeButton>
    </form>
  );
};

export default EmailInput;
