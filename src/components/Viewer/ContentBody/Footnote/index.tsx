import React, { useEffect, useRef, useState } from "react";
import { FootnoteParagraphBlockData } from "../../../../CriticalEditionData";
import DebugLogger from "../../../../utils/DebugLogger";
import styles from "./Footnote.module.css";

const logger = new DebugLogger("Footnote: ");
export function Footnote(props: { data: FootnoteParagraphBlockData }) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(-1);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  if (!props.data || !props.data.text) {
    logger.warn("Invalid block <missing data.text property>", props.data);
    return null;
  }

  let interval: any;

  function easeHeight(node: HTMLDivElement, toHeight: number) {
    // const intervalMS = 10;
    const duration = 500;
    let height = node.getBoundingClientRect().height;
    const fromHeight = height;
    const shrink = fromHeight > toHeight;
    const difference = toHeight - height;
    console.log("Difference", difference, toHeight, height);
    const increment = Math.max(1, Math.ceil(difference / duration));
    console.log("increment size:", increment);
    const intervalDuration = 10;

    clearInterval(interval);

    const heightAtTime = (time: number) => {
      const totalDifference = toHeight - fromHeight;
      if (time >= duration) {
        return toHeight;
      }
      // const percentDone = time / duration;
      const max = Math.PI / 2;
      const x = (time / duration) * max;
      const percentDone = Math.sin(x);
      const differenceSoFar = totalDifference * percentDone; //Math.sin((percentDone * Math.PI) / 2);
      return Math.round(fromHeight + differenceSoFar);
    };

    const startTime = Number(new Date());

    const incrementHeight = () => {
      const currentTime = Number(new Date());
      const elapsedTime = currentTime - startTime;

      let currentHeight = heightAtTime(elapsedTime);

      let done: boolean;
      if (shrink) {
        done = currentHeight <= toHeight;
      } else {
        done = currentHeight >= toHeight;
      }
      if (done) {
        logger.log("break", currentHeight, toHeight);
        currentHeight = toHeight;
        clearInterval(interval);
      }
      logger.log("Setting height", currentHeight);
      node.style.height = `${currentHeight}px`;
    };

    interval = setInterval(incrementHeight, intervalDuration);
  }

  function collapse() {
    if (ref.current) {
      logger.log("Collapsing");
      setCollapsed(true);
      easeHeight(ref.current, 0);
    }
  }

  function expand() {
    if (ref.current) {
      logger.log("Expanding to " + height.toString());
      setCollapsed(false);
      easeHeight(ref.current, height);
    }
  }

  function toggleCollapse() {
    if (collapsed) {
      expand();
    } else {
      collapse();
    }
  }

  return (
    <div className={`${styles.Footnote} ${collapsed ? styles.Collapsed : ""}`}>
      <div className={styles.ButtonTray}>
        <button onClick={toggleCollapse}>{collapsed ? "+" : "-"}</button>
      </div>
      <div
        ref={ref}
        className={styles.ContentArea}
        // id={props.data.id}
        dangerouslySetInnerHTML={{ __html: props.data.text }}
      ></div>
    </div>
  );
}
