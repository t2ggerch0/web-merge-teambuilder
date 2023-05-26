import React, { useState, FC } from "react";
import styles from "./CodePopUp.module.scss";
import Modal from "react-modal";
import UnicoopButton from "../UnicoopButton/UnicoopButton";
import { useNavigate } from "react-router-dom";
import { NewClassType } from "../../interface";

type PopUpProps = {
  isPopOn: boolean;
  setIsPopOn(e: boolean): void;
  projectInfo: NewClassType;
};

const CodePopUp: FC<PopUpProps> = ({ isPopOn, setIsPopOn, projectInfo }) => {
  const navigate = useNavigate();
  const [inputKey, setInputKey] = useState<string>("");

  const enterCode = (inputKey: string) => {
    if (inputKey === projectInfo.accessKey.toString()) {
      navigate(`/apply/${projectInfo._id}/${inputKey}`);
      console.log("yes");
    } else {
      setIsPopOn(false);
    }
  };
  console.log("open", isPopOn);

  return (
    <Modal
      isOpen={isPopOn}
      className={styles.modal}
      overlayClassName={styles.overlay}
      // onRequestClose={() => {
      //   setIsPopOn(false);
      // }}
    >
      <div className={styles.codePopUp}>
        <div className={styles.text}>
          교수님으로부터 전달받은 6자리의 입장코드를 입력해주세요.
        </div>
        <input
          className={styles.keyInput}
          value={inputKey}
          onChange={(e) => {
            setInputKey(e.target.value);
          }}
        />
        <UnicoopButton
          backgroundColor={"navy"}
          onClick={() => {
            enterCode(inputKey);
          }}>
          입장하기
        </UnicoopButton>
      </div>
    </Modal>
  );
};

export default CodePopUp;
