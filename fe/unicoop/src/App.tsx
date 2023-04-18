import React, { useRef } from "react";
import styles from "./App.module.scss";
import Home from "./Pages/Home/Home";
import Layout from "./Components/Layout/Layout";
import RegisterProject from "./Pages/RegisterProect/RegisterProject";
import MyPage from "./Pages/MyPage/MyPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManageProject from "./Pages/ManageProject/ManageProject";

const App = () => {
  const appRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className={styles.app} ref={appRef}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/registerproject"
            element={
              <Layout
                pageTitle="프로젝트 등록"
                children={<RegisterProject />}></Layout>
            }
          />
          <Route
            path="/manageproject"
            element={
              <Layout
                pageTitle="프로젝트 관리"
                children={<ManageProject />}></Layout>
            }
          />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
