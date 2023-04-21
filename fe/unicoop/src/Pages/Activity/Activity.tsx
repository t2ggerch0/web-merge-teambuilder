import React, { useState } from "react";
import styles from "./Activity.module.scss";
import ActivitySidebar from "./ActivitySidebar/ActivitySidebar";
import ActivitySpace from "./ActivitySpace/ActivitySpace";
import ActivityInfo from "./ActivityInfo/ActivityInfo";

const Activity = () => {
  const [activityArray, setActivityArray] = useState<Array<string>>([
    "자유대화",
    "First Proposal",
    "4월 21일 회의록",
  ]);
  const [activityIndex, setActivityIndex] = useState<number>(0);
  return (
    <div className={styles.activity}>
      <ActivitySidebar
        activityArray={activityArray}
        setActivityArray={setActivityArray}
        activityIndex={activityIndex}
        setActivityIndex={setActivityIndex}
      />
      <ActivitySpace activity={activityArray[activityIndex]} />
      <ActivityInfo />
    </div>
  );
};

export default Activity;
