import React, { FC } from "react";
import styles from "./LabelInput.module.scss";

type LabelInputProps = {
  name: string;
  value: string | number;
  title: string;
  placeholder: string;
  isPassword: boolean;
  isReadOnly: boolean;
  onChange(name: string, value: string): void;
};

const LabelInput: FC<LabelInputProps> = ({
  name,
  value,
  title,
  placeholder,
  isPassword,
  isReadOnly,
  onChange,
}) => {
  return (
    <div className={styles.labelInput}>
      {title !== "" && (
        <div className={styles.title}>
          <label className={styles.title} htmlFor={name}>
            {title}
          </label>
        </div>
      )}
      <input
        className={`${styles.input} ${isReadOnly ? styles.readOnly : ""}`}
        id={name}
        type={isPassword ? "password" : "text"}
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={isReadOnly}
        onChange={(e) => {
          console.log('name', e.target.name, 'value', e.target.value)
          onChange(e.target.name, e.target.value);
        }}
      />
    </div>
  );
};

export default LabelInput;
