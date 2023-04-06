import React from "react";
import styles from "./Home.module.scss";
import Register from "../Register/Register";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.body}>
        <div className={styles.title}>
          <div className={styles.logo}>UNICOOP</div>
          <div className={styles.text}>
            대학교 팀 프로젝트 빌딩 및 협업 플랫폼!
          </div>
        </div>
        <div className={styles.join}>
          <Register />
        </div>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default Home;
