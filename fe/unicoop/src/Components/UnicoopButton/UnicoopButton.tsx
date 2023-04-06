import React, { FC, ReactNode, MouseEvent } from "react";
import styles from "./UnicoopButton.module.scss";

type UnicoopButtonProps = {
  children: ReactNode;
  onClick(e: MouseEvent<HTMLButtonElement>): void;
};

const UnicoopButton: FC<UnicoopButtonProps> = ({ children, onClick }) => {
  return <button className={styles.unicoopButton} onClick={onClick}>{children}</button>;
};

export default UnicoopButton;
