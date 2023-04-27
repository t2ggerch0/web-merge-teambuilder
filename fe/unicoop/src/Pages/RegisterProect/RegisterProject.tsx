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

type RegisterProjectProps = {
  selectedMenu: Menu;
  onChangeMenu(menuId: Menu): void;
};

const RegisterProject: FC<RegisterProjectProps> = ({
  selectedMenu,
  onChangeMenu,
}) => {
  const userInfoHandle = useAuthContext();
  const [projectRegisterInfo, setProjectRegisterInfo] =
    useState<ProjectRegisterInfo>({
      capacity: 0,
      className: "",
      endDate: "2023.01.02",
      questions: [],
      startDate: "2023.01.01",
    });

  const [defaultQuestions, setDefaultQuestions] = useState<QuestionType[]>([
    {
      id: "1",
      title: "What is your Age?",
      type: "default",
      options: ["20", "21", "22", "23", "24", "25 or more"],
      isMandatory: false,
      weight: 5,
      scoringType: "points",
      countScore: "different",
    },
    {
      id: "2",
      title: "Personality",
      type: "default",
      options: ["Extrovert", "Introvert"],
      isMandatory: false,
      weight: 3,
      scoringType: "single",
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
      weight: 2,
      scoringType: "multi",
      countScore: "same",
    },
    {
      id: "4",
      title: "English Skills",
      type: "default",
      options: ["Good", "Average", "Bad"],
      isMandatory: false,
      weight: 1,
      scoringType: "single",
      countScore: "different",
    },
    {
      id: "5",
      title: "Preferred Role",
      type: "default",
      options: ["Leader", "Follower"],
      isMandatory: false,
      weight: 1,
      scoringType: "single",
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
    setProjectRegisterInfo({ ...projectRegisterInfo, [name]: value });
  };

  const onClickRegisterButton = () => {
    const token = window.localStorage.getItem("token") ?? "";
    api.createClass({
      name: projectRegisterInfo.className,
      capacity: projectRegisterInfo.capacity,
      startDate: projectRegisterInfo.startDate,
      endDate: projectRegisterInfo.endDate,
      token,
    });
    // TODO : Default questoi의 count와 weight 전송
    // TODO : Custom Question 추가 전송
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
    setCustomQuestions([
      ...customQuestions,
      {
        countScore: "same",
        id: customQuestions.length.toString(),
        isMandatory: true,
        options: [""],
        scoringType: "multi",
        title: "",
        type: "",
        weight: 5,
      },
    ]);
  };

  const onClickAddAnswerToCustomQuestion = ({
    answer,
    qeustionId,
  }: {
    qeustionId: string;
    answer: string;
  }) => {
    setCustomQuestions([
      ...customQuestions.map((item) => {
        if (item.id === qeustionId) {
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
          <div className={styles.custom_questions}>
            <div className={styles.custom_questions_title}>
              <div>팀 빌딩에 참고할 학생들의 정보를 추가할 수 있습니다</div>
              <div
                className={styles.add_question_button}
                onClick={onClickAddNewCustomQuestion}>
                + 추가하기
              </div>
            </div>
            <div>
              {customQuestions.map((item, index) => {
                return (
                  <div key={`q_${index}`} className={styles.question_wrapper}>
                    <div>
                      <div className={styles.question_row1}>
                        <div className={styles.question_title}>
                          <div>
                            <div className={styles.question_index}>
                              {`질문 ${defaultQuestions.length + index + 1}`}
                            </div>
                            <div>
                              <span>필수</span>
                              <input
                                type="checkbox"
                                checked={item.isMandatory}
                                onChange={() => {}}
                              />
                            </div>
                          </div>
                          <input
                            className={styles.question_content}
                            value={item.title}
                            placeholder="질문을 입력해주세요"
                            onChange={() => {}}
                          />

                          <div className={styles.score_type_container}>
                            <div>
                              <input
                                type="radio"
                                name={`q_${index}_score`}
                                value={"same"}
                                checked={item.countScore === "same"}
                                onChange={() => {}}
                              />
                              <span>same</span>
                            </div>
                            <div>
                              <input
                                type="radio"
                                name={`q_${index}_score`}
                                value={"different"}
                                checked={item.countScore === "different"}
                                onChange={() => {}}
                              />
                              <span>different</span>
                            </div>
                          </div>
                          <div className={styles.weight}>
                            <div>
                              <div>weight: {item.weight}</div>
                              <input
                                className={styles.question_weight}
                                type="range"
                                min={0}
                                max={5}
                                value={item.weight}
                                onChange={(e) => {}}
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <span>scoringType</span>
                          <input
                            type="radio"
                            name={`q_${item.id}_scoring_type`}
                            value={ScoringType.single}
                            onChange={() => {}}
                          />
                          <span>{ScoringType.single}</span>

                          <input
                            type="radio"
                            name={`q_${item.id}_scoring_type`}
                            value={ScoringType.multi}
                            onChange={() => {}}
                          />
                          <span>{ScoringType.multi}</span>

                          <input
                            type="radio"
                            name={`q_${item.id}_scoring_type`}
                            value={ScoringType.points}
                            onChange={() => {}}
                          />
                          <span>{ScoringType.points}</span>
                        </div>
                      </div>
                      <div className={styles.question_answers}>
                        {item.options.map((option, index) => {
                          return (
                            <div>
                              <input
                                key={`q_${index}`}
                                className={styles.answer}
                                placeholder="예시답안을 입력하세요"
                                value={option}
                                onChange={() => {}}
                              />
                              <span className={styles.cancel}>X</span>
                            </div>
                          );
                        })}
                        <div
                          className={styles.add_answer_option_button}
                          onClick={(e) => {
                            onClickAddAnswerToCustomQuestion({
                              answer: "",
                              qeustionId: item.id,
                            });
                          }}>
                          + 답 추가하기
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
