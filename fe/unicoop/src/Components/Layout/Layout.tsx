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
  const navigate = useNavigate();
  const { myInfo, setMyInfo } = useAuthContext();

  const onClickLogout = () => {
    window.localStorage.removeItem("token");
    viewToastInfo("로그아웃되었습니다.");
    setTimeout(() => {
      setMyInfo({
        classes: [],
        email: "",
        id: "",
        name: "",
        password: "",
        token: "",
      });
      navigate("/");
    }, 3000);
  };

  const onClickJoinProject = () => {
    onChangeMenu(Menu.JoinProject);
    navigate("/participateproject");
  };

  const onClickManageProject = () => {
    onChangeMenu(Menu.ManagementProject);
    navigate("/manageproject");
  };

  const onClickRegisterProject = () => {
    onChangeMenu(Menu.RegisterProject);
    navigate("/registerproject");
  };
  return (
    <div className={styles.container}>
      <div className={styles.left_bar}>
        <div className={styles.title}>UNICOOP</div>
        <div className={styles.menu}>
          <div
            className={`${styles.menu_item} ${
              selectedMenu === Menu.JoinProject && styles.selected
            }`}
            onClick={onClickJoinProject}>
            <span className={styles.text}>프로젝트 참여</span>
            {selectedMenu === Menu.JoinProject && (
              <div className={styles.circle} />
            )}
          </div>
          <div
            className={`${styles.menu_item} ${
              selectedMenu === Menu.ManagementProject && styles.selected
            }`}
            onClick={onClickManageProject}>
            <span className={styles.text}>프로젝트 관리</span>
            {selectedMenu === Menu.ManagementProject && (
              <div className={styles.circle} />
            )}
          </div>

          <div
            className={`${styles.menu_item} ${
              selectedMenu === Menu.RegisterProject && styles.selected
            }`}
            onClick={onClickRegisterProject}>
            <span className={styles.text}>프로젝트 등록</span>
            {selectedMenu === Menu.RegisterProject && (
              <div className={styles.circle} />
            )}
          </div>
        </div>
        <div
          className={styles.myPage}
          onClick={() => {
            navigate("/mypage");
          }}>
          Go to My Page
        </div>
      </div>

      <div className={styles.right_container}>
        <div className={styles.page_title}>
          <div>{pageTitle}</div>
          <div className={styles.user_menu}>
            <div>{`${myInfo?.name ?? ""} 님`}</div>

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
