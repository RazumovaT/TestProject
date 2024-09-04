import React, { ReactNode } from "react";
import styles from "../Landing/Landing.module.css";

type LandingProps = {
  children: ReactNode;
};
export const Landing: React.FC<LandingProps> = ({ children }) => {
  return <div className={styles.list}>{children}</div>;
};
