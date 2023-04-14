import React, { useState } from "react";
import styles from "./MyPage.module.scss";
import { useAuthContext } from "../../Context/UnicoopContext";
import UnicoopButton from "../../Components/UnicoopButton/UnicoopButton";
import ViewProjects from "./ViewProjects/ViewProjects";
import EditProfile from "./EditProfile/EditProfile";

const MyPage = () => {
  const userInfoHandle = useAuthContext();
  const [isViewProject, setIsViewProject] = useState<boolean>(true);

  return (
    <div className={styles.myPage}>
      <div className={styles.header}>
        <div className={styles.hello}>
          {userInfoHandle.myInfo?.name}님, 안녕하세요!
        </div>
        <div className={styles.buttons}>
          <UnicoopButton
            onClick={() => {
              setIsViewProject(true);
            }}
          >
            참여한 프로젝트 보기
          </UnicoopButton>
          <UnicoopButton
            onClick={() => {
              setIsViewProject(false);
            }}
          >
            회원 정보 수정
          </UnicoopButton>
        </div>
      </div>
      <div className={styles.body}>
        {isViewProject ? <ViewProjects /> : <EditProfile />}
      </div>
    </div>
  );
};

export default MyPage;
