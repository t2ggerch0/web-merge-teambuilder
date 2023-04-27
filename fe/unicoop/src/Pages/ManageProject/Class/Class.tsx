import React, { FC } from "react";
import styles from "./Class.module.scss";
import { ClassType } from "../../../interface";
import { parseSemesterFromStartDate } from "../../../helper";

type ClassProps = {
  classInfo: ClassType;
  order: number;
};

const Class: FC<ClassProps> = ({ classInfo, order }) => {
  const color = ["#98c4cb", "#5f634f", "#cfebdf", "#358641d", "#273b09"];
  return (
    <div className={styles.class_box}>
      <div
        className={styles.color_box}
        style={{ backgroundColor: `${color[order]}` }}></div>
      <div className={styles.class_info}>
        <div className={styles.class_name} style={{ color: `${color[order]}` }}>
          {classInfo.name}
        </div>
        <div className={styles.class_semester}>
          {parseSemesterFromStartDate(classInfo.startDate)}
        </div>
      </div>
    </div>
  );
};

export default Class;
