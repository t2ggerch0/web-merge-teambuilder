import React, { useState, FC } from "react";
import styles from "./CodePopUp.module.scss";
import Modal from "react-modal";
import UnicoopButton from "../UnicoopButton/UnicoopButton";

type PopUpProps = {
  isPopOn: boolean;
  setIsPopOn(e: boolean): void;
};

const CodePopUp: FC<PopUpProps> = ({ isPopOn, setIsPopOn }) => {
  const [inputKey, setInputKey] = useState<string>("");
  return (
    <Modal
      isOpen={isPopOn}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
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
        <UnicoopButton onClick={() => {}}>입장하기</UnicoopButton>
      </div>
    </Modal>
  );
};

export default CodePopUp;
