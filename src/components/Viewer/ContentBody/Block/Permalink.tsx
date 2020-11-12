import React from "react";
import styles from "./ControlButtons.module.css";

type PermalinkProps = {
  blockID: string;
};
export default function Permalink(props: PermalinkProps) {
  return <button className={styles.ControlButton}>p</button>;
}
