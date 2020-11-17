import React, { useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";
import { ParagraphBlockData } from "../../../../../CriticalEditionData";
import validParagraphBlockData from "../../../../../CriticalEditionData/validators/validParagraphBlockData";
import styles from "./Paragraph.module.css";
import { ReactComponent as FootnoteIcon } from "../../../svg/footnote_icon.svg";
import { renderToString } from "react-dom/server";
import scrollToElementByID from "../../../../../utils/scrollToElementByID";
// import DebugLogger from "../../../../../utils/DebugLogger";

// const logger = new DebugLogger("Paragraph: ");

export function Paragraph(props: { data: ParagraphBlockData }) {
  let paragraphData: ParagraphBlockData;
  const ref = useRef<HTMLDivElement>(null);
  // const location = useLocation();

  useEffect(() => {
    if (ref.current) {
      const linkCollection = ref.current.getElementsByTagName("a");

      // make a permanent list of links. since we will be replacing them
      // they will disappear from linkCollection, making it impossible to
      // both iterate through and modify the links. I know, right?
      const linkReferences: Array<HTMLAnchorElement> = [];
      for (let i = 0; i < linkCollection.length; i++) {
        linkReferences.push(linkCollection[i]);
      }

      // now iterate through the permanent list of references
      for (let i = 0; i < linkReferences.length; i++) {
        const link = linkReferences[i];
        if (!link) {
          continue;
        }
        const href = link.getAttribute("href") || "";
        if (href.indexOf("#") !== 0) {
          continue;
        }

        // TODO - add styling to make these links stand out better
        // add a data attribute that can be used to highlight this
        // icon when the paragraph is open/active
        link.classList.add(styles.FootnoteLink);
        const label = link.innerText.replace("[", "").replace("]", "");
        // link.innerHTML = `<span>
        //     ${renderToString(<FootnoteIcon />)}
        //   </span>`;
        // logger.log("Fixing footnote: " + label);

        const newElement = document.createElement("button");
        newElement.classList.add(styles.FootnoteLink);
        newElement.innerHTML = `${renderToString(
          <FootnoteIcon />
        )} <sup>${label}</sup> `;

        newElement.onclick = (e) => {
          const id = href.replace("#", "");
          scrollToElementByID(id, e);
          // const footnote = document.getElementById(id);
          // if (footnote) {
          //   footnote.scrollIntoView({ behavior: "smooth", block: "center" });
          //   footnote.focus();
          //   e.preventDefault();
          // }
        };

        ref.current.replaceChild(newElement, link);
        // link.replaceWith(newElement);
      }
    }
  }, [ref]);

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
