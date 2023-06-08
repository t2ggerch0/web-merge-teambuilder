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
import ProgressBar from "../../Components/ProgressBar/ProgressBar";

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

  const [step, setStep] = useState<number>(1);
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
      | number[]
      | string[]
      | AnswersType[]
      | Dayjs
      | boolean
      | positionTypes[];
  }) => {
    if (name === "questionIds") {
      let left = value as number[];
      let newAnswers = projectRegisterInfo.hostAnswer.filter((a) =>
        left.includes(a.questionId)
      );
      console.log("new host answer", newAnswers);
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
        <ToastContainer
          className={styles.toast}
          position="top-center"
          hideProgressBar
          closeButton={false}
          rtl={false}
        />
        <ProgressBar current={step} max={2} />
        {step === 1 ? (
          <div className={styles.step}>
            <ClassInfo
              onChangeClassInfo={onChangeClassInfo}
              projectRegisterInfo={projectRegisterInfo}
            />
            <div className={styles.button}>
              <MergeButton
                backgroundColor={"#609966"}
                onClick={() => {
                  setStep(2);
                }}>
                다음
              </MergeButton>
            </div>
          </div>
        ) : (
          <div className={styles.step}>
            <div className={styles.questions}>
              <DefaultQuestion
                questionIds={projectRegisterInfo.questionIds}
                onChangeDefaultQuestionInfo={onChangeClassInfo}
              />
            </div>
            <div className={styles.host_answer}>
              {projectRegisterInfo.isHostParticipating && "호스트 답변"}
            </div>
            <div>
              {projectRegisterInfo.isHostParticipating &&
                questionLists
                  .filter((q) => projectRegisterInfo.questionIds.includes(q.id))
                  ?.map((q, index) => (
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
                      checkedOption={
                        projectRegisterInfo.hostAnswer[index]?.answer
                      }
                      setCheckedOption={(e) => {
                        console.log(e, projectRegisterInfo.hostAnswer, index);
                        if (q.id === 2) {
                          let before = projectRegisterInfo.hostAnswer[index];
                          let res = [];
                          if (before.answer.includes(e)) {
                            res = before.answer.filter((a) => a !== e);
                          } else {
                            res = before.answer;
                            res.push(e);
                          }
                          projectRegisterInfo.hostAnswer[index].answer = res;
                        } else {
                          projectRegisterInfo.hostAnswer[index].answer = [e];
                        }
                        onChangeClassInfo({
                          name: "hostAnswer",
                          value: projectRegisterInfo.hostAnswer,
                        });
                      }}
                    />
                  ))}
            </div>
            <div className={styles.button}>
              <MergeButton
                backgroundColor={"#609966"}
                onClick={() => {
                  setStep(1);
                }}>
                이전
              </MergeButton>
              <MergeButton onClick={onClickRegisterButton}>
                프로젝트 생성
              </MergeButton>
            </div>
            <ToastContainer
              className={styles.toast}
              position="top-center"
              hideProgressBar
              closeButton={false}
              rtl={false}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RegisterProject;
