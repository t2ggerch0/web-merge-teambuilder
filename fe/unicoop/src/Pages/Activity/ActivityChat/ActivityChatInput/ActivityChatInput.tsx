import React, { useState } from "react";
import styles from "./ActivityChatInput.module.scss";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../../Context/UnicoopContext";
import { teamApi } from "../../../../API/teamApi";

const ActivityChatInput = () => {
  const { projectId } = useParams();
  const { myInfo } = useAuthContext();
  const [text, setText] = useState<string>("");

  const onClickSend = () => {
    teamApi
      .createTeamMessage(myInfo?.token ?? "", {
        message: text,
        teamId: projectId ?? "",
      })
      .then((res) => {
        console.log("res", res);
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
