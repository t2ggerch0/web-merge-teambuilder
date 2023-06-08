import React, { useEffect, useState } from "react";
import styles from "./ViewProjects.module.scss";
import dayjs from "dayjs";
import MergeButton from "../../../Components/MergeButton/MergeButton";
import { useAuthContext } from "../../../Context/UnicoopContext";
import { NewClassType } from "../../../interface";
import { getMyToken } from "../../../helper";
import { authApi } from "../../../API/authApi";
import { hostApi } from "../../../API/hostApi";
import { guestApi } from "../../../API/guestApi";

const ViewProjects = () => {
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

  return (
    <div className={styles.viewProjects}>
      <div className={styles.title}>
        내 프로젝트 ({hostProjects.length + guestProjects.length})
      </div>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.from}>From</div>
          <div className={styles.to}>To</div>
          <div className={styles.projectName}>프로젝트명</div>
          <div className={styles.hostGuest}>참여 형태</div>
          <div className={styles.role}>역할</div>
        </div>
        {hostProjects.map((project) => (
          <div className={styles.body}>
            <div className={styles.from}>
              {dayjs(project.activityStartDate).format("YYYY/MM/DD")}
            </div>
            <div className={styles.to}>
              {dayjs(project.activityEndDate).format("YYYY/MM/DD")}
            </div>
            <div className={styles.projectName}>{project.className}</div>
            <div className={styles.hostGuest}>Host</div>
            <div className={styles.role}>Host</div>
          </div>
        ))}
        {guestProjects.map((project) => (
          <div className={styles.body}>
            <div className={styles.from}>
              {dayjs(project.activityStartDate).format("YYYY/MM/DD")}
            </div>
            <div className={styles.to}>
              {dayjs(project.activityEndDate).format("YYYY/MM/DD")}
            </div>
            <div className={styles.projectName}>{project.className}</div>
            <div className={styles.hostGuest}>Guest</div>
            <div className={styles.role}>Guest</div>
          </div>
        ))}
      </div>
      <div className={styles.buttons}>
        <MergeButton backgroundColor={"navy"} onClick={() => {}}>
          Share
        </MergeButton>
        <MergeButton backgroundColor={"red"} onClick={() => {}}>
          Export
        </MergeButton>
      </div>
    </div>
  );
};

export default ViewProjects;
