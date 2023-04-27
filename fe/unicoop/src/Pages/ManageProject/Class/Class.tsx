import React, { FC } from "react";
import styles from "./Class.module.scss";
import { ClassType } from "../../../interface";
import { parseSemesterFromStartDate } from "../../../helper";
import EditIcon from "@mui/icons-material/Edit";

type ClassProps = {
  classInfo: ClassType;
  order: number;
  onClickClass(classId?: string): void;
};

const Class: FC<ClassProps> = ({ classInfo, order, onClickClass }) => {
  const color = [
    "#98c4cb",
    "#5f634f",
    "#cfebdf",
    "#358641",
    "#dbd2e0",
    "#f3bfb3",
    "#f7e5b7",
    "#50b4db",
  ];
  const onClickBox = () => {
    onClickClass(classInfo.id);
  };
  return (
    <div className={styles.class_box} onClick={onClickBox}>
      <div
        className={styles.color_box}
        style={{ backgroundColor: `${color[order]}` }}>
        <EditIcon />
      </div>
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
