import React, { FC, ReactNode } from "react";
import styles from "./PopUp.module.scss";
import Modal from "react-modal";

type PopUpProps = {
  children: ReactNode;
  isPopOn: boolean;
  setIsPopOn(e: boolean): void;
};

const PopUp: FC<PopUpProps> = ({ children, isPopOn, setIsPopOn }) => {
  return (
    <Modal
      isOpen={isPopOn}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <div className={styles.popUp}>{children}</div>
    </Modal>
  );
};

export default PopUp;
