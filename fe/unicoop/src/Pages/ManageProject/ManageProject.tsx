import React, { FC, useEffect, useState } from "react";
import styles from "./ManageProject.module.scss";
import Layout from "../../Components/Layout/Layout";
import ProjectBox from "../../Components/ProjectBox/ProjectBox";
import MergeButton from "../../Components/MergeButton/MergeButton";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/UnicoopContext";
import { getMyToken } from "../../helper";
import { hostApi } from "../../API/hostApi";
import { guestApi } from "../../API/guestApi";
import { authApi } from "../../API/authApi";
import { Menu, NewClassType } from "../../interface";

type ManageProjectProps = {
  selectedMenu: Menu;
  onChangeMenu(menuId: Menu): void;
};

const ManageProject: FC<ManageProjectProps> = ({
  selectedMenu,
  onChangeMenu,
}) => {
  const navigate = useNavigate();
  const { setMyInfo } = useAuthContext();

  const [hostProjects, setHostProjects] = useState<Array<NewClassType>>([]);
  const [guestProjects, setGuestProjects] = useState<Array<NewClassType>>([]);

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
    hostApi.getHostClass(token).then((res) => {
      console.log("host class", res.hostClasses);
      setHostProjects(res.hostClasses);
    });
    guestApi.getGuestClass(token).then((res) => {
      console.log("guest class", res.guestClasses);
      setGuestProjects(res.guestClasses);
    });
  }, []);

  const onClickRegisterProject = () => {
    onChangeMenu(Menu.RegisterProject);
    navigate("/registerproject");
  };

  const onClickJoinProject = () => {
    onChangeMenu(Menu.JoinProject);
    navigate("/participateproject");
  };

  return (
    <Layout
      pageTitle={"프로젝트 관리"}
      selectedMenu={selectedMenu}
      onChangeMenu={onChangeMenu}
    >
      <div className={styles.container}>
        <div className={styles.class_container}>
          <div className={styles.title}>내가 호스트인 프로젝트</div>
          <div className={styles.class_wrapper}>
            {hostProjects.length !== 0 ? (
              hostProjects.map((project) => (
                <ProjectBox projectInfo={project} isHost />
              ))
            ) : (
              <div className={styles.noClass}>
                <div className={styles.text}>아직 프로젝트가 없습니다.</div>
                <div className={styles.subtext}>
                  호스트가 되어 직접 팀을 등록해보세요!
                </div>
                <MergeButton onClick={onClickRegisterProject}>
                  지금 등록하기
                </MergeButton>
              </div>
            )}
          </div>
          <div className={styles.title}>내가 게스트인 프로젝트</div>
          <div className={styles.class_wrapper}>
            {guestProjects.length !== 0 ? (
              guestProjects.map((project, index) => (
                <ProjectBox
                  key={"projectBox" + index}
                  projectInfo={project}
                  isHost={false}
                />
              ))
            ) : (
              <div className={styles.noClass}>
                <div className={styles.text}>아직 프로젝트가 없습니다.</div>
                <div className={styles.subtext}>
                  지금 나에게 맞는 프로젝트를 찾아보세요!
                </div>
                <MergeButton onClick={onClickJoinProject}>
                  프로젝트 찾아보기
                </MergeButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProject;
