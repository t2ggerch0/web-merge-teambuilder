import React, { useState } from "react";
import styles from "./LogIn.module.scss";
import axios from "axios";

const LogIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const clickLogin = () => {
    axios
      .post("https://port-0-unicoop-nx562olfpi8ozh.sel3.cloudtype.app/login", {
        email,
        password,
        userType: "student",
      })
      .then((res) => {
        console.log("res", res.data);
        if(res.data.code === 1){
          //로그인 성공
        }else {
          // 로그인 실패
        }
      });
  };
  return (
    <div className={styles.login}>
      <div className={styles.body}>
        <div className={styles.title}>
          <div className={styles.logo}>UNICOOP</div>
          <div className={styles.text}>
            <div>Don't have an account? </div>
            <span className={styles.highlight}> Create your account</span>
          </div>

          <div>
            <div className={styles.input_area}>
              <input
                className={styles.input}
                value={email}
                onChange={changeEmail}
                placeholder="Enter your email"
              />
              <input
                className={styles.input}
                value={password}
                onChange={changePassword}
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className={styles.button_area}>
            <button
              className={styles.button}
              disabled={email.length === 0 || password.length === 0}
              onClick={clickLogin}>
              LOGIN
            </button>
          </div>
        </div>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default LogIn;
