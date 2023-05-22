import React, { FC } from "react";
import styles from "./UserTypeInput.module.scss";
import { UserTypeType } from "../../../../interface";

type UserTypeInputProps = {
  userType: UserTypeType;
  setUserType(name: string, value: UserTypeType): void;
};

const UserTypeInput: FC<UserTypeInputProps> = ({ userType, setUserType }) => {
  return (
    <div className={styles.userTypeInput}>
      <div className={styles.title}>신분</div>

      <div
        className={`${styles.option} ${
          userType === "student" ? styles.selected : ""
        }`}
        onClick={() => setUserType("userType", "student")}
      >
        학생
      </div>

      <div
        className={`${styles.option} ${
          userType === "professor" ? styles.selected : ""
        }`}
        onClick={() => setUserType("userType", "professor")}
      >
        교수자
      </div>
    </div>
  );
};

export default UserTypeInput;