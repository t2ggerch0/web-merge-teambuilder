import React, { FC } from "react";
import styles from "./ActivitySidebar.module.scss";
import useSWR from "swr";
import Loader from "../../../Components/Loader/Loader";
import { NewClassType } from "../../../interface";
import { swrFetcher } from "../../../API/authApi";
import { viewToastError } from "../../../helper";
import { useNavigate, useParams } from "react-router-dom";

type ActivitySidebarProps = {
  activityArray: Array<string>;
  activityIndex: number;
  setActivityIndex(e: number): void;
};

const ActivitySidebar: FC<ActivitySidebarProps> = ({
  activityArray,
  activityIndex,
  setActivityIndex,
}) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { data, error, isValidating } = useSWR<{
    targetClass: NewClassType;
  }>(`/class?classId=${projectId}`, swrFetcher);
  if (!data || isValidating) {
    return <Loader />;
  }
  if (error) {
    viewToastError(error);
  }

  return (
    <div className={styles.activitySidebar}>
      <div className={styles.teamInfo}>
        <div className={styles.project}>{data.targetClass.className}</div>
        <div className={styles.team}>{data.targetClass.teams[0]}</div>
      </div>
      <div className={styles.menu}>
        <div className={styles.tabs}>
          {activityArray.map((activity, index) => (
            <div
              className={`${styles.tab} ${
                index === activityIndex ? styles.selected : ""
              }`}
              onClick={() => {
                setActivityIndex(index);
              }}>
              {activity}
            </div>
          ))}
        </div>
      </div>
      <div
        className={styles.unicoop}
        onClick={() => {
          navigate("/manageproject");
        }}>
        👈 프로젝트 관리
      </div>
    </div>
  );
};

export default ActivitySidebar;
