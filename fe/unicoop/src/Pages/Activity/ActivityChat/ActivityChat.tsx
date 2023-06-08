import React, { useState, FC, useEffect } from "react";
import styles from "./ActivityChat.module.scss";
import ActivityChatInput from "./ActivityChatInput/ActivityChatInput";
import { useAuthContext } from "../../../Context/UnicoopContext";
import { useParams } from "react-router-dom";
import {
  ChatInfo,
  TeamInfo,
  TeamInfoType,
  UserContextType,
} from "../../../interface";
import { guestApi } from "../../../API/guestApi";
import dayjs from "dayjs";
import { teamApi } from "../../../API/teamApi";

type ActivityChatProps = {};

const ActivityChat: FC<ActivityChatProps> = () => {
  const { projectId } = useParams();
  const { myInfo } = useAuthContext();
  const [teamInfo, setTeamInfo] = useState<TeamInfoType>();
  const [chats, setChats] = useState<Array<ChatInfo>>([]);

  useEffect(() => {
    teamApi.getClassTeams(projectId ?? "").then((res) => {
      let data = res.teams as TeamInfoType[];
      let temp = data.filter((t) =>
        t.contextByUser.map((u) => u.user).includes(myInfo?.id ?? "")
      )[0];
      setTeamInfo(temp);
    });
  }, []);

  return (
    <div className={styles.activityChat}>
      <div className={styles.title}>팀 채팅</div>

      <div className={styles.body}>
        {chats.map((chat) => (
          <div className={styles.post}>
            <div className={styles.postInfo}>
              <div className={styles.userIcon}>{myInfo?.name}</div>
              <div className={styles.time}>
                {dayjs(chat.createdAt).format("MM/DD hh:mm a")}
              </div>
            </div>
            <div className={styles.content}>{chat.message}</div>
            <div className={styles.comments}>댓글 1개</div>
          </div>
        ))}

        <ActivityChatInput
          myTeamId={teamInfo?._id ?? ""}
          chats={chats}
          setChats={setChats}
        />
      </div>
    </div>
  );
};

export default ActivityChat;
