import React, { FC, useEffect, useState } from "react";
import styles from "./MyPage.module.scss";
import MergeButton from "../../Components/MergeButton/MergeButton";
import ViewProjects from "./ViewProjects/ViewProjects";
import EditProfile from "./EditProfile/EditProfile";
import { useNavigate } from "react-router-dom";
import { getMyToken } from "../../helper";
import { authApi } from "../../API/authApi";
import { ArrowForward } from "@mui/icons-material";
import { Menu, MyInfoType } from "../../interface";

type MyPageProps = {
  onChangeMenu(menuId: Menu): void;
};

const MyPage: FC<MyPageProps> = ({ onChangeMenu }) => {
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState<MyInfoType>();
  const [isViewProject, setIsViewProject] = useState<boolean>(true);

  useEffect(() => {
    // update my info
    let token = getMyToken() ?? "";
    authApi.getMyInfo(token).then((res) => {
      console.log("정보 가져옴", res);
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
    <div className={styles.myPage}>
      <div className={styles.header}>
        <div className={styles.hello}>{myInfo?.name} 님의 My Page</div>
        <div className={styles.buttons}>
          <MergeButton
            backgroundColor={"#609966"}
            onClick={() => {
              setIsViewProject(true);
            }}
          >
            참여한 프로젝트 보기
          </MergeButton>
          <MergeButton
            onClick={() => {
              setIsViewProject(false);
            }}
          >
            회원 정보 수정
          </MergeButton>
        </div>
      </div>

      <div className={styles.body}>
        {isViewProject ? <ViewProjects /> : <EditProfile />}
      </div>

      <div
        className={styles.project}
        onClick={() => {
          onChangeMenu(Menu.ManagementProject);
          navigate("/manageproject");
        }}
      >
        <ArrowForward />
        Go to Projects
      </div>
    </div>
  );
};

export default MyPage;
