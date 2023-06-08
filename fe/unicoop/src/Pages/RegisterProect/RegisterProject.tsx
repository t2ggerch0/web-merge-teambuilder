import React, { FC, useState, useEffect } from "react";
import styles from "./RegisterProject.module.scss";
import MergeButton from "../../Components/MergeButton/MergeButton";
import { Dayjs } from "dayjs";
import Layout from "../../Components/Layout/Layout";
import ClassInfo from "./ClassInfo/ClassInfo";
import DefaultQuestion from "./DefaultQuestion/DefaultQuestion";
import { authApi } from "../../API/authApi";
import { hostApi } from "../../API/hostApi";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/UnicoopContext";
import {
  parseTextFromOptions,
  viewToastError,
  viewToastSuccess,
} from "../../helper";
import {
  ProjectRegisterInfo,
  Menu,
  positionTypes,
  defaultQuestions,
  questionLists,
  AnswersType,
} from "../../interface";
import "react-datepicker/dist/react-datepicker.css";
import OptionRadios from "../../Components/OptionRadios/OptionRadios";

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
  const [hostAnswers, setHostAnswers] = useState<AnswersType[]>([
    ...questionLists.map((q) => {
      if (q.id === 2) {
        return { questionId: q.id, answer: [0, 1, 2, 3, 4, 5, 6, 7, 8] };
      } else {
        return { questionId: q.id, answer: [0] };
      }
    }),
  ]);

  const onChangeClassInfo = ({
    name,
    value,
  }: {
    name: string;
    value:
      | string
      | number
      | string[]
      | (number | number[])[]
      | Dayjs
      | boolean
      | positionTypes[];
  }) => {
    if (name === "questionIds") {
      let left = value as number[];
      let newAnswers = hostAnswers.filter((a) => left.includes(a.questionId));
      setProjectRegisterInfo({
        ...projectRegisterInfo,
        hostAnswer: newAnswers,
        [name]: left,
      });
    } else {
      setProjectRegisterInfo({ ...projectRegisterInfo, [name]: value });
    }
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
        <div>
          {questionLists?.map((q, index) => (
            <OptionRadios
              title={q.title}
              subtitle={""}
              name={q.title}
              isHorizontal={true}
              options={
                q.id === 2
                  ? parseTextFromOptions(q.options as number[])
                  : q.options
              }
              checkedOption={hostAnswers[index]?.answer}
              setCheckedOption={(e) => {
                console.log(e, hostAnswers, index);
                if (q.id === 2) {
                  let before = hostAnswers[index];
                  let res = [];
                  if (before.answer.includes(e)) {
                    res = before.answer.filter((a) => a !== e);
                  } else {
                    res = before.answer;
                    res.push(e);
                  }
                  hostAnswers[index].answer = res;
                } else {
                  hostAnswers[index].answer = [e];
                }
                setHostAnswers([...hostAnswers]);
              }}
              onChange={(e) => {}}
            />
          ))}
        </div>
        <div className={styles.button}>
          <MergeButton onClick={onClickRegisterButton}>수업 만들기</MergeButton>
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
