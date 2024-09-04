import React from "react";
import styles from "../../shared/Layout/Layout.module.css";
type Props = {
  children?: React.ReactElement;
};
export const Layout: React.FC<Props> = ({ children }) => {
  return <div className={styles.main}>{children}</div>;
};
