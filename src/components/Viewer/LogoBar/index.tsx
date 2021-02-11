import React from "react";
import styles from "./LogoBar.module.css";
import { ReactComponent as Logo } from "../../../svg/yale-fortunoff.svg";
import { ReactComponent as CELogo } from "../../../svg/CE-sm_header.svg";
import { ReactComponent as ArrowLeft } from "../../../svg/arrow-left.svg";

export default function LogoBar() {
  const pathname = window.location.pathname;
  const isIndexPage: Boolean = pathname === "/";
  console.log("path name", pathname, isIndexPage);
  return (
    <React.Fragment>
      <div className={`${styles.BigBar} ${styles.Bar}`}>
        <a className={styles.BarLink} href="https://fortunoff.library.yale.edu">
          <div className={styles.BlueBox}>
            <Logo />
          </div>
        </a>

        <a className={styles.BarLink} href="/">
          <div className={`${styles.LogoText} teal-font`}>
            <div className={styles.FullAppLogo}>
              <CELogo />
            </div>
            {isIndexPage ? null : (
              <div className={styles.BackButton}>
                <ArrowLeft />
              </div>
            )}
          </div>
        </a>
      </div>
      {/* <div className={`${styles.SmallBar} ${styles.Bar}`}>
        <div className={styles.BlueBox}></div>
        <div className={styles.LogoText}>Fortunoff Critical Editions</div>
      </div> */}
    </React.Fragment>
  );
}
