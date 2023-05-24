import React, { FC } from "react";
import styles from "./ProjectBox.module.scss";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { NewClassType } from "../../interface";

type ProjectBoxProps = {
  projectInfo: NewClassType;
};

const ProjectBox: FC<ProjectBoxProps> = ({ projectInfo }) => {
  const navigate = useNavigate();

  const goToProject = () => {
    navigate(`/activity/${projectInfo._id}`);
  };

  return (
    <div className={styles.projectBox} onClick={goToProject}>
      <div className={styles.class_info}>
        <div className={styles.class_name}>{projectInfo.className}</div>
        <div className={styles.class_description}>
          {projectInfo.classDescription}
        </div>
        <div className={styles.class_semester}>
          모집 기간: {dayjs(projectInfo.recruitStartDate).format("MM/DD")} -{" "}
          {dayjs(projectInfo.recruitEndDate).format("MM/DD")}
        </div>
        <div className={styles.class_semester}>
          활동 기간: {dayjs(projectInfo.activityStartDate).format("MM/DD")} -{" "}
          {dayjs(projectInfo.activityEndDate).format("MM/DD")}
        </div>
        <div className={styles.class_key}>
          신청 코드: {projectInfo.accessKey}
        </div>
      </div>
    </div>
  );
};

export default ProjectBox;
