import React, { useEffect, useState } from "react";
import styles from "./ActivityTeam.module.scss";
import { useAuthContext } from "../../../Context/UnicoopContext";
import { MyInfoType, NewClassType, TeamInfoType } from "../../../interface";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 가져오기
import { teamApi } from "../../../API/teamApi";
import Team from "../ActivityManage/Team";

type Props = {
  classData:
    | {
        targetClass: NewClassType;
      }
    | undefined;
};
const ActivityTeam = ({ classData }: Props) => {
  dayjs.extend(relativeTime);
  const { myInfo, setMyInfo } = useAuthContext();
  const [teamInfo, setTeamInfo] = useState<TeamInfoType>();

  useEffect(() => {
    // console.log("token", myInfo);
    // console.log("data", classData);

    teamApi.getClassTeams(classData?.targetClass._id ?? "").then((res) => {
      console.log("", res.teams);
      setTeamInfo(
        (res.teams as TeamInfoType[]).filter((team) =>
          team.contextByUser.map((u) => u.user).includes(myInfo?.id ?? "")
        )[0]
      );
    });
  }, []);
  // console.log("acitvity team", teamInfo);
  return (
    <div className={styles.activityTeam}>
      <div className={styles.title}>내 팀 정보</div>
      <Team data={teamInfo} projectInfo={classData?.targetClass} />
    </div>
  );
};

export default ActivityTeam;
