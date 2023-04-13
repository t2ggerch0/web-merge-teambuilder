import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import Register from "../Register/Register";
import LogIn from "../LogIn/LogIn";
import { MyInfoType } from "../../interface";
import { useAuthContext } from "../../Context/UnicoopContext";

const Home = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoginSuccess, setIsLoginSucess] = useState<boolean>(false);
  const userInfoHandle = useAuthContext();
  const changeBoxContent = () => {
    setIsLogin(!isLogin);
  };
  const loginSuccess = (userInfo: MyInfoType) => {
    setIsLoginSucess(true);
    userInfoHandle.setMyInfo(userInfo);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token !== null) {
      // TODO: token으로 회원 정보 가져오는 api호출
    }
  }, []);
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
          {isLogin ? (
            isLoginSuccess ? (
              <div>{userInfoHandle.myInfo?.name}님, 환영합니다!</div>
            ) : (
              <LogIn
                changeBoxContent={changeBoxContent}
                loginSuccess={loginSuccess}
              />
            )
          ) : (
            <Register changeBoxContent={changeBoxContent} />
          )}
        </div>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default Home;
