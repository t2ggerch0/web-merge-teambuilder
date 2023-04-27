import React from "react";
import styles from "./Loader.module.scss";
import { ClimbingBoxLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <ClimbingBoxLoader color={"6e93cc"} />
    </div>
  );
};

export default Loader;
