import React, { useState } from "react";
import styles from "./Apply.module.scss";
import useSWR from "swr";
import { swrFetcher } from "../../API/authApi";
import { viewToastError } from "../../helper";
import { useParams } from "react-router-dom";
import { QuestionType } from "../../interface";
import OptionRadios from "../../Components/OptionRadios/OptionRadios";
import Loader from "../../Components/Loader/Loader";
import UnicoopButton from "../../Components/UnicoopButton/UnicoopButton";

const Apply = () => {
  const { projectId } = useParams();

  const [answers, setAnswers] = useState<
    Array<{ questionId: string; answer: number }>
  >([]);

  /*useEffect(() => {
    const data = authApi.getQuestions("645d16f0ecc97092d68543e2");
    console.log(data);
  }, []);*/
  const [checkedOptions, setCheckedOptions] = useState<Array<number>>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const { data, error, isValidating } = useSWR<{
    questions: Array<QuestionType>;
  }>(`/question?classId=${projectId}`, swrFetcher);
  if (!data || isValidating) {
    return <Loader />;
  }
  if (error) {
    viewToastError(error);
  }

  /*const data = {
    questions: [
      {
        _id: "a",
        id: 0,
        title: "exp",
        options: ["1 year", "2 years"],
        weight: 5,
        countScore: "same",
      },
      {
        _id: "b",
        id: 1,
        title: "time",
        options: ["1 hour", "3 hours"],
        weight: 3,
        countScore: "different",
      },
    ],
  };*/

  const onChange = (e: object) => {};

  return (
    <div className={styles.apply}>
      <div className={styles.header}>
        <div className={styles.title}>프로젝트 등록</div>
        <div className={styles.subtitle}>
          Capstone Project Spring (23/02/25 - 23/06/11)
        </div>
      </div>
      <div className={styles.questions}>
        {data.questions.map((q, index) => (
          <OptionRadios
            title={q.title}
            subtitle={""}
            name={q.title}
            isHorizontal={true}
            options={q.options}
            checkedOption={checkedOptions[index]}
            setCheckedOption={(e) => {
              const newOptions = checkedOptions.slice();
              newOptions[index] = e;
              setCheckedOptions(newOptions);
            }}
            onChange={onChange}
          />
        ))}
      </div>
      <div className={styles.button}>
        <UnicoopButton
          width={300}
          backgroundColor={"darkBlue"}
          onClick={() => {}}
        >
          제출
        </UnicoopButton>
      </div>
    </div>
  );
};

export default Apply;
