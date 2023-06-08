import React, { FC, useState } from "react";
import styles from "./ProjectBox.module.scss";
import dayjs from "dayjs";
import CodePopUp from "../CodePopUp/CodePopUp";
import { useNavigate } from "react-router-dom";
import { NewClassType } from "../../interface";
import "dayjs/locale/ko";

type ProjectBoxProps = {
  projectInfo: NewClassType;
  isHost: boolean;
  withAccessKey?: boolean;
  isAfter?: boolean;
};

const ProjectBox: FC<ProjectBoxProps> = ({
  projectInfo,
  isHost,
  withAccessKey = true,
  isAfter = false,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onChangeOpen = (e: boolean) => {
    setIsOpen(e);
    console.log("e", e);
  };

  const goToProject = () => {
    // 프로젝트 관리
    if (withAccessKey) {
      navigate(`/activity/${projectInfo._id}/${isHost}`, {
        state: projectInfo,
      });
    }
    //프로젝트 입장
    else {
      if (projectInfo.isSecret) {
        // check access key
        onChangeOpen(true);
      } else {
        navigate(`/apply/${projectInfo._id}/0`);
      }
    }
  };

  return (
    <div
      className={`${styles.projectBox} ${isAfter && styles.after}`}
      onClick={isAfter ? () => {} : goToProject}>
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
      <CodePopUp
        isPopOn={isOpen}
        setIsPopOn={setIsOpen}
        projectInfo={projectInfo}
      />
    </div>
  );
};

export default ProjectBox;
