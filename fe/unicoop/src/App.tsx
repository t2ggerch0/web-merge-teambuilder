import React from "react";
import styles from "./App.module.scss";
import Home from "./Pages/Home/Home";
import Layout from "./Components/Layout/Layout";
import RegisterProject from "./Pages/RegisterProect/RegisterProject";

const App = () => {
  return (
    <div className={styles.app}>
      {/* <Home /> */}
      <Layout pageTitle="프로젝트 등록">
        <RegisterProject something="asfd" />
      </Layout>
    </div>
  );
};

export default App;
