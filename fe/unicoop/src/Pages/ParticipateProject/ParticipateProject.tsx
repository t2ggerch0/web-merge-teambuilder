import React, { FC, useState, useEffect } from "react";
import styles from "./ParticipateProject.module.scss";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import Layout from "../../Components/Layout/Layout";
import ProjectBox from "../../Components/ProjectBox/ProjectBox";
import { getMyToken } from "../../helper";
import { guestApi } from "../../API/guestApi";
import { authApi } from "../../API/authApi";
import { Menu, NewClassType } from "../../interface";

type ParticipateProjectProps = {
  selectedMenu: Menu;
  onChangeMenu(menuId: Menu): void;
};

const ParticipateProject: FC<ParticipateProjectProps> = ({
  onChangeMenu,
  selectedMenu,
}) => {
  const [projects, setProjects] = useState<Array<NewClassType>>([]);

  useEffect(() => {
    onChangeMenu(Menu.JoinProject);
    let token = getMyToken() ?? "";
    authApi.getMyInfo(token).then();
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
          <div className={styles.title}>참여 가능한 프로젝트</div>
          <div className={styles.class_wrapper}>
            {projects
              .filter((project) =>
                dayjs().startOf("day").isBefore(project.recruitEndDate)
              )
              .map((projectInfo) => (
                <ProjectBox
                  projectInfo={projectInfo}
                  isHost={false}
                  withAccessKey={false}
                  isAfter={false}
                />
              ))}
          </div>
        </div>

        <div className={styles.class_container}>
          <div className={styles.title}>이미 종료된 프로젝트</div>
          <div className={styles.class_wrapper}>
            {projects
              .filter(
                (project) =>
                  !dayjs().startOf("day").isBefore(project.recruitEndDate)
              )
              .map((projectInfo) => (
                <ProjectBox
                  projectInfo={projectInfo}
                  isHost={false}
                  withAccessKey={false}
                  isAfter={true}
                />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ParticipateProject;
