import React, { useEffect, useState } from "react";
import styles from "./Apply.module.scss";
import useSWR from "swr";
import { authApi, swrFetcher } from "../../API/authApi";
import { viewToastError } from "../../helper";
import { useParams } from "react-router-dom";
import { NewClassType, QuestionType } from "../../interface";
import OptionRadios from "../../Components/OptionRadios/OptionRadios";
import Loader from "../../Components/Loader/Loader";
import UnicoopButton from "../../Components/UnicoopButton/UnicoopButton";
import { guestApi } from "../../API/guestApi";
import dayjs from "dayjs";
import { useAuthContext } from "../../Context/UnicoopContext";

const Apply = () => {
  const { projectId, accessKey } = useParams();
  const [data, setData] = useState<QuestionType[]>([]);
  const [classInfo, setClassInfo] = useState<NewClassType>();
  const { myInfo, setMyInfo } = useAuthContext();
  const [position, setPosition] = useState<number>(0);

  const [answers, setAnswers] = useState<
    Array<{ questionId: string; answer: number }>
  >([]);

  const onClickJoinClassButton = () => {
    console.log(answers.map((item) => typeof item.questionId));

    guestApi.joinClass(
      {
        accessKey: parseInt(accessKey ?? "0"),
        answers: answers.map((item) => {
          return {
            questionId: item.questionId.toString(),
            answer: item.answer,
          };
        }),
        classId: projectId ?? "",
        position: classInfo?.positionTypes[position] ?? "",
      },
      myInfo?.token ?? ""
    );
  };

  useEffect(() => {
    guestApi.getQuestions(projectId ?? "").then((res) => {
      console.log(res.filteredQuestions);
      setData(res.filteredQuestions);
      setAnswers(
        res.filteredQuestions.map((item: any) => {
          return {
            questionId: item.id,
            answer: 0,
          };
        })
      );
    });
    guestApi.getClass(projectId ?? "").then((res) => {
      console.log(res.targetClass);
      setClassInfo(res.targetClass);
    });
  }, []);

  return (
    <div className={styles.apply}>
      <div className={styles.header}>
        <div className={styles.title}>{classInfo?.className}</div>
        <div className={styles.subtitle}>
          {`[${classInfo?.classType}] ${classInfo?.classDescription}`}
        </div>
        <div>
          모집 기간 {dayjs(classInfo?.recruitStartDate).format("YYYY-MM-DD")}~
          {dayjs(classInfo?.recruitEndDate).format("YYYY-MM-DD")}
        </div>
        <div>
          활동 기간 {dayjs(classInfo?.activityStartDate).format("YYYY-MM-DD")}~
          {dayjs(classInfo?.activityEndDate).format("YYYY-MM-DD")}
        </div>
        <div>
          모집 포지션{" "}
          {classInfo?.positionTypes.map((pos, index) => {
            return `${pos} ${classInfo?.positionComposition[index]}명\t`;
          })}
        </div>
      </div>

      <div className={styles.questions}>
        <OptionRadios
          checkedOption={position}
          isHorizontal
          name="position"
          onChange={(e) => {}}
          options={classInfo?.positionTypes ?? [""]}
          setCheckedOption={(e) => {
            setPosition(e);
          }}
          subtitle=""
          title="포지션"
        />
        {data.map((q, index) => (
          <OptionRadios
            title={q.title}
            subtitle={""}
            name={q.title}
            isHorizontal={true}
            options={q.options}
            checkedOption={answers[index].answer}
            setCheckedOption={(e) => {
              const newOptions = answers.slice();
              newOptions[index].answer = e;
              setAnswers(newOptions);
            }}
            onChange={(e) => {}}
          />
        ))}
      </div>
      <div className={styles.button}>
        <UnicoopButton
          width={300}
          backgroundColor={"darkBlue"}
          onClick={onClickJoinClassButton}>
          제출
        </UnicoopButton>
      </div>
    </div>
  );
};

export default Apply;
