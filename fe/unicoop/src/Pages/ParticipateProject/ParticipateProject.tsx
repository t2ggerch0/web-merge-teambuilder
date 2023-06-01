import React, { FC, useState, useEffect } from "react";
import styles from "./ParticipateProject.module.scss";
import Layout from "../../Components/Layout/Layout";
import { Menu, NewClassType } from "../../interface";
import ProjectBox from "../../Components/ProjectBox/ProjectBox";
import { guestApi } from "../../API/guestApi";
import { getMyToken } from "../../helper";
import { authApi } from "../../API/authApi";
import { useAuthContext } from "../../Context/UnicoopContext";

type ParticipateProjectProps = {
  selectedMenu: Menu;
  onChangeMenu(menuId: Menu): void;
};

const ParticipateProject: FC<ParticipateProjectProps> = ({
  onChangeMenu,
  selectedMenu,
}) => {
  const [projects, setProjects] = useState<Array<NewClassType>>([]);
  const { myInfo, setMyInfo } = useAuthContext();
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

    guestApi.getAllClasses().then((res) => {
      console.log("classes", res);
      setProjects(res.classes);
    });
  }, []);
  return (
    <Layout
      pageTitle="프로젝트 참여"
      selectedMenu={selectedMenu}
      onChangeMenu={onChangeMenu}>
      <div className={styles.container}>
        <div className={styles.class_container}>
          <div className={styles.title}>전체 프로젝트</div>
          <div className={styles.class_wrapper}>
            {projects.map((project) => (
              <ProjectBox
                projectInfo={project}
                withAccessKey={false}
                isHost={false}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ParticipateProject;
