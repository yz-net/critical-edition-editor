import React from 'react';
import { ImageBlockData } from '../../../../../CriticalEditionData';
import styles from './Image.module.css';

export interface ImageProps {
  data: ImageBlockData;
}
export function Image(props: ImageProps) {
  const {
    data: { src, srcset, sizes, caption },
  } = props;

  return (
    <div className={`sans-copy-ff ${styles.Image}`}>
      <div className={styles.ImgContainer}>
        <img srcSet={srcset} sizes={sizes} src={src} alt={caption || ''} />
      </div>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: caption || '' }}
        className={styles.Caption}
      />
    </div>
  );
}
