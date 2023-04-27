import React, { FC, useState, useEffect } from "react";
import styles from "./EditProject.module.scss";
import { ClassType } from "../../../interface";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { QuestionType } from "../../../interface";
import { api } from "../../../API/api";

type EditProjectProps = {
  classInfo: ClassType;
  onClickClass(classId?: string): void;
  onFinishEditQuestion(classId?: string): void;
};

const EditProject: FC<EditProjectProps> = ({
  classInfo,
  onClickClass,
  onFinishEditQuestion,
}) => {
  const [question, setQuestion] = useState<QuestionType[]>([]);

  const getQuestion = async () => {
    const result = await Promise.all(
      classInfo.questions.map((id) => {
        return api.getQuestionInfo(id).then((res: unknown) => {
          return res as QuestionType;
        });
      })
    );
    setQuestion(result);
  };

  console.log("quesiotn", question);
  useEffect(() => {
    getQuestion();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <div className={styles.title} onClick={() => onClickClass(undefined)}>
          <DashboardIcon /> 프로젝트 목록
        </div>
        <div className={styles.delete_button}>
          <button className={styles.btn}> 수업 삭제</button>
        </div>
      </div>
      <hr />
      <div className={styles.name_container}>
        <span className={styles.name}>name:</span> <span>{classInfo.name}</span>
      </div>
      <div className={styles.capacity_container}>
        <span className={styles.name}>capacity:</span> {classInfo.capacity}
      </div>
      <div className={styles.startdate_container}>
        <span className={styles.name}>startDate:</span> {classInfo.startDate}
      </div>
      <div className={styles.enddate_container}>
        <span className={styles.name}>endDate:</span> {classInfo.endDate}
      </div>
      <hr />
      <div className={styles.question_container}>
        <div className={styles.question_wrapper}>
          <div className={styles.label}>questions:</div>
          <div className={styles.menu}>
            <button className={styles.btn}>질문 추가</button>
            <button className={styles.btn}>질문 수정</button>
            <button className={styles.btn}>질문 삭제</button>
            <button
              className={styles.btn}
              onClick={() => onFinishEditQuestion(classInfo.id)}>
              질문 편집 완료
            </button>
          </div>
        </div>

        {question.map((q) => {
          return (
            <div className={styles.question_value}>
              <div>{q?.title}</div>
              <div>답: {q.options.map((o) => o)}</div>
              <div>필수 여부: {q.isMandatory}</div>
              <div>가중치{q.weight}</div>
              <div>점수 판단 기준:{q.countScore}</div>
            </div>
          );
        })}
      </div>
      <hr />
      <div className={styles.answer_container}>
        <div className={styles.label}>answers:</div>
        {classInfo.answers}
      </div>
      <hr />
      <div className={styles.student_container}>
        <div className={styles.label}> students:</div> {classInfo.students}
      </div>
      <hr />
      <div className={styles.team_container}>
        <div className={styles.label}>teams:</div> {classInfo.teams}
      </div>
    </div>
  );
};

export default EditProject;
