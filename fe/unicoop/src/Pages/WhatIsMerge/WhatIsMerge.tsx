import React from "react";
import styles from "./WhatIsMerge.module.scss";
import MergeButton from "../../Components/MergeButton/MergeButton";

const WhatIsMerge = () => {
  return (
    <div className={styles.whatIsMerge}>
      <div className={styles.howToUse}>
        <div className={styles.howToUseTitle}>What is merge?</div>
        <div className={styles.contents}>
          merge의 이용 방법은 다음과 같습니다.
        </div>
      </div>
      <div className={styles.feedback}>
        <div className={styles.feedbackTitle}>Please send us any feedback</div>
        <textarea />

        <MergeButton backgroundColor={"navy"} onClick={() => {}}>
          제출
        </MergeButton>
      </div>
    </div>
  );
};

export default WhatIsMerge;
