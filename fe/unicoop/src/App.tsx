import React, { useState } from "react";
import styles from "./App.module.scss";
import Home from "./Pages/Home/Home";
import RegisterProject from "./Pages/RegisterProect/RegisterProject";
import ManageProject from "./Pages/ManageProject/ManageProject";
import Apply from "./Pages/Apply/Apply";
import Activity from "./Pages/Activity/Activity";
import MyPage from "./Pages/MyPage/MyPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Menu } from "./interface";
import ParticipateProject from "./Pages/ParticipateProject/ParticipateProject";

const App = () => {
  const [menu, setMenu] = useState<Menu>(Menu.ManagementProject);

  const onClickMenu = (menuId: Menu) => {
    setMenu(menuId);
  };

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/participateproject"
            element={
              <ParticipateProject
                selectedMenu={menu}
                onChangeMenu={onClickMenu}
              />
            }
          />
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
          <Route path={"/apply/:projectId/:accessKey"} element={<Apply />} />
          <Route path={"/activity/:projectId"} element={<Activity />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
