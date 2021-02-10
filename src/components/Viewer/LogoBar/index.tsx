import React from "react";
import styles from "./LogoBar.module.css";
import { ReactComponent as Logo } from "../svg/yale-fortunoff.svg";

export default function LogoBar() {
  return (
    <a href="https://fortunoff.library.yale.edu">
      <div className={styles.LogoBar}>
        <Logo />
      </div>
    </a>
  );
}
