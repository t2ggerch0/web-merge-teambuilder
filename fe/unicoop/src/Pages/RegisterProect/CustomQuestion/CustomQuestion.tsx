import React, { FC, useEffect } from "react";
import styles from "./CustomQuestion.module.scss";
import { QuestionType, ScoringType } from "../../../interface";
import Tooltip from "@mui/material/Tooltip";

type CustomQuestionProps = {
  defaultQuestionLength: number;
  data: QuestionType[];
  onChangeData(newData: QuestionType): void;
  onAddNewData(): void;
  onAddNewOption({
    answer,
    questionId,
  }: {
    answer: string;
    questionId: string;
  }): void;
  onDeleteData(dataId: string): void;
};

const CustomQuestion: FC<CustomQuestionProps> = ({
  defaultQuestionLength,
  data,
  onChangeData,
  onAddNewData,
  onAddNewOption,
  onDeleteData,
}) => {
  return (
    <div className={styles.custom_questions}>
      <div className={styles.custom_questions_title}>
        <div>팀 빌딩에 참고할 학생들의 정보를 추가할 수 있습니다</div>
        <div className={styles.add_question_button} onClick={onAddNewData}>
          + 추가하기
        </div>
      </div>
      <div className={styles.custom_questions_wrapper}>
        {data.map((item, index) => {
          return (
            <div key={`q_${index}`} className={styles.question_wrapper}>
              <div>
                <div className={styles.question_row}>
                  <div className={styles.question_title}>
                    <div className={styles.question_title_info}>
                      <div className={styles.question_index_text}>
                        {`질문 ${defaultQuestionLength + index + 1}`}
                      </div>
                      <Tooltip
                        placement="top"
                        title="학생들이 해당 질문에 필수적으로 답을 해야 하는지를 의미합니다."
                        arrow>
                        <div className={styles.is_mandatory}>
                          <span>필수</span>
                          <input
                            className={styles.is_mandatory_input}
                            type="checkbox"
                            checked={item.isMandatory}
                            onChange={(e) => {
                              onChangeData({
                                ...item,
                                isMandatory: e.target.checked,
                              });
                            }}
                          />
                        </div>
                      </Tooltip>
                    </div>
                    <input
                      className={styles.question_content}
                      value={item.title}
                      placeholder="질문을 입력하세요"
                      onChange={(e) => {
                        onChangeData({
                          ...item,
                          title: e.target.value,
                        });
                      }}
                    />

                    <div className={styles.count_score_container}>
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
                              onChangeData({
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
                              onChangeData({
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
                            value={item.weight.toString()}
                            onChange={(e) => {
                              onChangeData({
                                ...item,
                                weight: Number(e.target.value),
                              });
                            }}
                          />
                        </div>
                      </Tooltip>
                    </div>
                    <div
                      className={styles.delete_question}
                      onClick={() => onDeleteData(item.id)}>
                      질문 삭제하기
                    </div>
                  </div>
                </div>
                <div className={styles.question_answers}>
                  {item.options.map((option, option_index) => {
                    return (
                      <div className={styles.answer_wrapper}>
                        <input
                          key={`q_${index}`}
                          className={styles.answer}
                          placeholder="예시답안을 입력하세요"
                          value={option}
                          onChange={(e) => {
                            onChangeData({
                              ...item,
                              options: item.options.map((option, idx) => {
                                if (idx === option_index) return e.target.value;
                                else {
                                  return option;
                                }
                              }),
                            });
                          }}
                        />
                        <span
                          className={styles.cancel}
                          onClick={() => {
                            onChangeData({
                              ...item,
                              options: item.options.filter((o) => o !== option),
                            });
                          }}>
                          X
                        </span>
                      </div>
                    );
                  })}
                  <div
                    className={styles.add_answer_option_button}
                    onClick={(e) => {
                      onAddNewOption({
                        answer: "",
                        questionId: item.id,
                      });
                    }}>
                    + 답 추가하기
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomQuestion;
