import React, { useRef } from "react";
import { FootnoteParagraphBlockData } from "../../../../../CriticalEditionData";
// import DebugLogger from "../../../../../utils/DebugLogger";
import scrollToElementByID from "../../../../../utils/scrollToElementByID";
import styles from "./Footnote.module.css";
import { ReactComponent as RightArrow } from "./right-arrow.svg";
import { ReactComponent as LeftArrow } from "./left-arrow.svg";

// const logger = new DebugLogger("Footnote: ");

interface FootnoteProps {
  data: FootnoteParagraphBlockData;
  nextFootnoteBlock?: FootnoteParagraphBlockData;
  previousFootnoteBlock?: FootnoteParagraphBlockData;
}

export function Footnote(props: FootnoteProps) {
  // const [collapsed, setCollapsed] = useState<boolean>(false);
  // const [height, setHeight] = useState<number>(-1);
  const label = props.data.label;

  // useEffect(() => {
  //   if (ref.current) {
  //     setHeight(ref.current.getBoundingClientRect().height);
  //   }
  // }, []);

  const ref = useRef<HTMLDivElement>(null);
  // if (!props.data || !props.data.text) {
  //   logger.warn("Invalid block <missing data.text property>", props.data);
  //   return null;
  // }

  // let interval: any;

  // function easeHeight(node: HTMLDivElement, toHeight: number) {
  //   // const intervalMS = 10;
  //   const duration = 500;
  //   let height = node.getBoundingClientRect().height;
  //   const fromHeight = height;
  //   const shrink = fromHeight > toHeight;
  //   const difference = toHeight - height;
  //   console.log("Difference", difference, toHeight, height);
  //   const increment = Math.max(1, Math.ceil(difference / duration));
  //   console.log("increment size:", increment);
  //   const intervalDuration = 10;

  //   clearInterval(interval);

  //   const heightAtTime = (time: number) => {
  //     const totalDifference = toHeight - fromHeight;
  //     if (time >= duration) {
  //       return toHeight;
  //     }
  //     // const percentDone = time / duration;
  //     const max = Math.PI / 2;
  //     const x = (time / duration) * max;
  //     const percentDone = Math.sin(x);
  //     const differenceSoFar = totalDifference * percentDone; //Math.sin((percentDone * Math.PI) / 2);
  //     return Math.round(fromHeight + differenceSoFar);
  //   };

  //   const startTime = Number(new Date());

  //   const incrementHeight = () => {
  //     const currentTime = Number(new Date());
  //     const elapsedTime = currentTime - startTime;

  //     let currentHeight = heightAtTime(elapsedTime);

  //     let done: boolean;
  //     if (shrink) {
  //       done = currentHeight <= toHeight;
  //     } else {
  //       done = currentHeight >= toHeight;
  //     }
  //     if (done) {
  //       logger.log("break", currentHeight, toHeight);
  //       currentHeight = toHeight;
  //       clearInterval(interval);
  //     }
  //     logger.log("Setting height", currentHeight);
  //     node.style.height = `${currentHeight}px`;
  //   };

  //   interval = setInterval(incrementHeight, intervalDuration);
  // }

  // function collapse() {
  //   if (ref.current) {
  //     logger.log("Collapsing");
  //     setCollapsed(true);
  //     easeHeight(ref.current, 0);
  //   }
  // }

  // function expand() {
  //   if (ref.current) {
  //     logger.log("Expanding to " + height.toString());
  //     setCollapsed(false);
  //     easeHeight(ref.current, height);
  //   }
  // }

  // function toggleCollapse() {
  //   if (collapsed) {
  //     expand();
  //   } else {
  //     collapse();
  //   }
  // }

  const prevButton = props.previousFootnoteBlock ? (
    <button
      onClick={() => {
        if (props.previousFootnoteBlock) {
          scrollToElementByID(props.previousFootnoteBlock.id);
        }
      }}
    >
      <LeftArrow />
    </button>
  ) : (
    <button disabled></button>
  );

  const nextButton = props.nextFootnoteBlock ? (
    <button
      onClick={() => {
        if (props.nextFootnoteBlock) {
          scrollToElementByID(props.nextFootnoteBlock.id);
        }
      }}
    >
      <RightArrow />
    </button>
  ) : (
    <button disabled></button>
  );
  return (
    <div className={`${styles.Footnote}`}>
      {/* <div className={`${styles.Footnote} ${collapsed ? styles.Collapsed : ""}`}> */}
      {/* <div className={styles.ButtonTray}> */}
      {/* <button onClick={toggleCollapse}>{collapsed ? "+" : "-"}</button> */}
      {/* </div> */}

      <div ref={ref} className={styles.FootnoteTextGroup}>
        <div>
          <div className={styles.FootnoteLabel}>{label}</div>
        </div>
        <div className={styles.FootnoteText}>
          <div
            className={styles.EmbedCode}
            dangerouslySetInnerHTML={{ __html: props.data.embedCode || "" }}
          ></div>
          <div
            // id={props.data.id}
            dangerouslySetInnerHTML={{ __html: props.data.text }}
          ></div>
        </div>
        <div className={styles.NavButtonTray}>
          {prevButton}
          {nextButton}
        </div>
      </div>
    </div>
  );
}
