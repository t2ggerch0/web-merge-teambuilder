import React from "react";
import styles from "./EditProfile.module.scss";
import LabelInput from "../../../Components/LabelInput/LabelInput";
import UnicoopButton from "../../../Components/UnicoopButton/UnicoopButton";
import { api } from "../../../API/api";

const EditProfile = () => {
  const email = "";

  return (
    <div className={styles.editProfile}>
      <div className={styles.row}>
        <div className={styles.title}>학교</div>
        <LabelInput
          name={"school"}
          value={"성균관대학교"}
          title={""}
          placeholder={""}
          isPassword={false}
          isReadOnly={true}
          width={"300px"}
          height={"30px"}
          fontSize={18}
          onChange={() => {}}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.title}>학번</div>
        <LabelInput
          name={"studentId"}
          value={"20231234"}
          title={""}
          placeholder={""}
          isPassword={false}
          isReadOnly={true}
          width={"300px"}
          height={"30px"}
          fontSize={18}
          onChange={() => {}}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.title}>전공</div>
        <LabelInput
          name={"major"}
          value={"소프트웨어학과"}
          title={""}
          placeholder={""}
          isPassword={false}
          isReadOnly={true}
          width={"300px"}
          height={"30px"}
          fontSize={18}
          onChange={() => {}}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.title}>이메일</div>
        <LabelInput
          name={"email"}
          value={"unicoop@g.skku.edu"}
          title={""}
          placeholder={""}
          isPassword={false}
          isReadOnly={true}
          width={"300px"}
          height={"30px"}
          fontSize={18}
          onChange={() => {}}
        />
      </div>
      <div className={styles.buttons}>
        <UnicoopButton backgroundColor={"#6E43A4"} onClick={() => {}}>
          수정 완료
        </UnicoopButton>
        <UnicoopButton
          backgroundColor={"#292929"}
          onClick={() => {
            api.deleteAccount(email).then();
          }}
        >
          회원 탈퇴
        </UnicoopButton>
      </div>
    </div>
  );
};

export default EditProfile;
