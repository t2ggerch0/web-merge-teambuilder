import React, { FC, useState } from "react";
import styles from "./ManageProject.module.scss";
import { UserTypeType } from "../../interface";
import LabelInput from "../../Components/LabelInput/LabelInput";
import ReactModal from "react-modal";

type ManageProjectProps = {
  something?: string;
  userType?: UserTypeType;
};

const ManageProject: FC<ManageProjectProps> = ({
  something,
  userType = "student",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const onChangeCode = (newCode: string) => {
    setCode(newCode);
  };
  const onClickModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.container}>
      <div>
        <input className={styles.class_button} value={"SWE3014"} />
      </div>
      <button className={styles.btn} onClick={onClickModal}>
        프로젝트 입장하기
      </button>

      <ReactModal
        className={styles.modal}
        isOpen={isOpen}
        onRequestClose={onClickModal}>
        <div className={styles.modal_container}>
          <LabelInput
            className={styles.code_input}
            name="projectEntering"
            width={400}
            placeholder="프로젝트 코드를 입력하세요"
            onChange={onChangeCode}
            title="프로젝트 코드"
            value={code}
          />
        </div>
      </ReactModal>
    </div>
  );
};

export default ManageProject;
