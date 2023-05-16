import React, { FC } from "react";
import styles from "./OptionRadios.module.scss";
import { CheckOutlined } from "@mui/icons-material";

type OptionRadiosProps = {
  title: string;
  subtitle: string;
  name: string;
  isHorizontal: boolean;
  options: Array<string | number>;
  checkedOption: number;
  setCheckedOption(e: number): void;
  onChange(e: Object): void;
};

const OptionRadios: FC<OptionRadiosProps> = ({
  title,
  subtitle,
  name,
  isHorizontal,
  options,
  checkedOption,
  setCheckedOption,
  onChange,
}) => {
  //const [selectedOption, setSelectedOption] = useState<string>("");
  const onClickOption = (option: number) => {
    //setSelectedOption(option);
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
        }`}
      >
        {options.map((e, index) => (
          <div
            className={styles.option}
            key={name + e}
            onClick={() => {
              onClickOption(index);
            }}
          >
            <span
              className={`${styles.radioButton} ${
                checkedOption === index ? styles.checked : ""
              }`}
            >
              {checkedOption === index ? (
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
                checkedOption === index ? styles.checked : ""
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
