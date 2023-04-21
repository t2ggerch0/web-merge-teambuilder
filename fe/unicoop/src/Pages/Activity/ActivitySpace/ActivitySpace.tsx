import React, { FC } from "react";
import styles from "./ActivitySpace.module.scss";
import SendIcon from "@mui/icons-material/Send";

type ActivitySpaceProps = {
  activity: string;
};

const ActivitySpace: FC<ActivitySpaceProps> = ({ activity }) => {
  return (
    <div className={styles.activitySpace}>
      <div className={styles.title}>{activity}</div>

      <div className={styles.body}>
        <div className={styles.post}>
          <div className={styles.postInfo}>
            <div className={styles.userIcon}>Haim</div>
            <div className={styles.time}>04/18 11:13 am</div>
          </div>
          <div className={styles.content}>
            회의한 내용 토대로 추가했습니다. 확인 부탁드려요!
          </div>
          <div className={styles.comments}>댓글 1개</div>
        </div>
        <div className={styles.post}>
          <div className={styles.postInfo}>
            <div className={styles.userIcon}>Joonsun</div>
            <div className={styles.time}>Yesterday</div>
          </div>
          <div className={styles.content}>3슬라이드 수정해서 올려드립니다.</div>
          <div className={styles.comments}>댓글 2개</div>
        </div>
      </div>

      <div className={styles.input}>
        <span className={styles.placeholder}>Send message</span>
        <SendIcon className={styles.send} />
      </div>
    </div>
  );
};

export default ActivitySpace;
