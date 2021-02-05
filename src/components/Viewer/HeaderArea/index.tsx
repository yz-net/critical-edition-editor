import { ControlBarProps } from "./ControlBar";
import React from "react";
// import styles from "./HeaderArea.module.css";

interface HeaderAreaProps extends ControlBarProps {
  title?: string;
  author?: string;
  publicationDate?: string;
  thumbnailImgSrc?: string;
  height: number;
  collapse?: boolean;
}

// function MetaItem(props: { label?: string; value?: string }) {
//   if (props.value === undefined) {
//     return null;
//   }
//   return (
//     <div className={styles.MetaItem}>
//       {props.label ? (
//         <React.Fragment>
//           <span className={styles.MetaLabel}>{props.label}</span>{" "}
//         </React.Fragment>
//       ) : null}
//       <span className={styles.MetaValue}>{props.value}</span>
//     </div>
//   );
// }

export default function HeaderArea(props: HeaderAreaProps) {
  const { title } = props;
  return (
    <header className="sans-title-ff">
      <h3>{title}</h3>
    </header>
    // <header
    //   // style={{ height: props.height }}

    //   className={`${props.collapse ? styles.Collapse : ""} ${
    //     styles.HeaderArea
    //   }`}
    // >
    //   <div className={styles.ControlsContainer}>
    //     <ControlBar {...props} />
    //   </div>
    //   <div className={`${styles.MetaContainer}`}>
    //     <h1 className={styles.Title}>{props.title}</h1>
    //     {props.collapse === true ? null : (
    //       <div className={styles.MetaArea}>
    //         <MetaItem value={props.author} />
    //         <MetaItem label={"Published"} value={props.publicationDate} />
    //       </div>
    //     )}
    //   </div>
    //   <div className={styles.ThumbnailContainer}>Thumbnail</div>
    // </header>
  );
}
