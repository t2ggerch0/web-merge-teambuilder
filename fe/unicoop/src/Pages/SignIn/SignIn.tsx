import React, { useState } from "react";
import styles from "./SignIn.module.scss";
import LogIn from "./LogIn/LogIn";
import Register from "./Register/Register";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [joinMode, setJoinMode] = useState<string>("login");

  return (
    <div className={styles.signIn}>
      <div
        className={styles.logo}
        onClick={() => {
          navigate("/");
        }}
      >
        merge
      </div>

      <div className={styles.join}>
        {joinMode === "login" ? (
          <LogIn setJoinMode={setJoinMode} />
        ) : (
          <Register setJoinMode={setJoinMode} />
        )}
      </div>
    </div>
  );
};

export default SignIn;
