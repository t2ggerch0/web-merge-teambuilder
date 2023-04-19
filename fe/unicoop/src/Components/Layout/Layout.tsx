import React, { FC, ReactNode } from "react";
import styles from "./Layout.module.scss";

type LayoutProps = {
  children?: ReactNode;
  selectedMenu?: number;
  pageTitle?: string;
};

const Layout: FC<LayoutProps> = ({
  children,
  pageTitle = "page title",
  selectedMenu = 0,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.left_bar}>left menu bar</div>
      <div className={styles.right_container}>
        <div className={styles.page_title}>{pageTitle}</div>
        <div className={styles.page_content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
