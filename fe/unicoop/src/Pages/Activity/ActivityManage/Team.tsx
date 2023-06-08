import React, { FC, useEffect, useState } from "react";
import styles from "./Team.module.scss";
import {
  MatchingConditionId,
  NewClassType,
  QuestionType,
  TeamInfoType,
} from "../../../interface";

type TeamProps = {
  data: TeamInfoType;
  projectInfo?: NewClassType;
};

const Team: FC<TeamProps> = ({ data, projectInfo }) => {
  const [condition, setCondition] = useState<string>("");
  const [positions, setPositions] = useState<string[]>([]);
  const [questionIds, setQuestionIds] = useState<number[]>([]);

  useEffect(() => {
    console.log("proejct Info", projectInfo);
    // get class question

    // get class position
    if (data.conditionId === MatchingConditionId.MatchAll) {
      setCondition("모든 조건이 일치하는 팀입니다");
    } else if (data.conditionId === MatchingConditionId.MatchAllLower) {
      setCondition("모든 조건을 한 단계 완화했을 때 모두 일치하는 팀입니다.");
    } else if (data.conditionId === MatchingConditionId.MatchPE) {
      setCondition("선호 시간과 경험이 일치하는 팀입니다.");
    } else if (data.conditionId === MatchingConditionId.MatchPELower) {
      setCondition("선호 시간과 한 단계 완화한 경험이 일치하는 팀입니다.");
    } else if (data.conditionId === MatchingConditionId.MatchPS) {
      setCondition("선호 시간과 소요 시간이 일치하는 팀입니다.");
    } else if (data.conditionId === MatchingConditionId.MatchPSLower) {
      setCondition("선호 시간과 한 단계 완화한 소요 시간이 일치하는 팀입니다.");
    } else if (data.conditionId === MatchingConditionId.MatchES) {
      setCondition("경험과 소요 시간이 일치하는 팀입니다.");
    } else if (data.conditionId === MatchingConditionId.MatchESLoswer) {
      setCondition("경험과 한 단계 완화한 소요 시간이 일치하는 팀입니다.");
    } else if (data.conditionId === MatchingConditionId.MatchS) {
      setCondition("소요 시간이 일치하는 팀입니다.");
    } else if (data.conditionId === MatchingConditionId.MatchSLoswer) {
      setCondition("소요 시간을 한 단계 완화했을 때 일치하는 팀입니다.");
    } else if (data.conditionId === MatchingConditionId.MatchP) {
      setCondition("선호 시간이 일치하는 팀입니다.");
    } else if (data.conditionId === MatchingConditionId.MatchE) {
      setCondition("경험이 일치하는 팀입니다.");
    } else if (data.conditionId === MatchingConditionId.MatchELower) {
      setCondition("경험을 한 단계 완화했을 때 일치하는 팀입니다.");
    } else {
      setCondition("모든 조건이 일치하지 않아 랜덤으로 구성된 팀입니다.");
    }
  }, []);

  return (
    <div className={styles.team_container}>
      <div>팀 이름: {data.name}</div>
      <div>팀 빌딩 조건: {condition}</div>
      <div>팀원</div>
      <div>
        {data.contextByUser.map((user, index) => {
          return (
            <div>
              {index + 1}. {user.name}
              {user.user === data.leader && " [리더]"}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Team;
