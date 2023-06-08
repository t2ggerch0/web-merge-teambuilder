import React, { FC } from "react";
import styles from "./NavBar.module.scss";
import Logo from "../Logo/Logo";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/UnicoopContext";
import { viewToastInfo } from "../../helper";
import { Menu } from "../../interface";

type NavBarProps = {
  onChangeMenu(menuId: Menu): void;
};

const NavBar: FC<NavBarProps> = ({ onChangeMenu }) => {
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

  return (
    <div className={styles.navBar}>
      <div className={styles.leftContainer}>
        <Logo isClickable={true} />
        <div className={styles.menuBox}>
          <div
            className={styles.menu}
            onClick={() => {
              navigate("/whatismerge");
            }}
          >
            What Is merge?
          </div>
          {myInfo && (
            <div
              className={styles.menu}
              onClick={() => {
                onChangeMenu(Menu.ManagementProject);
                navigate("/manageproject");
              }}
            >
              프로젝트
            </div>
          )}
          {myInfo && (
            <div
              className={styles.menu}
              onClick={() => {
                navigate("/mypage");
              }}
            >
              My Page
            </div>
          )}
        </div>
      </div>

      <div className={styles.rightContainer}>
        {myInfo ? (
          <div className={styles.account} onClick={onClickLogout}>
            로그아웃
          </div>
        ) : (
          <div
            className={styles.account}
            onClick={() => {
              navigate("/signin");
            }}
          >
            로그인/회원가입
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
