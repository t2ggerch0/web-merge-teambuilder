import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import Register from "../Register/Register";
import LogIn from "../LogIn/LogIn";
import { MyInfoType } from "../../interface";
import { useAuthContext } from "../../Context/UnicoopContext";
import { api } from "../../API/api";

const Home = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoginSuccess, setIsLoginSucess] = useState<boolean>(false);
  const userInfoHandle = useAuthContext();
  const changeBoxContent = () => {
    setIsLogin(!isLogin);
  };
  const login = ({ email, password }: { email: string; password: string }) => {
    api.login({ email, password }).then((token) => {
      console.log("token", token);

      getUserInfo({ token });
    });
  };

  const getUserInfo = ({ token }: { token: string }) => {
    api.getUserInfoByToken(token).then((res) => {
      console.log("userInfo", res.user);
      userInfoHandle.setMyInfo({
        userType: res?.user.userType ?? "student",
        classes: res?.user.classes ?? [],
        email: res?.user.email ?? "",
        id: res?.user.id ?? "",
        major: res?.user.major ?? "",
        name: res?.user.name ?? "",
        password: res?.user.password ?? "",
        studentId: res?.user.studentId ?? -1,
      });
      setIsLoginSucess(true);
    });
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      // TODO: token으로 회원 정보 가져오는 api호출
      getUserInfo({ token });
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
              <LogIn changeBoxContent={changeBoxContent} loginSuccess={login} />
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
