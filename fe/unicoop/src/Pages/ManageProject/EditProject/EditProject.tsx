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

const EditProject: FC<EditProjectProps> = ({ classInfo, onClickClass, onFinishEditQuestion }) => {
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

  console.log("question", question);
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
        <div className={styles.menu}>
          <button className={styles.btn}>질문 추가</button>
          <button className={styles.btn}>질문 수정</button>
          <button className={styles.btn}>질문 삭제</button>
          <button className={styles.btn} onClick={() => onFinishEditQuestion(classInfo.id)}>
            질문 편집 완료
          </button>
        </div>
        <div className={styles.question_wrapper}>
          <div className={styles.label}>Questions</div>
          <div className={styles.label}>옵션</div>
          <div className={styles.label}>필수 여부</div>
          <div className={styles.label}>가중치</div>
          <div className={styles.label}>점수 판단 기준</div>
        </div>

        {question.map((q) => {
          return (
            <>
              <div className={styles.question_value}>
                <div>{q?.title}</div>
                <div>
                  {q.options.map((option) => {
                    return <div>{option}</div>;
                  })}
                </div>
                <div>{q.isMandatory ? q.isMandatory : "X"}</div>
                <div>{q.weight}</div>
                <div>{q.countScore}</div>
              </div>
              <hr></hr>
            </>
          );
        })}
      </div>
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
