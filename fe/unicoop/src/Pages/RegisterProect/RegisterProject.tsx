import React, { FC, useState, useEffect } from "react";
import styles from "./RegisterProject.module.scss";
import UnicoopButton from "../../Components/UnicoopButton/UnicoopButton";
import {
  QuestionType,
  ProjectRegisterInfo,
  Menu,
  ScoringType,
} from "../../interface";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "../../API/api";
import { ToastContainer } from "react-toastify";
import { useAuthContext } from "../../Context/UnicoopContext";
import Layout from "../../Components/Layout/Layout";
import ClassInfo from "./ClassInfo/ClassInfo";
import DefaultQuestion from "./DefaultQuestion/DefaultQuestion";
import CustomQuestion from "./CustomQuestion/CustomQuestion";
import { viewToastError, viewToastSuccess } from "../../helper";
import { useNavigate } from "react-router-dom";

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
      capacity: 0,
      className: "",
      endDate: "2023.06.09",
      questions: [],
      startDate: "2023.03.02",
    });

  const [defaultQuestions, setDefaultQuestions] = useState<QuestionType[]>([
    {
      id: "1",
      title: "What is your grade?",
      type: "default",
      options: ["freshman", "sophomore", "junior", "senior"],
      isMandatory: false,
      weight: 3,
      countScore: "different",
    },
    {
      id: "2",
      title: "Personality",
      type: "default",
      options: ["Extrovert", "Introvert"],
      isMandatory: false,
      weight: 3,

      countScore: "different",
    },
    {
      id: "3",
      title: "Preferred Date",
      type: "default",
      options: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      isMandatory: false,
      weight: 3,

      countScore: "same",
    },
    {
      id: "4",
      title: "English Skills",
      type: "default",
      options: ["Good", "Average", "Bad"],
      isMandatory: false,
      weight: 3,

      countScore: "different",
    },
    {
      id: "5",
      title: "Preferred Role",
      type: "default",
      options: ["Leader", "Follower"],
      isMandatory: false,
      weight: 3,

      countScore: "different",
    },
  ]);

  const [customQuestions, setCustomQuestions] = useState<QuestionType[]>([]);

  const onChangeClassInfo = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    console.log(name, value);
    setProjectRegisterInfo({ ...projectRegisterInfo, [name]: value });
  };

  const onClickRegisterButton = () => {
    if (
      customQuestions.length > 0 &&
      (customQuestions.some((q) => q.title.length === 0) ||
        customQuestions.some((q) => q.options.some((a) => a.length === 0)) ||
        customQuestions.some((q) => q.countScore.length === 0))
    ) {
      viewToastError("Missing Custom Question Info");
    } else if (
      projectRegisterInfo.capacity === 0 ||
      projectRegisterInfo.className.length === 0
    ) {
      viewToastError("Missing Class Info");
    } else {
      const token = window.localStorage.getItem("token") ?? "";
      api
        .createClass({
          name: projectRegisterInfo.className,
          capacity: projectRegisterInfo.capacity,
          startDate: projectRegisterInfo.startDate,
          endDate: projectRegisterInfo.endDate,
          token,
        })
        .then((classId) => {
          api
            .addDefaultQuestion({
              classId,
              countScores: defaultQuestions.map((q) => {
                return q.countScore;
              }),
              questionIndexes: defaultQuestions.map((q, index) => {
                return index;
              }),
              token,
              weights: defaultQuestions.map((q) => {
                return q.weight;
              }),
            })
            .then((res) => {
              if (customQuestions.length > 0) {
                api
                  .addCustomQuestion({
                    classId,
                    token,
                    questions: customQuestions,
                  })
                  .then((res) => {
                    viewToastSuccess("수업을 생성했습니다.");
                  });
              } else {
                viewToastSuccess("수업을 생성했습니다.");
              }
              setTimeout(() => {
                navigation("../manageproject");
              }, 3000);
            });
        });
    }
  };

  const onChangeDefaultQuestion = (updatedQuestionInfo: QuestionType) => {
    setDefaultQuestions(
      defaultQuestions.map((item) => {
        if (item.id === updatedQuestionInfo.id) {
          return {
            ...item,
            weight: updatedQuestionInfo.weight,
            countScore: updatedQuestionInfo.countScore,
          };
        } else {
          return item;
        }
      })
    );
  };

  const onClickAddNewCustomQuestion = () => {
    setCustomQuestions(
      [
        ...customQuestions,
        {
          countScore: "",
          id: customQuestions.length.toString(),
          isMandatory: true,
          options: [""],

          title: "",
          type: "custom",
          weight: 3,
        },
      ].map((item, index) => {
        return {
          ...item,
          id: index.toString(),
        };
      })
    );
  };

  const onClickAddAnswerToCustomQuestion = ({
    answer,
    questionId,
  }: {
    questionId: string;
    answer: string;
  }) => {
    setCustomQuestions([
      ...customQuestions.map((item) => {
        if (item.id === questionId) {
          return {
            ...item,
            options: [...item.options, answer],
          };
        } else {
          return item;
        }
      }),
    ]);
  };

  const onChangeCustomQuestionInfo = (newCustomQuestionInfo: QuestionType) => {
    setCustomQuestions([
      ...customQuestions.map((item) => {
        if (item.id === newCustomQuestionInfo.id) {
          return newCustomQuestionInfo;
        } else {
          return item;
        }
      }),
    ]);
  };

  const onDeleteCustomQuestionInfo = (newCustomQuestionInfoId: string) => {
    setCustomQuestions(
      customQuestions
        .filter((item) => {
          return item.id !== newCustomQuestionInfoId;
        })
        .map((data, index) => {
          return { ...data, id: index.toString() };
        })
    );
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
        <div>팀 빌딩에 참고할 학생들의 정보를 설정해주세요</div>
        <div className={styles.questions}>
          <DefaultQuestion
            data={defaultQuestions}
            onChangeDefaultQuestionInfo={onChangeDefaultQuestion}
          />
          <hr />
          <CustomQuestion
            data={customQuestions}
            defaultQuestionLength={defaultQuestions.length}
            onChangeData={onChangeCustomQuestionInfo}
            onAddNewData={onClickAddNewCustomQuestion}
            onAddNewOption={onClickAddAnswerToCustomQuestion}
            onDeleteData={onDeleteCustomQuestionInfo}
          />
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
