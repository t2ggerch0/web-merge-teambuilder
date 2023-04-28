import React, { useState, FC } from "react";
import styles from "./CodePopUp.module.scss";
import axios from "axios";
import Modal from "react-modal";
import UnicoopButton from "../UnicoopButton/UnicoopButton";
import { useNavigate } from "react-router-dom";
import { viewToastError } from "../../helper";
import { setHeaders } from "../../API/api";
import { useAuthContext } from "../../Context/UnicoopContext";

type PopUpProps = {
  isPopOn: boolean;
  setIsPopOn(e: boolean): void;
};

const CodePopUp: FC<PopUpProps> = ({ isPopOn, setIsPopOn }) => {
  const navigate = useNavigate();
  const userInfoHandle = useAuthContext();
  const [inputKey, setInputKey] = useState<string>("");

  const joinClass = async (accessKey: string) => {
    console.log(accessKey);
    try {
      setHeaders(userInfoHandle.myInfo?.token ?? "");
      const response = await axios.post(`/class/join-class`, {
        accessKey,
      });

      console.log(response);
      console.log(accessKey);
      setIsPopOn(false);
      navigate(`/apply&id=${response.data}`);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response) {
        const statusCode = e.response.status;
        if (statusCode === 409) {
          viewToastError(
            "이미 등록된 사용자가 있거나 잘못된 학교 이메일 정보입니다."
          );
        } else if (statusCode === 500) {
          viewToastError(
            "서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요."
          );
        } else {
          viewToastError(
            "예기치 않은 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요."
          );
        }
      } else {
        viewToastError(
          "알 수 없는 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요."
        );
      }
    }
  };

  /*const submitCode = (accessKey: string) => {
    if (userInfoHandle.myInfo?.token) {
      api
        .joinClass({
          accessKey,
          token: userInfoHandle.myInfo?.token,
        })
        .then();
      setIsPopOn(false);
      navigate(`/apply&id=${response.data}`);
    }
  };*/

  return (
    <Modal
      isOpen={isPopOn}
      className={styles.modal}
      overlayClassName={styles.overlay}
      onRequestClose={() => {
        setIsPopOn(false);
      }}
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
            joinClass(inputKey).then();
          }}
        >
          입장하기
        </UnicoopButton>
      </div>
    </Modal>
  );
};

export default CodePopUp;
