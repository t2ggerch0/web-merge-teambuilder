import React, { FC, useState, useEffect } from "react";
import styles from "./RegisterProject.module.scss";
import UnicoopButton from "../../Components/UnicoopButton/UnicoopButton";
import { ProjectRegisterInfo, Menu, positionTypes } from "../../interface";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "../../API/api";
import { ToastContainer } from "react-toastify";
import { useAuthContext } from "../../Context/UnicoopContext";
import Layout from "../../Components/Layout/Layout";
import ClassInfo from "./ClassInfo/ClassInfo";
import DefaultQuestion from "./DefaultQuestion/DefaultQuestion";
import { viewToastError, viewToastSuccess } from "../../helper";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";

type RegisterProjectProps = {
  selectedMenu: Menu;
  onChangeMenu(menuId: Menu): void;
};

const RegisterProject: FC<RegisterProjectProps> = ({
  selectedMenu,
  onChangeMenu,
}) => {
  const navigation = useNavigate();
  const userInfoHandle = useAuthContext();
  const [projectRegisterInfo, setProjectRegisterInfo] =
    useState<ProjectRegisterInfo>({
      className: "",
      classType: "web",
      classDescription: "",
      positionTypes: [
        { typeName: "frontend", composition: 1 },
        { typeName: "backend", composition: 1 },
      ],

      hostPosition: "frontend",
      recruitStartDate: dayjs(new Date()),
      recruitEndDate: dayjs(new Date()),
      activityStartDate: dayjs(new Date()),
      activityEndDate: dayjs(new Date()),
      isSecret: true,
      isHostParticipating: true,
      questionIds: [0, 1, 2, 3],
    });

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
    console.log(name, value);

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
      api
        .createClass({
          data: projectRegisterInfo,
          token: token,
        })
        .then((res) => {
          console.log(res);
          viewToastSuccess("수업을 생성했습니다.");

          updateUserInfo();
          setTimeout(() => {
            navigation("../manageproject");
          }, 3000);
        });
    }
  };

  const updateUserInfo = () => {
    const token = userInfoHandle.myInfo?.token ?? "";
    if (token) {
      api.getUserInfoByToken(token).then((res) => {
        userInfoHandle.setMyInfo({
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
