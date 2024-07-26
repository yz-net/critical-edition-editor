import Image from "next/image";
import { FiChevronLeft } from "react-icons/fi";

import styles from "./styles.module.scss";

export default function LogoBar() {
  return (
    <div className={`${styles.BigBar} ${styles.Bar}`}>
      <a className={styles.BarLink} href="https://fortunoff.library.yale.edu">
        <div className={styles.BlueBox}>
          <Image alt="Yale Logo" src="/img/header-logo.svg" />
        </div>
      </a>

      <a className={styles.BarLink} href="/">
        <div className={`${styles.LogoText} teal-font`}>
          <div className={styles.FullAppLogo}>
            <div className={styles.AppWordmark}>Critical Editions</div>
          </div>
          <div className={styles.BackButton}>
            <FiChevronLeft />
          </div>
        </div>
      </a>
    </div>
  );
}
