import React, { FC, useEffect, useState } from "react";
import styles from "./ActivityManage.module.scss";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../Context/UnicoopContext";
import { NewClassType, QuestionType } from "../../../interface";
import dayjs from "dayjs";
import { hostApi } from "../../../API/hostApi";
import { guestApi } from "../../../API/guestApi";

type ActivityManageProps = {
  data?: NewClassType;
};
const ActivityManage: FC<ActivityManageProps> = ({ data }) => {
  const { projectId } = useParams();
  const [isOptimal, setIsOptimal] = useState<boolean>(true);
  const { myInfo, setMyInfo } = useAuthContext();
  const [result, setResult] = useState<string>("결과!");
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const onClickButton = () => {
    hostApi
      .formTeam(myInfo?.token ?? "", projectId ?? "", isOptimal)
      .then((res) => {
        console.log(res);
      });
    setIsOptimal(false);
    guestApi.getQuestions(projectId ?? "").then((res) => {
      console.log(res.filteredQuestions);
      setQuestions(res.filteredQuestions);
    });
  };
  console.log("아이디", data, projectId);

  useEffect(() => {
    console.log(myInfo);
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
      <button className={styles.button} onClick={onClickButton}>
        지금 팀 생성하기
      </button>
      <div>{result}</div>
      {!isOptimal && (
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
      )}
    </div>
  );
};

export default ActivityManage;