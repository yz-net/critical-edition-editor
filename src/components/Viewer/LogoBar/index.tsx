import React from "react";
import styles from "./LogoBar.module.css";
import { ReactComponent as Logo } from "../../../svg/home-logo.svg";
import { ReactComponent as CELogo } from "../../../svg/app-logo.svg";
import { ReactComponent as ArrowLeft } from "../../../svg/arrow-left.svg";
import { ProjectData } from "../../../Data/ProjectData";

export interface LogoBarProps {}
export default function LogoBar(props: LogoBarProps) {
  const pathname = window.location.pathname;
  const isIndexPage: Boolean = pathname === "/";
  console.log("path name", pathname, isIndexPage);
  return (
    <React.Fragment>
      <div className={`${styles.BigBar} ${styles.Bar}`}>
        <a className={styles.BarLink} href={ProjectData.homeLink}>
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
