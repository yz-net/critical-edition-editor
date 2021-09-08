import DocumentReader from '../DocumentReader/DocumentReader';

export type PlayStatus = 'playing' | 'stopped' | 'finished';

export interface IDocumentPlayerProps {
  document: DocumentReader;
  playStatusHandler: (status: PlayStatus) => void;
}

export interface IDocumentPlayer {
  playBlock: (blockIndex: number) => void;
  stopPlaying: () => void;
  // supportedByBrowser: () => boolean;
}
