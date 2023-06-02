import React, { FC, useState, useEffect } from "react";
import styles from "./RegisterProject.module.scss";
import UnicoopButton from "../../Components/UnicoopButton/UnicoopButton";
import { Dayjs } from "dayjs";
import Layout from "../../Components/Layout/Layout";
import ClassInfo from "./ClassInfo/ClassInfo";
import DefaultQuestion from "./DefaultQuestion/DefaultQuestion";
import { authApi } from "../../API/authApi";
import { hostApi } from "../../API/hostApi";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/UnicoopContext";
import { viewToastError, viewToastSuccess } from "../../helper";
import {
  ProjectRegisterInfo,
  Menu,
  positionTypes,
  defaultQuestions,
} from "../../interface";
import "react-datepicker/dist/react-datepicker.css";

type RegisterProjectProps = {
  selectedMenu: Menu;
  onChangeMenu(menuId: Menu): void;
};

const RegisterProject: FC<RegisterProjectProps> = ({
  selectedMenu,
  onChangeMenu,
}) => {
  const navigate = useNavigate();
  const { myInfo, setMyInfo } = useAuthContext();
  const [projectRegisterInfo, setProjectRegisterInfo] =
    useState<ProjectRegisterInfo>(defaultQuestions);

  const onChangeClassInfo = ({
    name,
    value,
  }: {
    name: string;
    value:
      | string
      | number
      | string[]
      | number[]
      | Dayjs
      | boolean
      | positionTypes[];
  }) => {
    setProjectRegisterInfo({ ...projectRegisterInfo, [name]: value });
  };

  const onClickRegisterButton = () => {
    if (
      projectRegisterInfo.classDescription.length === 0 ||
      projectRegisterInfo.className.length === 0
    ) {
      viewToastError("Missing Class Info");
    } else {
      const token = window.localStorage.getItem("token") ?? "";
      const response = hostApi.createClass(projectRegisterInfo, token).then();
      console.log(response);
      viewToastSuccess("수업을 생성했습니다.");

      updateUserInfo();
      onChangeMenu(Menu.ManagementProject);
      navigate("../manageproject");
    }
  };

  const updateUserInfo = () => {
    const token = myInfo?.token ?? "";
    if (token) {
      authApi.getMyInfo(token).then((res) => {
        setMyInfo({
          classes: res?.user.classes ?? [],
          email: res?.user.email ?? "",
          id: res?.user.id ?? "",
          name: res?.user.name ?? "",
          password: res?.user.password ?? "",
          token: token ?? "",
        });
      });
    }
  };

  useEffect(() => {
    onChangeMenu(Menu.RegisterProject);
    let token = localStorage.getItem("token") ?? "";
    if (token.length > 0) {
      authApi.getMyInfo(token).then((res) => {
        setMyInfo({
          classes: res?.user.classes ?? [],
          email: res?.user.email ?? "",
          id: res?.user.id ?? "",
          name: res?.user.name ?? "",
          password: res?.user.password ?? "",
          token: token,
        });
      });
    }
  }, []);

  return (
    <Layout
      pageTitle="프로젝트 등록"
      selectedMenu={selectedMenu}
      onChangeMenu={onChangeMenu}>
      <div className={styles.container}>
        <ClassInfo
          onChangeClassInfo={onChangeClassInfo}
          projectRegisterInfo={projectRegisterInfo}
        />
        <hr />

        <div className={styles.questions}>
          <DefaultQuestion
            questionIds={projectRegisterInfo.questionIds}
            onChangeDefaultQuestionInfo={onChangeClassInfo}
          />
          <hr />
        </div>
        <div className={styles.button}>
          <UnicoopButton onClick={onClickRegisterButton}>
            수업 만들기
          </UnicoopButton>
        </div>
        <ToastContainer
          className={styles.toast}
          position="top-center"
          hideProgressBar
          closeButton={false}
          rtl={false}
        />
      </div>
    </Layout>
  );
};

export default RegisterProject;
