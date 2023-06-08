import React, { useState } from "react";
import styles from "./SignIn.module.scss";
import Logo from "../../Components/Logo/Logo";
import LogIn from "./LogIn/LogIn";
import Register from "./Register/Register";

const SignIn = () => {
  const [joinMode, setJoinMode] = useState<string>("login");

  return (
    <div className={styles.signIn}>
      <Logo color={"#609966"} fontSize={40} isClickable={true} />

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
