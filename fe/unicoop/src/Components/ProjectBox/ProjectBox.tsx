import React, { FC } from "react";
import styles from "./ProjectBox.module.scss";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import { NewClassType } from "../../interface";

type ProjectBoxProps = {
  projectInfo: NewClassType;
};

const ProjectBox: FC<ProjectBoxProps> = ({ projectInfo }) => {
  return (
    <div className={styles.projectBox}>
      <div className={styles.color_box}>
        <EditIcon />
      </div>
      <div className={styles.class_info}>
        <div className={styles.class_name}>{projectInfo.accessKey}</div>
        <div className={styles.class_semester}>
          {dayjs(projectInfo.activityStartDate).format("MM/DD")}
        </div>
      </div>
    </div>
  );
};

export default ProjectBox;
