import { IDocumentPlayer, IDocumentPlayerProps } from "./IDocumentPlayer";

export default class SpeechSynthesisDocumentPlayer implements IDocumentPlayer {
  props: IDocumentPlayerProps;
  utterances: Array<SpeechSynthesisUtterance>;

  constructor(props: IDocumentPlayerProps) {
    this.props = props;

    this.utterances = [];

    this.supportedByBrowser = this.supportedByBrowser.bind(this);
    this.playBlock = this.playBlock.bind(this);
    this.stopPlaying = this.stopPlaying.bind(this);
  }

  supportedByBrowser() {
    // TODO - Figure out comprehensive tests
    if (!speechSynthesis) {
      return false;
    }
    return true;
  }

  playBlock(blockIndex: number) {
    this.stopPlaying();
    let utterance = new SpeechSynthesisUtterance(
      this.props.document.getBlockText(blockIndex)
    );
    speechSynthesis.speak(utterance);
    console.log("Playing block", blockIndex);
    this.props.playStatusHandler("playing");

    if (utterance && utterance.onend === null) {
      utterance.onend = () => {
        console.log("Done playing block");
        this.props.playStatusHandler("finished");
        utterance.onend = null;
      };

      this.utterances.push(utterance);
    }
  }

  stopPlaying() {
    while (true) {
      const u = this.utterances.pop();
      if (!u || !u.onend) {
        break;
      }
      console.log("Canceling u.onend");
      u.onend = null;
    }

    speechSynthesis.cancel();
    this.props.playStatusHandler("stopped");
  }
}
