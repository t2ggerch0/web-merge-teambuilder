import React, { FC } from "react";
import styles from "./LabelInput.module.scss";

type LabelInputProps = {
  name: string;
  value: string | number;
  title: string;
  placeholder: string;
  className?: string;
  width?: number | string;
  padding?: number;
  isPassword?: boolean;
  isReadOnly?: boolean;
  onChange(name: string, value: string): void;
};

const LabelInput: FC<LabelInputProps> = ({
  name,
  value,
  title,
  placeholder,
  onChange,
  width,
  padding,
  className,
  isPassword = false,
  isReadOnly = false,
}) => {
  return (
    <div className={`${styles.labelInput} ${className}`}>
      {title !== "" && (
        <div className={styles.title}>
          <label className={styles.title} htmlFor={name}>
            {title}
          </label>
        </div>
      )}
      <input
        className={`${styles.input} ${isReadOnly ? styles.readOnly : ""}`}
        style={{ width, padding }}
        id={name}
        type={isPassword ? "password" : "text"}
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={isReadOnly}
        onChange={(e) => {
          onChange(e.target.name, e.target.value);
        }}
      />
    </div>
  );
};

export default LabelInput;
