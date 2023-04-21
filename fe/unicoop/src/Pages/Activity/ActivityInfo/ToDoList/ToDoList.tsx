import React from "react";
import styles from "./ToDoList.module.scss";

const ToDoList = () => {
  return (
    <div className={styles.toDoList}>
      <div className={styles.title}>To-do List</div>
      <div className={styles.lists}>아직 할 일이 등록되지 않았습니다.</div>
    </div>
  );
};

export default ToDoList;
