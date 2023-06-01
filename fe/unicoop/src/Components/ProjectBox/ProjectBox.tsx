import React, { FC, useState } from "react";
import styles from "./ProjectBox.module.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 가져오기
import { useNavigate } from "react-router-dom";
import { NewClassType } from "../../interface";
import CodePopUp from "../CodePopUp/CodePopUp";
import { viewToastInfo } from "../../helper";

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
  dayjs.extend(relativeTime);
  // TODO : 오늘 날짜는 false로 설정
  let endDate = dayjs().to(
    dayjs(projectInfo?.recruitEndDate).format("YYYY-MM-DD")
  );

  const isOver = endDate.includes("hours")
    ? false
    : dayjs()
        .to(dayjs(projectInfo?.recruitEndDate).format("YYYY-MM-DD"))
        .includes("ago");

  const onChangeOpen = (e: boolean) => {
    setIsOpen(e);
    console.log("e", e);
  };

  const goToProject = () => {
    // 프로젝트 관리
    if (withAccessKey) {
      navigate(`/activity/${projectInfo._id}`);
    }
    //프로젝트 입장
    else {
      // 모집기간 지남
      if (isOver) {
        viewToastInfo("해당 프로젝트의 모집기간이 지났습니다.");
      } else {
        if (projectInfo.isSecret) {
          // check access key
          onChangeOpen(true);
        } else {
          navigate(`/apply/${projectInfo._id}/0`);
        }
      }
    }
  };

  return (
    <div
      className={`${styles.projectBox} ${
        isOver && !withAccessKey && styles.projectBox_gray
      }`}
      onClick={goToProject}>
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
