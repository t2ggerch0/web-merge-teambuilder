import React, { FC, useEffect, useState } from "react";
import styles from "./ActivityManage.module.scss";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../Context/UnicoopContext";
import { NewClassType, QuestionType } from "../../../interface";
import dayjs from "dayjs";
import { hostApi } from "../../../API/hostApi";
import { guestApi } from "../../../API/guestApi";
import { teamApi } from "../../../API/teamApi";

type ActivityManageProps = {
  data?: NewClassType;
};
const ActivityManage: FC<ActivityManageProps> = ({ data }) => {
  const { projectId } = useParams();
  const { myInfo, setMyInfo } = useAuthContext();
  const [result, setResult] = useState<string>("");
  const [teamFormButton, setTeamFormButton] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const onClickButton = () => {
    // 팀 빌딩하고
    hostApi.formTeam(myInfo?.token ?? "", projectId ?? "").then((res) => {
      console.log(res);
    });
    // guestApi.getQuestions(projectId ?? "").then((res) => {
    //   console.log(res.filteredQuestions);
    //   setQuestions(res.filteredQuestions);
    // });
  };

  useEffect(() => {
    console.log("아이디", result.length, projectId, myInfo?.token);
    teamApi.getClassTeams(projectId ?? "").then((res) => {
      console.log("activit team", res);

      if (res.teams.length === 0) {
        setTeamFormButton(true);
        setResult("팀 없음");
      } else {
        setTeamFormButton(false);
      }
    });

    // 팀 정보 불러오기
    // 에러나면 잽두기
    // 에러 안 나면 버튼 보이지 말고 정보 보여주기
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
      <div>{result}</div>
      {/* {!isOptimal && (
        <div>
          <div>질문을 삭제해보시겠어요?</div>
          <div>
            {questions.map((q) => {
              return (
                <div className={styles.questions}>
                  <div className={styles.question}>{q.title}</div>
                  <button className={styles.delete_button}>삭제</button>
                </div>
              );
            })}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ActivityManage;
