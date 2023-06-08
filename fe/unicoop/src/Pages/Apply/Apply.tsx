import React, { useEffect, useState } from "react";
import styles from "./Apply.module.scss";
import useSWR from "swr";
import { authApi, swrFetcher } from "../../API/authApi";
import { getMyToken, parseTextFromOptions } from "../../helper";
import { useNavigate, useParams } from "react-router-dom";
import { Menu, NewClassType, QuestionType } from "../../interface";
import OptionRadios from "../../Components/OptionRadios/OptionRadios";
import Loader from "../../Components/Loader/Loader";
import MergeButton from "../../Components/MergeButton/MergeButton";
import { guestApi } from "../../API/guestApi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 가져오기
import { useAuthContext } from "../../Context/UnicoopContext";

type ApplyProps = {
  selectedMenu: Menu;
  onChangeMenu(menuId: Menu): void;
};

const Apply = ({ onChangeMenu, selectedMenu }: ApplyProps) => {
  const { projectId, accessKey } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<QuestionType[]>([]);

  // const [classInfo, setClassInfo] = useState<NewClassType>();
  const { myInfo, setMyInfo } = useAuthContext();
  const [position, setPosition] = useState<number>(0);

  const [answers, setAnswers] = useState<
    Array<{ questionId: string; answer: number }>
  >([]);
  const classInfo = useSWR<{
    targetClass: NewClassType;
  }>(`/class?classId=${projectId}`, swrFetcher)?.data?.targetClass;

  // const { data, error, isValidating } = useSWR<{
  //   filteredQuestions: Array<QuestionType>;
  // }>(`/question?classId=${projectId}`, swrFetcher);

  const onClickJoinClassButton = () => {
    console.log("clicked");
    guestApi
      .joinClass(
        {
          accessKey: accessKey ?? "0",
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
      )
      .then((res) => {
        console.log(res);
        if (res === 201) {
          onChangeMenu(Menu.JoinProject);
          navigate("../participateproject");
        }
      });
  };

  useEffect(() => {
    // update my info
    let token = getMyToken() ?? "";
    authApi.getMyInfo(token).then((res) => {
      setMyInfo({
        classes: res?.user.classes ?? [],
        email: res?.user.email ?? "",
        id: res?.user._id ?? "",
        name: res?.user.name ?? "",
        password: res?.user.password ?? "",
        token: token ?? "",
      });
    });

    if (projectId)
      guestApi.getQuestions(projectId).then((res) => {
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
  }, []);

  console.log("answer", answers);

  // if (!data || isValidating) {
  //   return <Loader />;
  // }
  // if (error) {
  //   viewToastError(error);
  // }
  //  else {
  //   if (data?.filteredQuestions) {
  //     setAnswers(
  //       data.filteredQuestions.map((item: any) => {
  //         return {
  //           questionId: item.id,
  //           answer: 0,
  //         };
  //       })
  //     );
  //   }
  // }

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
          options={classInfo?.positionTypes ?? [""]}
          setCheckedOption={(e) => {
            setPosition(e);
          }}
          subtitle=""
          title="포지션"
        />
        {data?.map((q, index) => (
          <OptionRadios
            title={q.title}
            subtitle={""}
            name={q.title}
            isHorizontal={true}
            options={
              q.id === 2
                ? parseTextFromOptions(q.options as number[])
                : q.options
            }
            checkedOption={answers[index]?.answer}
            setCheckedOption={(e) => {
              console.log(e, answers, index);
              answers[index].answer = e;
              setAnswers([...answers]);
            }}
          />
        ))}
      </div>
      <div className={styles.button}>
        <MergeButton width={300} onClick={onClickJoinClassButton}>
          제출하기
        </MergeButton>
      </div>
    </div>
  );
};

export default Apply;
