import React, { FC, useState } from "react";
import styles from "./ProjectBox.module.scss";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { NewClassType } from "../../interface";
import CodePopUp from "../CodePopUp/CodePopUp";

type ProjectBoxProps = {
  projectInfo: NewClassType;
  withAccessKey?: boolean;
};

const ProjectBox: FC<ProjectBoxProps> = ({
  projectInfo,
  withAccessKey = true,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onChangeOpen = (e: boolean) => {
    setIsOpen(e);
    console.log("e", e);
  };

  const goToProject = () => {
    if (withAccessKey) {
      navigate(`/activity/${projectInfo._id}`);
    } else {
      if (projectInfo.isSecret) {
        // check access key
        onChangeOpen(true);
        // navigate
      } else {
        navigate(`/apply/${projectInfo._id}/0`);
      }
    }
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
        {withAccessKey && (
          <div className={styles.class_key}>
            신청 코드: {projectInfo.accessKey}
          </div>
        )}
      </div>
      {isOpen && (
        <CodePopUp
          isPopOn={isOpen}
          projectInfo={projectInfo}
          setIsPopOn={onChangeOpen}
        />
      )}
    </div>
  );
};

export default ProjectBox;
