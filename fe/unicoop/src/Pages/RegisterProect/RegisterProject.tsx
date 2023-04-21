import React, { FC, useState } from "react";
import styles from "./RegisterProject.module.scss";
import LabelInput from "../../Components/LabelInput/LabelInput";
import UnicoopButton from "../../Components/UnicoopButton/UnicoopButton";
import DatePicker from "react-datepicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { ko } from "date-fns/esm/locale";
import { QuestionType, ProjectRegisterInfo } from "../../interface";
import "react-datepicker/dist/react-datepicker.css";

type RegisterProjectProps = {};

const dummyQuestions: QuestionType[] = [
  {
    title: "이번 프로젝트 동안 AI와 관련된 주제를 다루고 싶나요?",
    answer: "",
    options: ["네", "아니오", "잘 모르겠습니다"],
  },
];

const RegisterProject: FC<RegisterProjectProps> = () => {
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
        className={styles.label}
        title="수업명"
        name="className"
        placeholder="수업명"
        width={500}
        value={className}
        onChange={onChange}
      />

      <LabelInput
        className={styles.label}
        title="정원"
        name="capacity"
        placeholder="00명"
        width={500}
        value={capacity}
        onChange={onChange}
      />

      <div className={styles.duration}>
        <span className={styles.duration_label}>기간</span>
        <div className={styles.datepicker_container}>
          <DatePicker
            className={styles.datepicker}
            locale={ko}
            dateFormat={"yyyy.MM.dd"}
            onChange={onChangeStartDate}
            selected={new Date(startDate)}
          />
        </div>
        <CalendarMonthIcon className={styles.calender} />
        <span className={styles.text}>~</span>
        <div className={styles.datepicker_container}>
          <DatePicker
            className={`${styles.datepicker} ${styles.datepicker_2}`}
            locale={ko}
            dateFormat={"yyyy.MM.dd"}
            selected={new Date(endDate)}
            onChange={onChangeEndDate}
          />
        </div>
        <CalendarMonthIcon className={styles.calender_2} />
      </div>

      <div className={styles.questions}>
        <div className={styles.question}>
          {dummyQuestions.map((item, index) => (
            <div>
              <div className={styles.question_title}>
                <div className={styles.question_index}>질문 {index + 1}</div>
                <div className={styles.question_content}>{item.title}</div>
                <input
                  className={styles.question_weight}
                  type="range"
                  value={50}
                />
              </div>
              <div className={styles.question_answers}>
                {item.options.map((option) => (
                  <div className={styles.answer}>
                    {option} <span className={styles.cancel}>X</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <UnicoopButton onClick={() => {}}>등록</UnicoopButton>
    </div>
  );
};

export default RegisterProject;
