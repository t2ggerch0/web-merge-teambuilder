import React from "react";
import styles from "./MeetingTime.module.scss";

const MeetingTime = () => {
  return (
    <div className={styles.meetingTime}>
      <div className={styles.header}>Team meeting starts at</div>
      <div className={styles.time}>Thursday 10:00 am</div>
      <div className={styles.daysLeft}>3 days 15 hours left</div>
    </div>
  );
};

export default MeetingTime;
