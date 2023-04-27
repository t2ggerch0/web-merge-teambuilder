import React, { FC } from "react";
import styles from "./DefaultQuestion.module.scss";
import { QuestionType } from "../../../interface";
import Tooltip from "@mui/material/Tooltip";

type DefaultQuestionProps = {
  data: QuestionType[];
  onChangeDefaultQuestionInfo(newInfo: QuestionType): void;
};

const DefaultQuestion: FC<DefaultQuestionProps> = ({
  data,
  onChangeDefaultQuestionInfo,
}) => {
  return (
    <div>
      <div className={styles.default_question}>
        {data.map((item, index) => {
          return (
            <div key={`q_${index}`} className={styles.question_wrapper}>
              <div className={styles.question_title}>
                <div className={styles.question_index}>질문 {index + 1}</div>
                <div className={styles.question_content}>{item.title}</div>
                <div className={styles.score_type_container}>
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
          );
        })}
      </div>
    </div>
  );
};

export default DefaultQuestion;
