import React from "react";
import styles from "./ViewProjects.module.scss";
import UnicoopButton from "../../../Components/UnicoopButton/UnicoopButton";

const ViewProjects = () => {
  return (
    <div className={styles.viewProjects}>
      <div className={styles.title}>내 프로젝트 ()</div>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.from}>From</div>
          <div className={styles.to}>To</div>
          <div className={styles.className}>수업명</div>
          <div className={styles.role}>역할</div>
          <div className={styles.grade}>성적</div>
          <div className={styles.file}>파일</div>
        </div>
        <div className={styles.body}>
          <div className={styles.from}>22/02/25</div>
          <div className={styles.to}>22/06/03</div>
          <div className={styles.className}>Capstone</div>
          <div className={styles.role}>조장</div>
          <div className={styles.grade}>4.5 / 5</div>
          <div className={styles.file}>Final_Project.pdf</div>
        </div>
      </div>
      <div className={styles.buttons}>
        <UnicoopButton onClick={() => {}}>Share</UnicoopButton>
        <UnicoopButton onClick={() => {}}>Export</UnicoopButton>
      </div>
    </div>
  );
};

export default ViewProjects;
