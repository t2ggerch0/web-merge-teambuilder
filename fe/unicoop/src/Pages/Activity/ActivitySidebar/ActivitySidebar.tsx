import React, { FC } from "react";
import styles from "./ActivitySidebar.module.scss";
import { useNavigate } from "react-router-dom";

type ActivitySidebarProps = {
  activityArray: Array<string>;
  setActivityArray(e: Array<string>): void;
  activityIndex: number;
  setActivityIndex(e: number): void;
};

const ActivitySidebar: FC<ActivitySidebarProps> = ({
  activityArray,
  setActivityArray,
  activityIndex,
  setActivityIndex,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.activitySidebar}>
      <div className={styles.teamInfo}>
        <div className={styles.project}>Capstone</div>
        <div className={styles.team}>Team F</div>
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
              }}
            >
              {activity}
            </div>
          ))}
        </div>
        <div className={styles.addTab} onClick={() => {}}>
          + add tab
        </div>
      </div>
      <div
        className={styles.unicoop}
        onClick={() => {
          navigate("/manageproject");
        }}
      >
        UNICOOP
      </div>
    </div>
  );
};

export default ActivitySidebar;
