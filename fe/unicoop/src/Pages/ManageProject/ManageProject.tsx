import React, { FC, useEffect, useState } from "react";
import styles from "./ManageProject.module.scss";
import Layout from "../../Components/Layout/Layout";
import ProjectBox from "../../Components/ProjectBox/ProjectBox";
import { useAuthContext } from "../../Context/UnicoopContext";
import { hostApi } from "../../API/hostApi";
import { guestApi } from "../../API/guestApi";
import { Menu, NewClassType } from "../../interface";

type ManageProjectProps = {
  selectedMenu: Menu;
  onChangeMenu(menuId: Menu): void;
};

const ManageProject: FC<ManageProjectProps> = ({
  selectedMenu,
  onChangeMenu,
}) => {
  const [isPopOn, setIsPopOn] = useState<boolean>(false);
  const { myInfo, setMyInfo } = useAuthContext();
  const [hostProjects, setHostProjects] = useState<Array<NewClassType>>([]);
  const [guestProjects, setGuestProjects] = useState<Array<NewClassType>>([]);

  useEffect(() => {
    hostApi.getHostClass(myInfo?.token ?? "").then((res) => {
      console.log("host class", res.hostClasses);
      setHostProjects(res.hostClasses);
    });
    guestApi.getGuestClass(myInfo?.token ?? "").then((res) => {
      console.log("guest class", res.guestClasses);
      setGuestProjects(res.guestClasses);
    });
  }, []);

  const onClickModal = () => {
    setIsPopOn(!isPopOn);
  };

  return (
    <Layout
      pageTitle={"프로젝트 관리"}
      selectedMenu={selectedMenu}
      onChangeMenu={onChangeMenu}
    >
      <div className={styles.container}>
        <div className={styles.btn_wrapper}>
          <button className={styles.btn} onClick={onClickModal}>
            프로젝트 입장하기
          </button>
        </div>

        <div className={styles.class_container}>
          <div className={styles.title}>내가 호스트인 프로젝트</div>
          <div className={styles.class_wrapper}>
            {hostProjects.map((project) => (
              <ProjectBox projectInfo={project} />
            ))}
          </div>
          <div className={styles.title}>내가 게스트인 프로젝트</div>
          <div className={styles.class_wrapper}>
            {guestProjects.map((project, index) => (
              <ProjectBox projectInfo={project} />
            ))}
            {/*currentClass === undefined ? (
            classes.map((item, index) => (
              <Class
                key={`class_${item?._id}`}
                classInfo={item}
                order={index}
                onClickClass={onClickClass}
              />
            ))
          ) : (
            <EditProject
              classInfo={currentClass}
              onClickClass={onClickClass}
              onFinishEditQuestion={onFinishEditQuestion}
            />
          )*/}
          </div>
        </div>
        {/*<ProjectBox projectInfo={data.hostClasses[0]} />*/}
        {/*isPopOn && (
          <CodePopUp
            projectInfo={data.hostClasses[0] ?? {}}
            isPopOn={isPopOn}
            setIsPopOn={setIsPopOn}
          />
        )*/}
      </div>
    </Layout>
  );
};

export default ManageProject;
