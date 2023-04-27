import React, { FC, useState } from "react";
import styles from "./ManageProject.module.scss";
import { Menu, UserTypeType } from "../../interface";
import LabelInput from "../../Components/LabelInput/LabelInput";
import ReactModal from "react-modal";
import Layout from "../../Components/Layout/Layout";

type ManageProjectProps = {
  something?: string;
  userType?: UserTypeType;
  selectedMenu: Menu;
  onChangeMenu(menuId: Menu): void;
};

const ManageProject: FC<ManageProjectProps> = ({
  something,
  selectedMenu,
  onChangeMenu,
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
    <Layout
      pageTitle="프로젝트 관리"
      selectedMenu={selectedMenu}
      onChangeMenu={onChangeMenu}>
      <div className={styles.container}>
        <div>
          <input className={styles.class_button} value={"SWE3014"} />
        </div>
        <button className={styles.btn} onClick={onClickModal}>
          프로젝트 입장하기/생성하기
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
    </Layout>
  );
};

export default ManageProject;
