import React from "react";
import styles from "./ControlButton.module.css";

export interface ControlButtonProps {
  onClick: () => void;
  label: string;
  icon: JSX.Element;
}
export default function ControlButton(props: ControlButtonProps) {
  const { label, onClick, icon } = props;
  return (
    <div className="ControlButtonWrapper">
      <button
        tabIndex={0}
        onClick={onClick}
        aria-label={label}
        className={styles.ControlButton}
        //   style={{ backgroundImage: `url(${icon})` }}
      >
        <div className={styles.Icon}>{icon}</div>
        <span className={styles.HoverText}>{label}</span>
      </button>
    </div>
  );
}
