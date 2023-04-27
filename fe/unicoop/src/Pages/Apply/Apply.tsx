import React from "react";
import styles from "./Apply.module.scss";
import OptionRadios from "../../Components/OptionRadios/OptionRadios";
/*import useSWR, { mutate } from "swr";
import { swrFetcher } from "../../API/api";
import { QuestionType } from "../../interface";
import Loader from "../../Components/Loader/Loader";
import { viewToastError } from "../../helper";*/
import UnicoopButton from "../../Components/UnicoopButton/UnicoopButton";

const Apply = () => {
  /*const { data, error, isValidating } = useSWR<Array<QuestionType>>(
    "/questions",
    swrFetcher,
    {
      revalidateOnFocus: false,
    }
  );
  if (!data || isValidating) {
    return <Loader />;
  }
  if (error) {
    viewToastError(error);
  }*/

  const onChange = (/*name: string, value: string*/) => {};

  return (
    <div className={styles.apply}>
      <div className={styles.header}>
        <div className={styles.title}>프로젝트 등록</div>
        <div className={styles.subtitle}>
          Capstone Project Spring (23/02/25 - 23/06/11)
        </div>
      </div>
      <div className={styles.questions}>
        <OptionRadios
          title={"1. Preferred method of communication"}
          subtitle={"팀 협업 시 선호하는 커뮤니케이션 방법은 무엇인가요?"}
          name={"communication"}
          isHorizontal={true}
          options={["대면", "비대면"]}
          checkedValue={"1"}
          onChange={onChange}
        />
        <OptionRadios
          title={"2. Time you are willing to dedicate to the project per week"}
          subtitle={"일주일에 몇 시간을 이번 팀 프로젝트에 사용하실 건가요?"}
          name={"time"}
          isHorizontal={true}
          options={["5시간 미만", "5-10시간", "10-15시간", "15시간 이상"]}
          checkedValue={"1"}
          onChange={onChange}
        />
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
