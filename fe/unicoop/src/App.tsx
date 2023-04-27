import React, { useRef, useState, useEffect } from "react";
import styles from "./App.module.scss";
import Home from "./Pages/Home/Home";
import RegisterProject from "./Pages/RegisterProect/RegisterProject";
import ManageProject from "./Pages/ManageProject/ManageProject";
import Apply from "./Pages/Apply/Apply";
import Activity from "./Pages/Activity/Activity";
import MyPage from "./Pages/MyPage/MyPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Menu } from "./interface";
import { api } from "./API/api";
import { useAuthContext } from "./Context/UnicoopContext";

const App = () => {
  const appRef = useRef<HTMLDivElement | null>(null);
  const userInfoHandle = useAuthContext();
  const [menu, setMenu] = useState<Menu>(Menu.ManagementProject);

  const onClickMenu = (menuId: Menu) => {
    setMenu(menuId);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token !== null) {
      api.getUserInfoByToken(token).then((res) => {
        userInfoHandle.setMyInfo({
          userType: res?.user.userType ?? "student",
          classes: res?.user.classes ?? [],
          email: res?.user.email ?? "",
          id: res?.user?.id ?? "",
          major: res?.user.major ?? "",
          name: res?.user.name ?? "",
          password: res?.user.password ?? "",
          studentId: res?.user.studentId ?? -1,
          token: token ?? "",
        });
      });
    }
  }, []);

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
          <Route path={"/apply"} element={<Apply />} />
          <Route path={"/activity"} element={<Activity />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
