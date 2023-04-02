import React from "react";
import styles from "./App.module.scss";
import Home from "./Pages/Home/Home";
import LogIn from "./Pages/LogIn/LogIn";

const App = () => {
  return (
    <div className={styles.app}>
      {/* <Home /> */}
      <LogIn />
    </div>
  );
};

export default App;
