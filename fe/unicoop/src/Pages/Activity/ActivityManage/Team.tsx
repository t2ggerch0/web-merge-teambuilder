import React, { FC, useEffect, useState } from "react";
import styles from "./Team.module.scss";
import { MatchingConditionId, TeamInfoType } from "../../../interface";

type TeamProps = {
  data: TeamInfoType;
};

const Team: FC<TeamProps> = ({ data }) => {
  const [condition, setCondition] = useState<string>("");

  useEffect(() => {
    if (data.condigionId === MatchingConditionId.MatchAll) {
      setCondition("모든 조건이 일치하는 팀입니다");
    } else if (data.condigionId === MatchingConditionId.MatchAllLower) {
      setCondition("모든 조건을 한 단계 완화했을 때 모두 일치하는 팀입니다.");
    } else if (data.condigionId === MatchingConditionId.MatchPE) {
      setCondition("선호 시간과 경험이 일치하는 팀입니다.");
    } else if (data.condigionId === MatchingConditionId.MatchPELower) {
      setCondition("선호 시간과 한 단계 완화한 경험이 일치하는 팀입니다.");
    } else if (data.condigionId === MatchingConditionId.MatchPS) {
      setCondition("선호 시간과 소요 시간이 일치하는 팀입니다.");
    } else if (data.condigionId === MatchingConditionId.MatchPSLower) {
      setCondition("선호 시간과 한 단계 완화한 소요 시간이 일치하는 팀입니다.");
    } else if (data.condigionId === MatchingConditionId.MatchES) {
      setCondition("경험과 소요 시간이 일치하는 팀입니다.");
    } else if (data.condigionId === MatchingConditionId.MatchESLoswer) {
      setCondition("경험과 한 단계 완화한 소요 시간이 일치하는 팀입니다.");
    } else if (data.condigionId === MatchingConditionId.MatchS) {
      setCondition("소요 시간이 일치하는 팀입니다.");
    } else if (data.condigionId === MatchingConditionId.MatchSLoswer) {
      setCondition("소요 시간을 한 단계 완화했을 때 일치하는 팀입니다.");
    } else if (data.condigionId === MatchingConditionId.MatchP) {
      setCondition("선호 시간이 일치하는 팀입니다.");
    } else if (data.condigionId === MatchingConditionId.MatchE) {
      setCondition("경험이 일치하는 팀입니다.");
    } else if (data.condigionId === MatchingConditionId.MatchELower) {
      setCondition("경험을 한 단계 완화했을 때 일치하는 팀입니다.");
    } else {
      setCondition("모든 조건이 일치하지 않아 랜덤으로 구성된 팀입니다.");
    }
  }, []);

  return (
    <div className={styles.team_container}>
      <div>팀 이름: {data.name}</div>
      <div>팀 빌딩 조건: {condition}</div>
    </div>
  );
};

export default Team;
