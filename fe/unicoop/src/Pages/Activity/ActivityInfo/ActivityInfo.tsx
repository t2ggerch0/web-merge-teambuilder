import React from "react";
import styles from "./ActivityInfo.module.scss";
import MeetingTime from "./MeetingTime/MeetingTime";
import ToDoList from "./ToDoList/ToDoList";

const ActivityInfo = () => {
  return (
    <div className={styles.activityInfo}>
      <MeetingTime />
      <ToDoList />
    </div>
  );
};

export default ActivityInfo;
