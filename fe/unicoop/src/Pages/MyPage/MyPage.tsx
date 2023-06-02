import React, { useEffect, useState } from "react";
import styles from "./MyPage.module.scss";
import { useAuthContext } from "../../Context/UnicoopContext";
import UnicoopButton from "../../Components/UnicoopButton/UnicoopButton";
import ViewProjects from "./ViewProjects/ViewProjects";
import EditProfile from "./EditProfile/EditProfile";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getMyToken } from "../../helper";
import { authApi } from "../../API/authApi";
import { MyInfoType } from "../../interface";

const MyPage = () => {
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState<MyInfoType>();
  // const { myInfo, setMyInfo } = useAuthContext();
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
        <div className={styles.hello}>{myInfo?.name}님, 안녕하세요!</div>
        <div className={styles.buttons}>
          <UnicoopButton
            backgroundColor={"#2c220d"}
            onClick={() => {
              setIsViewProject(true);
            }}>
            참여한 프로젝트 보기
          </UnicoopButton>
          <UnicoopButton
            backgroundColor={"darkGreen"}
            onClick={() => {
              setIsViewProject(false);
            }}>
            회원 정보 수정
          </UnicoopButton>
        </div>
      </div>
      <div className={styles.body}>
        {isViewProject ? <ViewProjects /> : <EditProfile />}
      </div>
      <div
        className={styles.project}
        onClick={() => {
          navigate("/manageproject");
        }}>
        <ArrowForward />
        Go to Projects
      </div>
    </div>
  );
};

export default MyPage;
