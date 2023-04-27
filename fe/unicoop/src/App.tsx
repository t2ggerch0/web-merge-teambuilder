import React, { useRef, useState } from "react";
import styles from "./App.module.scss";
import Home from "./Pages/Home/Home";
import Layout from "./Components/Layout/Layout";
import RegisterProject from "./Pages/RegisterProect/RegisterProject";
import ManageProject from "./Pages/ManageProject/ManageProject";
import Activity from "./Pages/Activity/Activity";
import MyPage from "./Pages/MyPage/MyPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Menu } from "./interface";

const App = () => {
  const appRef = useRef<HTMLDivElement | null>(null);
  const [menu, setMenu] = useState<Menu>(Menu.ManagementProejct);

  const onClickMenu = (menuId: Menu) => {
    setMenu(menuId);
  };

  return (
    <div className={styles.app} ref={appRef}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/registerproject"
            element={
              <RegisterProject selectedMenu={menu} onChangeMenu={onClickMenu} />
            }
          />
          <Route
            path="/manageproject"
            element={
              <ManageProject selectedMenu={menu} onChangeMenu={onClickMenu} />
            }
          />
          <Route path={"/activity"} element={<Activity />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
