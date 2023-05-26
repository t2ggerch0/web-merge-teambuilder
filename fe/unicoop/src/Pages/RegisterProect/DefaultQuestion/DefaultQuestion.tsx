import React, { FC, useState, useEffect } from "react";
import styles from "./DefaultQuestion.module.scss";
import { Dayjs } from "dayjs";
import { QuestionType } from "../../../interface";

type DefaultQuestionProps = {
  questionIds: number[];
  onChangeDefaultQuestionInfo({
    name,
    value,
  }: {
    name: string;
    value: string | number | string[] | number[] | Dayjs;
  }): void;
};

const questionLists = [
  {
    id: 0,
    title: "Coding Experience",
    options: ["0~1 yrs", "1~3 yrs", "3~5 yrs", "5~10 yrs", "10+ yrs"],
    weight: 5,
    countScore: "same",
  },
  {
    id: 1,
    title: "How much time to spend in a week?",
    options: ["0 - 10 hrs", "10+ hrs"],
    weight: 5,
    countScore: "same",
  },
  {
    id: 2,
    title: "Preferred Date and Time",
    options: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
    weight: 10,
    countScore: "same",
  },
  {
    id: 3,
    title: "Preferred Role",
    options: ["Leader", "Follower"],
    weight: 5,
    countScore: "different",
  },
];

const DefaultQuestion: FC<DefaultQuestionProps> = ({
  questionIds,
  onChangeDefaultQuestionInfo,
}: DefaultQuestionProps) => {
  const [data, setData] = useState<QuestionType[]>(questionLists);

  const onDeleteQuestion = (targetId: number) => {
    let newQuestionIds = questionIds.filter(
      (questionId) => questionId !== targetId
    );
    onChangeDefaultQuestionInfo({ name: "questionIds", value: newQuestionIds });
  };

  useEffect(() => {
    setData(
      questionLists.filter((question) => questionIds.includes(question.id))
    );
  }, [questionIds]);
  return (
    <div>
      <div className={styles.default_question}>
        {data.map((item, index) => (
          <div key={`q_${index}`} className={styles.question_wrapper}>
            <div className={styles.question_title}>
              <div className={styles.question_index}>질문 {index + 1}</div>
              <div className={styles.question_content}>{item.title}</div>
              <div
                className={styles.question_delete}
                onClick={() => onDeleteQuestion(item.id)}
              >
                삭제하기
              </div>
            </div>
            <div className={styles.question_answers}>
              {item.options.map((option, index) => (
                <div key={`q_${index}`} className={styles.answer}>
                  {option}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DefaultQuestion;
