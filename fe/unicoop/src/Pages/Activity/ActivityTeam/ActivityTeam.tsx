import React, { useEffect, useState } from "react";
import styles from "./ActivityTeam.module.scss";
import { useAuthContext } from "../../../Context/UnicoopContext";
import { MyInfoType, NewClassType } from "../../../interface";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 가져오기
import { teamApi } from "../../../API/teamApi";

type Props = {
  classData:
    | {
        targetClass: NewClassType;
      }
    | undefined;
};
const ActivityTeam = ({ classData }: Props) => {
  dayjs.extend(relativeTime);
  // const { myInfo, setMyInfo } = useAuthContext();
  const [myInfo, setMyInfo] = useState<MyInfoType>();

  useEffect(() => {
    console.log("token", myInfo?.token);
    console.log("data", classData);

    teamApi
      .getTeamInfo(classData?.targetClass._id ?? "", myInfo?.token ?? "")
      .then((res) => {
        console.log("activit team", res);
      });
  }, []);

  return (
    <div className={styles.activityTeam}>
      <div className={styles.title}>팀 정보</div>
      <div className={styles.body}>
        <div className={styles.name}>{`팀 정보`}</div>
      </div>
    </div>
  );
};

export default ActivityTeam;
