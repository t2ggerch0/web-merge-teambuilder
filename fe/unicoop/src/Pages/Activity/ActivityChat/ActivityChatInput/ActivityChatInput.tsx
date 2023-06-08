import React, { FC, useState } from "react";
import styles from "./ActivityChatInput.module.scss";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../../Context/UnicoopContext";
import { teamApi } from "../../../../API/teamApi";
import { ChatInfo } from "../../../../interface";

type ActivityChatInputProps = {
  myTeamId: string;
  chats: Array<ChatInfo>;
  setChats(e: Array<ChatInfo>): void;
};

const ActivityChatInput: FC<ActivityChatInputProps> = ({
  myTeamId,
  chats,
  setChats,
}) => {
  const { projectId } = useParams();
  const { myInfo } = useAuthContext();
  const [text, setText] = useState<string>("");

  const onClickSend = () => {
    teamApi
      .createTeamMessage(myInfo?.token ?? "", {
        message: text,
        teamId: myTeamId ?? "",
      })
      .then((res) => {
        console.log("res", res);
        let newArr = [...chats];
        newArr.push({
          sender: res.newMessage.sender._id,
          message: res.newMessage.message,
          createdAt: res.newMessage.sender.createdAt,
        });
        setChats(newArr);
        setText("");
      });
  };

  return (
    <form className={styles.message} onSubmit={(e) => e.preventDefault()}>
      <input
        className={styles.input}
        placeholder={"Send message"}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className={styles.send} type={"submit"} onClick={onClickSend}>
        <SendIcon className={styles.icon} />
      </button>
    </form>
  );
};

export default ActivityChatInput;
