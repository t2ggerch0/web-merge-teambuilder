import React, { FC } from "react";
import styles from "./Home.module.scss";
import NavBar from "../../Components/NavBar/NavBar";
import { Menu } from "../../interface";

type HomeProps = {
  onChangeMenu(menuId: Menu): void;
};

const Home: FC<HomeProps> = ({ onChangeMenu }) => {
  return (
    <div className={styles.home}>
      <NavBar onChangeMenu={onChangeMenu} />

      <div className={styles.body}>
        <div className={styles.slogan}>
          <div className={styles.line}>개발자/디자이너를 위한</div>
          <div className={styles.line}>
            <span className={styles.highlight}>팀 프로젝트</span> 빌딩 및 협업
            플랫폼!
          </div>
        </div>
        <div className={styles.functions}>
          <div className={styles.function}>더 많은 개발자와 협업</div>
          <div className={`${styles.function} ${styles.bottom}`}>
            관심 있는 주제의 프로젝트를 찾아보세요!
          </div>
          <div className={`${styles.function}`}>
            직접 호스트가 되어 프로젝트를 운영해보세요!
          </div>
          <div className={`${styles.function} ${styles.bottom}`}>
            고도화된 알고리즘으로 팀 매칭 제공
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
