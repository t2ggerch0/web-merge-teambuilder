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
    options: ["0~1", "1~3", "3~5", "5~10", "10+"],
    weight: 5,
    countScore: "same",
  },
  {
    id: 1,
    title: "How much time to spend?",
    options: ["Extrovert", "Introvert"],
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
        {data.map((item, index) => {
          return (
            <div key={`q_${index}`} className={styles.question_wrapper}>
              <div className={styles.question_title}>
                <div className={styles.question_index}>질문 {index + 1}</div>
                <div className={styles.question_content}>{item.title}</div>
                <div onClick={() => onDeleteQuestion(item.id)}>삭제하기</div>
                {/* <div className={styles.score_type_container}>
                  <Tooltip
                    placement="top"
                    title="서로 같은 응답을 한 경우에 점수를 부여합니다."
                    arrow>
                    <div>
                      <input
                        type="radio"
                        name={`q_${index}_score`}
                        value={"same"}
                        checked={item.countScore === "same"}
                        onChange={() => {
                          onChangeDefaultQuestionInfo({
                            ...item,
                            countScore: "same",
                          });
                        }}
                      />
                      <span>same</span>
                    </div>
                  </Tooltip>
                  <Tooltip
                    title="서로 다른 응답을 한 경우에 점수를 부여합니다."
                    arrow>
                    <div>
                      <input
                        type="radio"
                        name={`q_${index}_score`}
                        value={"different"}
                        checked={item.countScore === "different"}
                        onChange={() => {
                          onChangeDefaultQuestionInfo({
                            ...item,
                            countScore: "different",
                          });
                        }}
                      />
                      <span>different</span>
                    </div>
                  </Tooltip>
                </div>
                <div className={styles.weight}>
                  <Tooltip
                    placement="top"
                    title="해당 질문의 가중치를 결정합니다."
                    arrow>
                    <div>
                      <div>weight: {item.weight}</div>
                      <input
                        className={styles.question_weight}
                        type="range"
                        min={1}
                        max={5}
                        value={item.weight}
                        onChange={(e) => {
                          onChangeDefaultQuestionInfo({
                            ...item,
                            weight: parseInt(e.target.value),
                          });
                        }}
                      />
                    </div>
                  </Tooltip>
                </div> */}
              </div>
              <div className={styles.question_answers}>
                {item.options.map((option, index) => (
                  <div key={`q_${index}`} className={styles.answer}>
                    {option}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DefaultQuestion;
