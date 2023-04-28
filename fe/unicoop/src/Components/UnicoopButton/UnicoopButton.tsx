import React, { FC, ReactNode, MouseEvent } from "react";
import styles from "./UnicoopButton.module.scss";

type UnicoopButtonProps = {
  children: ReactNode;
  width?: number;
  height?: number;
  fontSize?: number;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: string;
  onClick(e: MouseEvent<HTMLButtonElement>): void;
};

const UnicoopButton: FC<UnicoopButtonProps> = ({
  children,
  width,
  height,
  fontSize,
  backgroundColor,
  borderRadius,
  padding,
  onClick,
}) => {
  return (
    <button
      className={styles.unicoopButton}
      style={{
        width,
        height,
        fontSize,
        backgroundColor,
        borderRadius,
        padding,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default UnicoopButton;
