import React from "react";
import styles from "./App.module.scss";
import Home from "./Pages/Home/Home";
import LogIn from "./Pages/LogIn/LogIn";
import Register from "./Pages/Register/Register";

const App = () => {
  return (
    <div className={styles.app}>
      <Home />
      {/*<LogIn />*/}
      {/*<Register />*/}
    </div>
  );
};

export default App;
