import React, { FC } from "react";
import styles from "./PasswordInput.module.scss";
import LabelInput from "../../../../Components/LabelInput/LabelInput";

type PasswordInputProps = {
  password: string;
  isPasswordValid: boolean;
  setIsPasswordValid(e: boolean): void;
  passwordConfirm: string;
  setPasswordConfirm(e: string): void;
  onChange(name: string, value: string): void;
};

const PasswordInput: FC<PasswordInputProps> = ({
  password,
  isPasswordValid,
  setIsPasswordValid,
  passwordConfirm,
  setPasswordConfirm,
  onChange,
}) => {
  const passwordOnChange = (name: string, value: string) => {
    let strength = 0;
    if (password.length > 7) {
      strength++;
    }
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
      strength++;
    }
    if (password.match(/([,!%&@#$^*?_~-])/)) {
      strength++;
    }

    if (strength < 2) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
    onChange(name, value);
    // console.log(value, strength);
  };

  const passwordConfirmOnChange = (name: string, value: string) => {
    setPasswordConfirm(value);
  };

  return (
    <div className={styles.passwordInput}>
      <div className={styles.password}>
        <LabelInput
          name={"password"}
          value={password}
          title={"비밀번호"}
          placeholder={"••••••••••••••"}
          isPassword={true}
          isReadOnly={false}
          width={"70%"}
          height={30}
          onChange={passwordOnChange}
        />
        {!isPasswordValid && (
          <div className={styles.notice}>
            * 영어, 숫자, 특수문자가 모두 포함된 8자 이상의 비밀번호를
            입력해주세요.
          </div>
        )}
      </div>

      <div className={styles.passwordConfirm}>
        <LabelInput
          name={"passwordConfirm"}
          value={passwordConfirm}
          title={"비밀번호 확인"}
          placeholder={"••••••••••••••"}
          isPassword={true}
          isReadOnly={false}
          width={"70%"}
          height={30}
          onChange={passwordConfirmOnChange}
        />
      </div>
    </div>
  );
};

export default PasswordInput;
