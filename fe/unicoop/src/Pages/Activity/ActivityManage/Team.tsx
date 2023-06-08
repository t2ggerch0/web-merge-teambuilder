import React, { FC, useEffect, useState } from "react";
import styles from "./Team.module.scss";
import {
  MatchingConditionId,
  NewClassType,
  QuestionType,
  TeamInfoType,
  questionLists,
} from "../../../interface";
import { parseTextFromOptions } from "../../../helper";

type TeamProps = {
  data: TeamInfoType;
  projectInfo?: NewClassType;
};

const Team: FC<TeamProps> = ({ data, projectInfo }) => {
  const [condition, setCondition] = useState<string>("");
  const positions = projectInfo?.positionTypes ?? [];
  const questions = questionLists.filter((q) =>
    (projectInfo?.questionIds ?? []).includes(q.id)
  );

  useEffect(() => {
    console.log("proejct Info", data);
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
      <div>조건: {condition}</div>
      <div>팀원</div>

      <div>
        <table align="center" width={"100%"} border={1}>
          <th style={{ width: "20px" }} align="center">
            이름
          </th>
          <th style={{ width: "10px" }} align="center">
            역할
          </th>
          <th style={{ width: "20px" }} align="center">
            포지션
          </th>
          <th style={{ width: "50px" }} align="center">
            코딩 경험(년)
          </th>
          <th style={{ width: "30px" }} align="center">
            투자 시간
          </th>
          <th style={{ width: "100px" }} align="center">
            선호 시간
          </th>
          <th style={{ width: "50px" }} align="center">
            선호 역할
          </th>
          {data.contextByUser.map((user, index) => {
            return (
              <tr>
                <td style={{ width: "20px" }} align="center">
                  {user.name}
                </td>
                <td style={{ width: "20px" }} align="center">
                  {user.user === data.leader ? "팀장" : "팀원"}
                </td>
                <td style={{ width: "20px" }} align="center">
                  {positions[user.positionIndex]}
                </td>
                <td style={{ width: "50px" }} align="center">
                  {questions[0].options[user.answer[0] as number]}
                </td>
                <td style={{ width: "30px" }} align="center">
                  {questions[1].options[user.answer[1] as number]}
                </td>
                <td style={{ width: "100px" }} align="left">
                  {parseTextFromOptions(
                    (questions[2].options as number[]).filter((o) =>
                      (user.answer[2] as number[]).includes(o)
                    )
                  ).join(", ")}
                </td>
                <td style={{ width: "50px" }} align="center">
                  {questions[3].options[user.answer[3] as number]}
                </td>
              </tr>
            );
          })}
          <tr></tr>
        </table>
      </div>
    </div>
  );
};

export default Team;
