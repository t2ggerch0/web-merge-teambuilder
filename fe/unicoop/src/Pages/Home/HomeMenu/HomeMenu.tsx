import React, { FC, useEffect, useState } from "react";
import styles from "./HomeMenu.module.scss";
import { useAuthContext } from "../../../Context/UnicoopContext";
import { useNavigate } from "react-router-dom";
import { getMyToken } from "../../../helper";
import { authApi } from "../../../API/authApi";
import { Menu, MyInfoType } from "../../../interface";

type HomeMenuProps = {
  selectedMenu: Menu;
  onChangeMenu(menuId: Menu): void;
};

const HomeMenu: FC<HomeMenuProps> = ({ onChangeMenu, selectedMenu }) => {
  // const { myInfo, setMyInfo } = useAuthContext();
  const [myInfo, setMyInfo] = useState<MyInfoType>();
  const navigate = useNavigate();

  useEffect(() => {
    // update my info

    let token = getMyToken() ?? "";
    authApi.getMyInfo(token).then((res) => {
      setMyInfo({
        classes: res?.user.classes ?? [],
        email: res?.user.email ?? "",
        id: res?.user._id ?? "",
        name: res?.user.name ?? "",
        password: res?.user.password ?? "",
        token: token ?? "",
      });
    });
  }, []);

  return (
    <div className={styles.homeMenu}>
      <div className={styles.title}>{myInfo?.name}님, 환영합니다!</div>
      <div className={styles.menuBox}>
        <div
          className={styles.menu}
          onClick={() => {
            onChangeMenu(Menu.ManagementProject);
            navigate("/manageproject");
          }}>
          Projects
        </div>
        <div
          className={styles.menu}
          onClick={() => {
            onChangeMenu(Menu.Activity);
            navigate("/mypage");
          }}>
          My Page
        </div>
        <div
          className={styles.menu}
          onClick={() => {
            navigate("/whatismerge");
          }}>
          How to use merge
        </div>
      </div>
    </div>
  );
};

export default HomeMenu;
