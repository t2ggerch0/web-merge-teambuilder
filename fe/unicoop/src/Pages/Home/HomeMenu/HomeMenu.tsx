import React from "react";
import styles from "./HomeMenu.module.scss";
import { useAuthContext } from "../../../Context/UnicoopContext";
import { useNavigate } from "react-router-dom";

const HomeMenu = () => {
  const { myInfo } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className={styles.homeMenu}>
      <div className={styles.title}>{myInfo?.name}님, 환영합니다!</div>
      <div className={styles.menuBox}>
        <div
          className={styles.menu}
          onClick={() => {
            navigate("/manageproject");
          }}
        >
          Projects
        </div>
        <div
          className={styles.menu}
          onClick={() => {
            navigate("/mypage");
          }}
        >
          My Page
        </div>
        <div
          className={styles.menu}
          onClick={() => {
            navigate("/whatismerge");
          }}
        >
          How to use merge
        </div>
      </div>
    </div>
  );
};

export default HomeMenu;
