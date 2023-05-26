import React from "react";
import styles from "./EditProfile.module.scss";
import LabelInput from "../../../Components/LabelInput/LabelInput";
import MergeButton from "../../../Components/MergeButton/MergeButton";
import { authApi } from "../../../API/authApi";
import { useAuthContext } from "../../../Context/UnicoopContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { myInfo } = useAuthContext();
  const navigate = useNavigate();

  const deleteAccount = (email: string) => {
    authApi.deleteAccount(email).then();
    navigate("/");
  };

  return (
    <div className={styles.editProfile}>
      <div className={styles.row}>
        <div className={styles.title}>이름</div>
        <LabelInput
          name={"name"}
          value={myInfo?.name ?? ""}
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
          value={myInfo?.email ?? ""}
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
        <MergeButton backgroundColor={"#6E43A4"} onClick={() => {}}>
          수정 완료
        </MergeButton>
        <MergeButton
          backgroundColor={"#292929"}
          onClick={() => {
            deleteAccount(myInfo?.email ?? "");
          }}
        >
          회원 탈퇴
        </MergeButton>
      </div>
    </div>
  );
};

export default EditProfile;
