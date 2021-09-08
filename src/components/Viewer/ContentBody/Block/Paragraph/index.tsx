/* eslint-disable no-continue */
import React, { useEffect, useRef } from 'react';
// import { useLocation } from "react-router-dom";
import { renderToString } from 'react-dom/server';
import { ParagraphBlockData } from '../../../../../CriticalEditionData';
import validParagraphBlockData from '../../../../../CriticalEditionData/validators/validParagraphBlockData';
import styles from './Paragraph.module.css';
import { ReactComponent as FootnoteIcon } from '../../../../../svg/footnote_icon.svg';
import { ReactComponent as VideoIcon } from '../../../../../svg/video_icon.svg';
import scrollToElementByID from '../../../../../utils/scrollToElementByID';
// import DebugLogger from "../../../../../utils/DebugLogger";

// const logger = new DebugLogger("Paragraph: ");

export default function Paragraph(props: { data: ParagraphBlockData }) {
  let paragraphData: ParagraphBlockData;
  const ref = useRef<HTMLDivElement>(null);
  // const location = useLocation();

  useEffect(() => {
    if (ref.current) {
      const linkCollection = ref.current.getElementsByTagName('sup');

      // make a permanent list of links. since we will be replacing them
      // they will disappear from linkCollection, making it impossible to
      // both iterate through and modify the links. I know, right?
      const linkReferences: Array<HTMLElement> = [];
      for (let i = 0; i < linkCollection.length; i += 1) {
        const el = linkCollection[i];
        if (el.classList.contains('footnote-ref')) {
          linkReferences.push(el);
        }
      }

      // now iterate through the permanent list of references
      for (let i = 0; i < linkReferences.length; i += 1) {
        const link = linkReferences[i];
        if (!link) {
          continue;
        }

        let href = '';

        if (!link.hasAttribute('a')) {
          const innerLink = link.getElementsByTagName('a');
          if (innerLink[0]) {
            href = innerLink[0].getAttribute('href') || '';
          }
        } else {
          href = link.getAttribute('a') || '';
        }
        if (href.indexOf('#fn-') !== 0) {
          continue;
        }

        // TODO - add styling to make these links stand out better
        // add a data attribute that can be used to highlight this
        // icon when the paragraph is open/active
        link.classList.add(styles.FootnoteLink);
        // const label = link.innerText.replace("[", "").replace("]", "");
        const label = link.innerText;
        // const label =
        //   link.getAttribute("data-label") || href.replace("#fn-", "");
        // if (link.hasAttribute('data-label')) {
        // } else {
        // }
        // link.innerHTML = `<span>
        //     ${renderToString(<FootnoteIcon />)}
        //   </span>`;
        // logger.log("Fixing footnote: " + label);

        const newElement = document.createElement('button');
        newElement.classList.add(styles.FootnoteLink);
        let icon = <FootnoteIcon />;
        if (label.startsWith('v-')) {
          icon = <VideoIcon />;
        }
        newElement.innerHTML = `${renderToString(icon)} <sup>${label}</sup> `;

        newElement.onclick = (e) => {
          const id = href.replace('#', '');
          scrollToElementByID(id, e);
        };

        // ref.current.replaceChild(newElement, link);
        link.replaceWith(newElement);
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
      data-paragraph-type={paragraphData.paragraphType || 'paragraph'}
      className={styles.Paragraph}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: paragraphData.text }}
    />
  );
}
