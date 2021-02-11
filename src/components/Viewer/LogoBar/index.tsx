import React from "react";
import styles from "./LogoBar.module.css";
import { ReactComponent as Logo } from "../svg/yale-logo-square.svg";

export default function LogoBar() {
  return (
    <React.Fragment>
      <div className={`${styles.BigBar} ${styles.Bar}`}>
        <div className={styles.BlueBox}>
          <Logo />
        </div>
        <div className={`${styles.LogoText} teal-font`}>
          Fortunoff Critical Editions
        </div>
      </div>
      {/* <div className={`${styles.SmallBar} ${styles.Bar}`}>
        <div className={styles.BlueBox}></div>
        <div className={styles.LogoText}>Fortunoff Critical Editions</div>
      </div> */}
    </React.Fragment>
  );
}
