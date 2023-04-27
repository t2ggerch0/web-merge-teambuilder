import React, { FC } from "react";
import styles from "./EditProject.module.scss";
import { ClassType } from "../../../interface";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VerifiedIcon from "@mui/icons-material/Verified";

type EditProjectProps = {
  classInfo: ClassType;
  onClickClass(classId?: string): void;
};

const EditProject: FC<EditProjectProps> = ({ classInfo, onClickClass }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title} onClick={() => onClickClass(undefined)}>
        <DashboardIcon /> 프로젝트 목록
      </div>
      <div>
        <button> 수업 삭제</button>
      </div>
      <hr />
      <div>name: {classInfo.name}</div>
      <div>capacity: {classInfo.capacity}</div>
      <div>startDate: {classInfo.startDate}</div>
      <div>endDate: {classInfo.endDate}</div>
      <hr />
      <div>
        <div>
          <div>questions:</div>
          <div>
            <button>질문 추가</button>
            <button>질문 수정</button>
            <button>질문 삭제</button>
            <button>질문 편집 완료</button>
          </div>
        </div>

        {classInfo.questions.map((q) => {
          return <div>{q}</div>;
        })}
      </div>

      <div>answers: {classInfo.answers}</div>
      <hr />
      <div>students: {classInfo.students}</div>
      <hr />
      <div>teams: {classInfo.teams}</div>
    </div>
  );
};

export default EditProject;
