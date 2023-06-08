import React, { FC, useEffect, useState } from "react";
import styles from "./ActivityManage.module.scss";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../Context/UnicoopContext";
import { NewClassType, QuestionType, TeamInfoType } from "../../../interface";
import dayjs from "dayjs";
import { hostApi } from "../../../API/hostApi";
import { guestApi } from "../../../API/guestApi";
import { teamApi } from "../../../API/teamApi";
import Team from "./Team";

type ActivityManageProps = {
  data?: NewClassType;
};
const ActivityManage: FC<ActivityManageProps> = ({ data }) => {
  const { projectId } = useParams();
  const { myInfo, setMyInfo } = useAuthContext();
  const [result, setResult] = useState<TeamInfoType[]>([]);
  const [teamFormButton, setTeamFormButton] = useState<boolean>(false);

  const onClickButton = () => {
    // 팀 빌딩하고
    hostApi.formTeam(myInfo?.token ?? "", projectId ?? "").then((res) => {
      console.log(res);
      teamApi.getClassTeams(projectId ?? "").then((res) => {
        console.log("activit team", res.teams);
        setTeamFormButton(false);
      });
    });
  };

  useEffect(() => {
    console.log("아이디", result.length, projectId, myInfo?.token);
    teamApi.getClassTeams(projectId ?? "").then((res) => {
      console.log("activit team", res.teams);

      if (res.teams.length === 0) {
        setTeamFormButton(true);
      } else {
        setResult(res.teams as TeamInfoType[]);
        setTeamFormButton(false);
      }
    });
  }, []);

  return (
    <div className={styles.activity_manage}>
      <div className={styles.title}>팀 관리</div>
      <div className={styles.class_semester}>
        모집 기간: {dayjs(data?.recruitStartDate).format("MM/DD")} -{" "}
        {dayjs(data?.recruitEndDate).format("MM/DD")}
      </div>
      <div className={styles.class_semester}>
        활동 기간: {dayjs(data?.activityStartDate).format("MM/DD")} -{" "}
        {dayjs(data?.activityEndDate).format("MM/DD")}
      </div>
      {teamFormButton && (
        <button className={styles.button} onClick={onClickButton}>
          지금 팀 생성하기
        </button>
      )}
      <div>팀 정보</div>
      <div>
        {result.map((teamInfo) => {
          return (
            <Team key={`${teamInfo._id}`} data={teamInfo} projectInfo={data} />
          );
        })}
      </div>
    </div>
  );
};

export default ActivityManage;
