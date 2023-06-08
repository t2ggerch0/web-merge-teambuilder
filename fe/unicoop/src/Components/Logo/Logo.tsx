import React, { FC } from "react";
import styles from "./Logo.module.scss";
import { useNavigate } from "react-router-dom";

type LogoProps = {
  color?: string;
  fontSize?: number;
  isClickable?: boolean;
};

const Logo: FC<LogoProps> = ({ color, fontSize, isClickable }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.logo}
      style={{
        color,
        fontSize,
        letterSpacing: fontSize ? fontSize / 6 : 4,
        cursor: isClickable ? "pointer" : "default",
      }}
      onClick={
        isClickable
          ? () => {
              navigate("/");
            }
          : () => {}
      }
    >
      merge
    </div>
  );
};

export default Logo;
