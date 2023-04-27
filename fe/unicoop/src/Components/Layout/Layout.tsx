import React, { FC, ReactNode } from "react";
import styles from "./Layout.module.scss";
import { useAuthContext } from "../../Context/UnicoopContext";
import { useNavigate } from "react-router-dom";
import { viewToastInfo } from "../../helper";
import { Menu } from "../../interface";

type LayoutProps = {
  children?: ReactNode;
  selectedMenu?: number;
  pageTitle?: string;
  onChangeMenu(menuId: Menu): void;
};

const Layout: FC<LayoutProps> = ({
  children,
  pageTitle = "page title",
  selectedMenu = 0,
  onChangeMenu,
}) => {
  const navigation = useNavigate();
  const userInfoHandle = useAuthContext();

  const onClickLogout = () => {
    window.localStorage.removeItem("token");
    viewToastInfo("로그아웃되었습니다.");
    setTimeout(() => {
      userInfoHandle.setMyInfo({
        classes: [],
        email: "",
        id: "",
        major: "",
        name: "",
        password: "",
        studentId: -1,
        token: "",
        userType: "",
      });
      navigation("/");
    }, 3000);
  };

  const onClickManageProject = () => {
    onChangeMenu(Menu.ManagementProject);
    navigation("/manageproject");
  };

  const onClickRegisterProject = () => {
    onChangeMenu(Menu.RegisterProject);
    navigation("/registerproject");
  };
  return (
    <div className={styles.container}>
      <div className={styles.left_bar}>
        <div className={styles.title}>Capstone Team F</div>
        <div className={styles.menu}>
          <div
            className={`${styles.menu_item} ${
              selectedMenu === Menu.ManagementProject &&
              styles.menu_item_selected
            }`}
            onClick={onClickManageProject}>
            프로젝트 관리
          </div>

          {userInfoHandle.myInfo?.userType === "professor" && (
            <div
              className={`${styles.menu_item} ${
                selectedMenu === Menu.RegisterProject &&
                styles.menu_item_selected
              }`}
              onClick={onClickRegisterProject}>
              프로젝트 등록
            </div>
          )}
        </div>
        <div className={styles.logo}>UNICOOP</div>
      </div>

      <div className={styles.right_container}>
        <div className={styles.page_title}>
          <div>{pageTitle}</div>
          <div className={styles.user_menu}>
            <div>{`${userInfoHandle.myInfo?.name ?? ""} 님`}</div>

            <div className={styles.logout} onClick={onClickLogout}>
              로그아웃
            </div>
          </div>
        </div>
        <div className={styles.page_content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
