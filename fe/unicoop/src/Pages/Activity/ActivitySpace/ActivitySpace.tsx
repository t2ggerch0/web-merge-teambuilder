import React, { useState, FC } from "react";
import styles from "./ActivitySpace.module.scss";
import SendIcon from "@mui/icons-material/Send";

type ActivitySpaceProps = {
  activity: string;
};

const ActivitySpace: FC<ActivitySpaceProps> = ({ activity }) => {
  const [text, setText] = useState<string>("");
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

      <form className={styles.message}>
        <input
          className={styles.input}
          placeholder={"Send message"}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <SendIcon className={styles.send} />
      </form>
    </div>
  );
};

export default ActivitySpace;
