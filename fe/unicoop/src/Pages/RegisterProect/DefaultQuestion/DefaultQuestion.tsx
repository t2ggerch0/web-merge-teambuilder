import React, { FC, useState, useEffect } from "react";
import styles from "./DefaultQuestion.module.scss";
import { Dayjs } from "dayjs";
import { QuestionType, questionLists } from "../../../interface";
import {
  getMyToken,
  parseTextFromOptions,
  viewToastError,
} from "../../../helper";
import { Delete } from "@mui/icons-material";

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
                onClick={() => onDeleteQuestion(item.id)}>
                <Delete />
              </div>
            </div>
            <div className={styles.question_answers}>
              {item.id === 2
                ? parseTextFromOptions(item.options as number[]).map(
                    (option, index) => {
                      return (
                        <div key={`q_${index}`} className={styles.answer}>
                          {option}
                        </div>
                      );
                    }
                  )
                : item.options.map((option, index) => {
                    return (
                      <div key={`q_${index}`} className={styles.answer}>
                        {option}
                      </div>
                    );
                  })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DefaultQuestion;
