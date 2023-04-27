import React, { FormEvent, FC } from "react";
import styles from "./EmailInput.module.scss";
import LabelInput from "../../../../Components/LabelInput/LabelInput";
import UnicoopButton from "../../../../Components/UnicoopButton/UnicoopButton";

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
        width={"70%"}
        height={30}
        onChange={onChange}
      />
      <div className={styles.buttonWrapper}>
        <UnicoopButton
          fontSize={12}
          backgroundColor={"#cc4730"}
          borderRadius={12}
          padding={"12px 16px"}
          onClick={() => sendCode(email)}
        >
          인증받기
        </UnicoopButton>
      </div>
    </form>
  );
};

export default EmailInput;
