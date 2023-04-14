import React, { useRef } from "react";
import styles from "./App.module.scss";
import Home from "./Pages/Home/Home";
import MyPage from "./Pages/MyPage/MyPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const appRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className={styles.app} ref={appRef}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
