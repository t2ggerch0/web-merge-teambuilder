import React, { FC } from "react";
import styles from "./EditProject.module.scss";
import { ClassType } from "../../../interface";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VerifiedIcon from "@mui/icons-material/Verified";

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

        {classInfo.questions.map((q) => {
          return <div className={styles.question_value}>{q}</div>;
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
