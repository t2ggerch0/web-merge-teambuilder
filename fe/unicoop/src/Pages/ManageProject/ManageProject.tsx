import React, { FC, useState, useEffect } from "react";
import styles from "./ManageProject.module.scss";
import { ClassType, Menu, UserTypeType } from "../../interface";
import LabelInput from "../../Components/LabelInput/LabelInput";
import ReactModal from "react-modal";
import Layout from "../../Components/Layout/Layout";
import { api } from "../../API/api";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/UnicoopContext";
import Class from "./Class/Class";

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
  const navigation = useNavigate();
  const dummyClassId = [
    "6449f86b9705e3f6c25cf18e",
    "6449f87d9705e3f6c25cf1a5",
    "6449fc039705e3f6c25cf1c0",
    "6449fc80cb95e526b717e147",
    "6449fd0dcb95e526b717e165",
    "6449fd28cb95e526b717e183",
  ];
  const userInfoHandle = useAuthContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  const [classes, setClasses] = useState<ClassType[]>([]);
  const onChangeCode = (newCode: string) => {
    setCode(newCode);
  };
  const onClickModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token !== null) {
      api.getUserInfoByToken(token).then((res) => {
        userInfoHandle.setMyInfo({
          userType: res?.user.userType ?? "student",
          classes: res?.user.classes ?? [],
          email: res?.user.email ?? "",
          id: res?.user.id ?? "",
          major: res?.user.major ?? "",
          name: res?.user.name ?? "",
          password: res?.user.password ?? "",
          studentId: res?.user.studentId ?? -1,
          token: token ?? "",
        });
      });
    }
    dummyClassId.map((id) => {
      return api.getClassInfo(id).then((res) => {
        console.log("classinfo", res);
        if (res) {
          setClasses([...classes, res]);
        }
      });
    });
  }, []);
  return (
    <Layout
      pageTitle="프로젝트 관리"
      selectedMenu={selectedMenu}
      onChangeMenu={onChangeMenu}>
      <div className={styles.container}>
        <div className={styles.btn_wrapper}>
          <button className={styles.btn} onClick={onClickModal}>
            {`프로젝트 ${
              userInfoHandle.myInfo?.userType === "professor"
                ? "생성하기"
                : "입장하기"
            }`}
          </button>
        </div>

        <div className={styles.class_container}>
          {classes.map((item, index) => {
            return (
              <Class key={`class_${item.id}`} classInfo={item} order={index} />
            );
          })}
        </div>

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
