import React, { FC } from "react";
import styles from "./OptionRadios.module.scss";
import { CheckOutlined } from "@mui/icons-material";

type OptionRadiosProps = {
  title: string;
  subtitle: string;
  name: string;
  isHorizontal: boolean;
  options: Array<string | number>;
  checkedOption: number[];
  setCheckedOption(e: number): void;
};

const OptionRadios: FC<OptionRadiosProps> = ({
  title,
  subtitle,
  name,
  isHorizontal,
  options,
  checkedOption,
  setCheckedOption,
}) => {
  const onClickOption = (option: number) => {
    setCheckedOption(option);
  };

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
        }`}>
        {options.map((e, index) => (
          <div
            className={styles.option}
            key={name + e}
            onClick={() => {
              onClickOption(index);
            }}>
            <span
              className={`${styles.radioButton} ${
                checkedOption?.includes(index) ? styles.checked : ""
              }`}>
              {checkedOption?.includes(index) ? (
                <CheckOutlined
                  style={{
                    strokeWidth: 2,
                    stroke: "#40513B",
                    fontSize: 15,
                  }}
                />
              ) : (
                ""
              )}
            </span>
            <span
              className={`${styles.optionText} ${
                checkedOption?.includes(index) ? styles.checked : ""
              }`}>
              {e}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionRadios;
