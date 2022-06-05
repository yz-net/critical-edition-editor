import React from 'react';
import { ImageBlockData } from '../../../../../CriticalEditionData';
import { InlineEmbed } from '../InlineEmbed';
import styles from './Image.module.css';

export interface ImageProps {
  data: ImageBlockData;
}

export function Image(props: ImageProps) {
  const {
    data: { src, srcset, sizes, caption },
  } = props;

  const component =  (<div className={styles.Image}>
    <img srcSet={srcset} sizes={sizes} src={src} alt={caption || ''} />
  </div>)
  return (
    <InlineEmbed
      embedComponent={component}
      data={{caption}}
      />
  )
  
}
