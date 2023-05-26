import React, { FC, ReactNode, MouseEvent } from "react";
import styles from "./MergeButton.module.scss";

type MergeButtonProps = {
  children: ReactNode;
  width?: number;
  height?: number;
  fontSize?: number;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: string;
  onClick(e: MouseEvent<HTMLButtonElement>): void;
};

const MergeButton: FC<MergeButtonProps> = ({
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
      className={styles.mergeButton}
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

export default MergeButton;
