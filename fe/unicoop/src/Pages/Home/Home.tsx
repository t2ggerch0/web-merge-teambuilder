import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import Register from "../Register/Register";
import LogIn from "../LogIn/LogIn";
import { useAuthContext } from "../../Context/UnicoopContext";
import { authApi } from "../../API/authApi";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getMyToken, viewToastError } from "../../helper";

const Home = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false);
  const { setMyInfo } = useAuthContext();
  const navigate = useNavigate();
  const changeBoxContent = () => {
    setIsLogin(!isLogin);
  };
  const login = ({ email, password }: { email: string; password: string }) => {
    authApi.login({ email, password }).then((token) => {
      console.log("token", token);
      window.localStorage.setItem("token", token);
      getUserInfo({ token });
    });
  };

  const getUserInfo = ({ token }: { token: string }) => {
    authApi
      .getMyInfo(token)
      .then((res) => {
        console.log("userInfo", res?.user);
        setMyInfo({
          classes: res?.user.classes ?? [],
          email: res?.user.email ?? "",
          id: res?.user._id ?? "",
          name: res?.user.name ?? "",
          password: res?.user.password ?? "",
          token: token ?? "",
        });
        setIsLoginSuccess(true);
        navigate("/manageproject");
      })
      .catch((e) => {
        viewToastError(e);
      });
  };

  useEffect(() => {
    let token = getMyToken();
    if (token) {
      getUserInfo({ token });
    }
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.body}>
        <div className={styles.title}>
          <div className={styles.logo}>UNICOOP</div>
          <div className={styles.text}>팀 빌딩 및 협업 플랫폼!</div>
        </div>
        <div className={styles.join}>
          {isLogin ? (
            !isLoginSuccess && (
              <LogIn changeBoxContent={changeBoxContent} loginSuccess={login} />
            )
          ) : (
            <Register changeBoxContent={changeBoxContent} />
          )}
          <ToastContainer
            className={styles.toast}
            position="top-center"
            hideProgressBar
            closeButton={false}
            rtl={false}
            theme="colored"
          />
        </div>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default Home;
