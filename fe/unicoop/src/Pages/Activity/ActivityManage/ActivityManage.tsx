import React, { FC, useEffect, useState } from "react";
import styles from "./ActivityManage.module.scss";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../Context/UnicoopContext";
import { NewClassType, TeamInfoType } from "../../../interface";
import dayjs from "dayjs";
import { hostApi } from "../../../API/hostApi";
import { teamApi } from "../../../API/teamApi";
import Team from "./Team";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 가져오기
import { viewToastSuccess } from "../../../helper";

type ActivityManageProps = {
  data?: NewClassType;
};
const ActivityManage: FC<ActivityManageProps> = ({ data }) => {
  dayjs.extend(relativeTime);
  const { projectId } = useParams();
  const { myInfo, setMyInfo } = useAuthContext();
  const [result, setResult] = useState<TeamInfoType[]>([]);
  const [teamFormButton, setTeamFormButton] = useState<boolean>(false);

  const onClickButton = () => {
    // 팀 빌딩하고
    hostApi.formTeam(myInfo?.token ?? "", projectId ?? "").then((res) => {
      viewToastSuccess(res);
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
      <div className={styles.title}>프로젝트 정보</div>
      <div className={styles.project_info}>
        <div className={styles.name}>{`프로젝트 이름 : ${
          data?.className ?? ""
        }`}</div>
        <div className={styles.name}>{`프로젝트 유형 : ${
          data?.classType ?? ""
        }`}</div>
        <div className={styles.name}>{`프로젝트 설명 : ${
          data?.classDescription ?? ""
        }`}</div>
        {data?.isSecret && (
          <div className={styles.name}>{`입장 코드 : ${
            data?.accessKey ?? ""
          }`}</div>
        )}
        <div className={styles.members}>{`호스트 ${
          data?.isHostParticipating ? "참여함" : "참여 안 함"
        }`}</div>
        <div className={styles.leader}>{`리크루팅 시작일 : ${
          dayjs(data?.recruitStartDate).format("YYYY년 MM월 DD일") ?? ""
        }`}</div>
        <div className={styles.leader}>
          {`리크루팅 종료일 : ${
            dayjs(data?.recruitEndDate).format("YYYY년 MM월 DD일") ?? ""
          } **${dayjs().to(
            dayjs(data?.recruitEndDate).format("YYYY-MM-DD")
          )}**`}
        </div>
        <div className={styles.leader}>{`프로젝트 시작일 : ${
          dayjs(data?.activityStartDate).format("YYYY년 MM월 DD일") ?? ""
        }`}</div>
        <div className={styles.leader}>
          {`프로젝트 종료일 : ${
            dayjs(data?.activityEndDate).format("YYYY년 MM월 DD일") ?? ""
          } **${
            dayjs().to(dayjs(data?.activityEndDate).format("YYYY-MM-DD")) ?? ""
          }**`}
        </div>
        <div className={styles.leader}>
          {data?.positionTypes.map((p, index) => {
            return (
              <div>{`포지션 ${index + 1} : ${p} ${
                data?.positionComposition[index]
              }명`}</div>
            );
          })}
        </div>
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
      </div>

      <div className={styles.title}>팀 정보</div>
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
