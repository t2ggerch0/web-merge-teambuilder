import React from "react";
import styles from "./ActivityTeam.module.scss";

const ActivityTeam = () => {
  return (
    <div className={styles.activityTeam}>
      <div className={styles.title}>팀 정보</div>
      <div className={styles.body}>
        <div className={styles.name}>name</div>
        <div className={styles.leader}>leader</div>
        <div className={styles.members}>members</div>
      </div>
    </div>
  );
};

export default ActivityTeam;
