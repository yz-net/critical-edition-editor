import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ParagraphBlockData } from "../../../CriticalEditionData";
import validParagraphBlockData from "../../../CriticalEditionData/validators/validParagraphBlockData";
// import DebugLogger from "../../../utils/DebugLogger";
import styles from "./Paragraph.module.css";

// const logger = new DebugLogger("Paragraph: ");

export function Paragraph(props: { data: ParagraphBlockData }) {
  let paragraphData: ParagraphBlockData;
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  useEffect(() => {
    if (ref.current) {
      const links = ref.current.getElementsByTagName("a");
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const href = link.getAttribute("href") || "";
        if (href.indexOf("#") !== 0) {
          return;
        }

        // TODO - add styling to make these links stand out better
        link.classList.add(styles.FootnoteLink);
        link.innerText = link.innerText.replace("[", "").replace("]", "");

        link.onclick = (e) => {
          const id = href.replace("#", "");
          const footnote = document.getElementById(id);
          if (footnote) {
            footnote.scrollIntoView({ behavior: "smooth", block: "center" });
            footnote.focus();
            e.preventDefault();
          }
        };
      }
    }
  }, [location.hash]);

  try {
    paragraphData = validParagraphBlockData(props.data);
  } catch (e) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={styles.Paragraph}
      dangerouslySetInnerHTML={{ __html: paragraphData.text }}
    ></div>
  );
}
