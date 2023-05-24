import React, { useEffect } from "react";
import styles from "./ActivityTeam.module.scss";
import { useAuthContext } from "../../../Context/UnicoopContext";
import { NewClassType } from "../../../interface";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 가져오기

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

  useEffect(() => {
    console.log("token", myInfo?.token);
    console.log("data", classData);
  }, []);

  return (
    <div className={styles.activityTeam}>
      <div className={styles.title}>팀 정보</div>
      <div className={styles.body}>
        <div className={styles.name}>{`프로젝트 이름 : ${
          classData?.targetClass.className ?? ""
        }`}</div>
        <div className={styles.name}>{`프로젝트 유형 : ${
          classData?.targetClass.classType ?? ""
        }`}</div>
        <div className={styles.name}>{`프로젝트 설명 : ${
          classData?.targetClass.classDescription ?? ""
        }`}</div>
        {classData?.targetClass.isSecret && (
          <div className={styles.name}>{`입장 코드 : ${
            classData?.targetClass.accessKey ?? ""
          }`}</div>
        )}
        <div className={styles.members}>{`호스트 ${
          classData?.targetClass.isHostParticipating ? "참여함" : "참여 안 함"
        }`}</div>
        <div className={styles.leader}>{`리크루팅 시작일 : ${
          dayjs(classData?.targetClass.recruitStartDate).format(
            "YYYY년 MM월 DD일"
          ) ?? ""
        }`}</div>
        <div className={styles.leader}>
          {`리크루팅 종료일 : ${
            dayjs(classData?.targetClass.recruitEndDate).format(
              "YYYY년 MM월 DD일"
            ) ?? ""
          } **${dayjs().to(
            dayjs(classData?.targetClass.recruitEndDate).format("YYYY-MM-DD")
          )}**`}
        </div>
        <div className={styles.leader}>{`프로젝트 시작일 : ${
          dayjs(classData?.targetClass.activityStartDate).format(
            "YYYY년 MM월 DD일"
          ) ?? ""
        }`}</div>
        <div className={styles.leader}>
          {`프로젝트 종료일 : ${
            dayjs(classData?.targetClass.activityEndDate).format(
              "YYYY년 MM월 DD일"
            ) ?? ""
          } **${
            dayjs().to(
              dayjs(classData?.targetClass.activityEndDate).format("YYYY-MM-DD")
            ) ?? ""
          }**`}
        </div>
        <div className={styles.leader}>
          {classData?.targetClass.positionTypes.map((data, index) => {
            return (
              <div>{`포지션 ${index + 1} : ${data} ${
                classData?.targetClass.positionComposition[index]
              }명`}</div>
            );
          })}
        </div>
        <div className={styles.name}>{`질문 정보`}</div>
        <div className={styles.name}>{`참여자 정보`}</div>
        <div className={styles.name}>{`팀 정보`}</div>
      </div>
    </div>
  );
};

export default ActivityTeam;
