import React, { useState } from "react";
import styles from "./Activity.module.scss";
import useSWR from "swr";
import ActivitySidebar from "./ActivitySidebar/ActivitySidebar";
import ActivityChat from "./ActivityChat/ActivityChat";
import ActivityTeam from "./ActivityTeam/ActivityTeam";
import ActivityInfo from "./ActivityInfo/ActivityInfo";
import Loader from "../../Components/Loader/Loader";
import { useParams } from "react-router-dom";
import { swrFetcher } from "../../API/authApi";
import { viewToastError } from "../../helper";
import { NewClassType } from "../../interface";

const Activity = () => {
  const { projectId } = useParams();

  const [activityArray, setActivityArray] = useState<Array<string>>([
    "팀 채팅",
    "팀 정보",
  ]);
  const [activityIndex, setActivityIndex] = useState<number>(0);

  const { data, error, isValidating } = useSWR<{
    targetClass: NewClassType;
  }>(`/class?classId=${projectId}`, swrFetcher);
  if (!data || isValidating) {
    return <Loader />;
  }
  if (error) {
    viewToastError(error);
  }

  return (
    <div className={styles.activity}>
      <ActivitySidebar
        activityArray={activityArray}
        activityIndex={activityIndex}
        setActivityIndex={setActivityIndex}
      />
      {activityIndex === 0 ? (
        <ActivityChat />
      ) : (
        <ActivityTeam classData={data} />
      )}
      <ActivityInfo />
    </div>
  );
};

export default Activity;
