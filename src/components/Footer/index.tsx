import React from "react";
import styles from "./Footer.module.css";
import { ReactComponent as YaleLogo } from "../../svg/Yale_block.svg";
import { ReactComponent as FortunoffLogo } from "../../svg/fortunoff_only.svg";

export default function () {
  return (
    <div className={styles.Footer}>
      <div className={styles.FooterInner}>
        <div className={styles.Left}>
          <div className={styles.YaleLogo}>
            <YaleLogo />
          </div>
          <div className={styles.FortunoffLogo}>
            <a href="https://fortunoff.library.yale.edu">
              <FortunoffLogo />
            </a>
          </div>
        </div>
        <div className={`sans-copy-ff ${styles.Right}`}>
          An experiment of the{" "}
          <a href="https://dhlab.yale.edu">
            Yale Digital Humanities Laboratory
          </a>
        </div>
      </div>
    </div>
  );
}
