import React from "react";
import styles from "./App.module.scss";
import Home from "./Pages/Home/Home";

const App = () => {
  return (
    <div className={styles.app}>
      <Home />
    </div>
  );
};

export default App;
