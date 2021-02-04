import React from "react";
import styles from "./EssayLinks.module.css";

interface EssayLinkProps {
  title: string;
  href: string;
}

function EssayLink(props: EssayLinkProps) {
  const { href, title } = props;
  return (
    <a href={href}>
      <div className={`sans-copy-ff ${styles.EssayLinkItem}`}>{title}</div>
    </a>
  );
}

interface EssayLinksProps {
  links: Array<EssayLinkProps>;
}
/**
 *
 */
export default function EssayLinks(props: EssayLinksProps) {
  const { links } = props;
  return (
    <div className={styles.EssayLinkContainer}>
      {links.map((link, index) => {
        return <EssayLink key={index} title={link.title} href={link.href} />;
      })}
    </div>
  );
}
