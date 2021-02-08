import styles from "./NavBar.module.css";
import React from "react";

export interface NavBarLink {
  title: string;
  url: string;
}

export interface NavBarProps {
  links: Array<NavBarLink>;
}

export default function NavBar(props: NavBarProps) {
  const { links } = props;
  return (
    <div className={`sans-copy-ff ${styles.NavBar}`}>
      {links.map((link: NavBarLink, idx: number) => {
        return (
          <a key={idx} href={link.url}>
            {link.title}
          </a>
        );
      })}
    </div>
  );
}
