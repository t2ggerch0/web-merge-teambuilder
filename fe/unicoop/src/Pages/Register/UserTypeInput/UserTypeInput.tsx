import React, { FC } from "react";
import styles from "./UserTypeInput.module.scss";
import { UserTypeType } from "../../../interface";

type UserTypeInputProps = {
  userType: UserTypeType;
  setUserType(e: UserTypeType): void;
};

const UserTypeInput: FC<UserTypeInputProps> = ({ userType, setUserType }) => {
  return (
    <div className={styles.userTypeInput}>
      <div>신분</div>
      <div
        className={`${styles.option} ${
          userType === "student" ? styles.selected : ""
        }`}
        onClick={() => setUserType("student")}
      >
        학생
      </div>
      <div
        className={`${styles.option} ${
          userType === "professor" ? styles.selected : ""
        }`}
        onClick={() => setUserType("professor")}
      >
        교수자
      </div>
    </div>
  );
};

export default UserTypeInput;
