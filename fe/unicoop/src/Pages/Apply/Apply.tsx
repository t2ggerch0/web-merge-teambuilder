import React from "react";
import styles from "./Apply.module.scss";
import OptionRadios from "../../Components/OptionRadios/OptionRadios";
import useSWR, { mutate } from "swr";
import { swrFetcher } from "../../API/api";
import { QuestionType } from "../../interface";
import Loader from "../../Components/Loader/Loader";
import { viewToastError } from "../../helper";

const Apply = () => {
  const { data, error, isValidating } = useSWR<Array<QuestionType>>(
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
  }

  const onChange = (name: string, value: string) => {};

  return (
    <div className={styles.apply}>
      <OptionRadios
        title={"t"}
        subtitle={"s"}
        name={"n"}
        isHorizontal={true}
        options={["1", "2"]}
        checkedValue={"1"}
        onChange={onChange}
      />
    </div>
  );
};

export default Apply;
