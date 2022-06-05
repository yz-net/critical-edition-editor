import React, { ComponentType } from 'react';
import { InlineEmbedBlockData } from '../../../../../CriticalEditionData';
import styles from './InlineEmbed.module.css';

export interface InlineEmbedProps {
  data: InlineEmbedBlockData
  embedComponent: JSX.Element
}

export function InlineEmbed(props: InlineEmbedProps) {
  const {
    embedComponent: EmbedComponent,
    data: { caption },
  } = props;

  return (
    <div className={`sans-copy-ff ${styles.InlineEmbed}`}>
      <div className={styles.EmbedContainer}>
        {EmbedComponent}
      </div>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: caption || '' }}
        className={styles.Caption}
      />
    </div>
  );
}
