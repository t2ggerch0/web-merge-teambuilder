import React, { FC } from "react";
import styles from "./ProgressBar.module.scss";
import { CheckOutlined } from "@mui/icons-material";

type ProgressBarProps = {
  current: number;
  max: number;
};

const ProgressBar: FC<ProgressBarProps> = ({ current, max }) => {
  return (
    <div className={styles.progressBar}>
      {(() => {
        const result = [];
        for (let i = 1; i <= max; i++) {
          result.push(
            <div
              className={`${styles.progressCircle} ${
                current === i ? styles.current : i < current ? styles.done : ""
              }`}
              key={"applyProgress" + i}
            >
              {i < current ? <CheckOutlined className={styles.check} /> : i}
            </div>
          );
          if (i !== max) {
            result.push(
              <hr
                className={`${styles.progressLine}  ${
                  i < current ? styles.done : ""
                }`}
                key={"applyProgressHr" + i}
              />
            );
          }
        }
        return result;
      })()}
    </div>
  );
};

export default ProgressBar;
