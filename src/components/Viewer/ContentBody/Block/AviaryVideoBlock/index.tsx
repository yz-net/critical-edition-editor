import React from 'react';
import { AviaryVideoBlockData } from '../../../../../CriticalEditionData';
import { InlineEmbed } from '../InlineEmbed';
import styles from './AviaryVideoBlock.module.css';

export interface AviaryVideoBlockProps {
  data: AviaryVideoBlockData
}

export function AviaryVideoBlock(props: AviaryVideoBlockProps) {
  const {
    data: { ead_id, tape, start_time, end_time, caption },
  } = props;

  const component = (<div className={styles.Aviary}>
    <div className={styles.AviaryIframeContainer}>
      <iframe src={`https://fortunoff.aviaryplatform.com/c/${ead_id}/${tape}/?t=${start_time}&e=${end_time}&embed=true&media_file=true`} allow="fullscreen" frameborder="0"></iframe>
    </div>
  </div>)

  console.log("Rendering video block", props.data)

  return (
    <InlineEmbed
      embedComponent={component}
      data={{caption}}
      />
  )
  
}