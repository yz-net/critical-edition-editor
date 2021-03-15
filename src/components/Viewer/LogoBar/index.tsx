import React from "react";
import styles from "./LogoBar.module.css";
import { ReactComponent as ArrowLeft } from "../../../svg/arrow-left.svg";

export interface LogoBarProps {
  homeLink: string;
  orgName: string;
  appName: string;
}
export default function LogoBar(props: LogoBarProps) {
  const pathname = window.location.pathname;
  const isIndexPage: Boolean = pathname === "/";

  const { homeLink, orgName, appName } = props;
  return (
    <React.Fragment>
      <div className={`${styles.BigBar} ${styles.Bar}`}>
        <a className={styles.BarLink} href={homeLink}>
          <div className={styles.BlueBox}>
            {/* <Logo /> */}
            <img alt={`${orgName} logo`} src="/img/header-logo.svg" />
          </div>
        </a>

        <a className={styles.BarLink} href="/">
          <div className={`${styles.LogoText} teal-font`}>
            <div className={styles.FullAppLogo}>
              <div className={styles.AppWordmark}>{appName}</div>
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
