import React, { FC } from "react";
import styles from "./OptionRadios.module.scss";
import { CheckOutlined } from "@mui/icons-material";

type OptionRadiosProps = {
  title: string;
  subtitle: string;
  name: string;
  isHorizontal: boolean;
  options: Array<string>;
  checkedValue: string;
  onChange(name: string, value: string): void;
};

const OptionRadios: FC<OptionRadiosProps> = ({
  title,
  subtitle,
  name,
  isHorizontal,
  options,
  checkedValue,
  onChange,
}) => {
  return (
    <div className={styles.optionRadios}>
      {title !== "" && (
        <label className={styles.title} htmlFor={name}>
          {title}
        </label>
      )}
      {subtitle !== "" && <span className={styles.subTitle}>{subtitle}</span>}
      <div
        className={`${styles.selectBox} ${
          isHorizontal ? styles.horizontal : ""
        }`}
      >
        {options.map((e) => (
          <div
            className={styles.option}
            key={name + e}
            onClick={() => {
              onChange(name, e);
            }}
          >
            <span
              className={`${styles.radioButton} ${
                checkedValue === e ? styles.checked : ""
              }`}
            >
              {checkedValue === e ? (
                <CheckOutlined
                  style={{
                    strokeWidth: 2,
                    stroke: "#1472ff",
                    fontSize: 15,
                  }}
                />
              ) : (
                ""
              )}
            </span>
            <span
              className={`${styles.optionText} ${
                checkedValue === e ? styles.checked : ""
              }`}
            >
              {e}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionRadios;
