import React from "react";
import styles from "./Footer.module.css";

interface FooterProps {
  parentOrgURL?: string;
  parentOrgName?: string;
  orgName: string;
  orgURL: string;
}

export default function Footer(props: FooterProps) {
  const { orgName, orgURL, parentOrgName } = props;
  return (
    <footer className={styles.Footer}>
      <div className={styles.FooterInner}>
        <div className={styles.Left}>
          <div className={styles.YaleLogo}>
            <img alt={`${parentOrgName} logo`} src="/img/parent-logo.svg" />
          </div>
          <div className={styles.FortunoffLogo}>
            <a href={orgURL}>
              {/* <FortunoffLogo /> */}
              <img alt={`${orgName} logo`} src="/img/org-logo.svg" />
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
    </footer>
  );
}
