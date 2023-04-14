import React, { FC, useState } from "react";
import styles from "./RegisterProject.module.scss";
import LabelInput from "../../Components/LabelInput/LabelInput";
import { ProjectRegisterInfo } from "../../interface";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { QuestionType } from "../../interface";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

type RegisterProjectProps = {
  something: string;
};

const dummyQuestions: QuestionType[] = [
  {
    title: "이번 프로젝트 동안 AI와 관련된 주제를 다루고 싶나요?",
    answer: "",
    options: ["네", "아니오", "잘 모르겠습니다"],
  },
];

const RegisterProject: FC<RegisterProjectProps> = ({ something }) => {
  const [projectRegisterInfo, setProjectRegisterInfo] =
    useState<ProjectRegisterInfo>({
      capacity: 0,
      className: "",
      endDate: "2023.01.02",
      questions: [],
      startDate: "2023.01.01",
    });
  const { capacity, className, endDate, questions, startDate } =
    projectRegisterInfo;

  const onChangeStartDate = (date: Date) => {
    setProjectRegisterInfo({
      ...projectRegisterInfo,
      startDate: date.toISOString(),
    });
  };
  const onChangeEndDate = (date: Date) => {
    setProjectRegisterInfo({
      ...projectRegisterInfo,
      endDate: date.toISOString(),
    });
  };
  const onChange = (name: string, value: string) => {
    setProjectRegisterInfo({ ...projectRegisterInfo, [name]: value });
  };

  return (
    <div className={styles.container}>
      <LabelInput
        title="수업명"
        name="className"
        placeholder="수업명"
        value={className}
        onChange={onChange}
      />
      <LabelInput
        title="정원"
        name="capacity"
        placeholder="00명"
        value={capacity}
        onChange={onChange}
      />
      <div className={styles.duration}>
        기간
        <div>
          <DatePicker
            className={styles.datepicker}
            locale={ko}
            dateFormat={"yyyy.MM.dd"}
            onChange={onChangeStartDate}
            selected={new Date(startDate)}
          />
        </div>
        <CalendarMonthIcon />~
        <div>
          <DatePicker
            className={styles.datepicker}
            locale={ko}
            dateFormat={"yyyy.MM.dd"}
            selected={new Date(endDate)}
            onChange={onChangeEndDate}
          />
        </div>
      </div>
      <div className={styles.questions}>
        <div className={styles.question}>
          {dummyQuestions.map((item, index) => {
            return (
              <div>
                <div className={styles.question_title}>
                  <div>질문 {index + 1}</div>
                  <div>{item.title}</div>
                </div>
                <div className={styles.question_answers}>
                  {item.options.map((option) => {
                    return <div>{option}</div>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RegisterProject;
