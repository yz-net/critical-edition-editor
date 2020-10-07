import React from "react";
import { ContentBody } from "./components/Viewer/ContentBody";
import ControlBar from "./components/Viewer/ControlBar";
import DebugLogger from "./utils/DebugLogger";
import DocumentReader from "./utils/Document/Document";
import {
  IDocumentPlayer,
  PlayStatus,
} from "./utils/DocumentPlayer/IDocumentPlayer";
import SpeechSynthesisDocumentPlayer from "./utils/DocumentPlayer/SpeechSynthesisDocumentPlayer";

const logger = new DebugLogger("App");
interface AppState {
  document: DocumentReader;
  player: IDocumentPlayer;
  playing: PlayStatus;
  continuePlaying: boolean;
  playingBlock?: number;
}

interface AppProps {
  essayPath: string;
}

class App extends React.Component<AppProps> {
  state: AppState;

  constructor(props: AppProps) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.render = this.render.bind(this);
    this.loadEssay = this.loadEssay.bind(this);
    this.playStatusHandler = this.playStatusHandler.bind(this);
    this.playBlock = this.playBlock.bind(this);
    this.stopPlaying = this.stopPlaying.bind(this);

    const emptyDocument: DocumentReader = new DocumentReader({
      document: { blocks: [] },
    });

    this.state = {
      playing: "stopped",
      continuePlaying: false,
      document: emptyDocument,
      player: new SpeechSynthesisDocumentPlayer({
        document: emptyDocument,
        playStatusHandler: this.playStatusHandler,
      }),
    };
  }

  playBlock(blockIndex: number) {
    this.state.player.playBlock(blockIndex);
    this.setState({ playingBlock: blockIndex });
  }

  stopPlaying() {
    logger.log("Stop playing");
    this.state.player.stopPlaying();
  }

  playStatusHandler(status: PlayStatus) {
    if (status === "finished" && this.state.continuePlaying) {
      logger.log("Finished, playing the next one");
      this.playBlock((this.state.playingBlock || 0) + 1);
    } else if (status === "finished") {
      this.setState({ playing: false });
    } else if (status === "stopped") {
      this.setState({
        playing: status,
        // playingBlock: undefined,
      });
    } else if (status === "playing") {
      this.setState({ playing: status });
    }
  }

  componentDidMount() {
    this.loadEssay();
  }

  loadEssay() {
    fetch(this.props.essayPath)
      .then((content) => content.json())
      .then((essayContent) => {
        const loadedDocument = new DocumentReader({ document: essayContent });
        this.setState({
          document: loadedDocument,
          player: new SpeechSynthesisDocumentPlayer({
            document: loadedDocument,
            playStatusHandler: this.playStatusHandler,
          }),
        });
      })
      .catch((error) => {
        throw Error(`Failed to load essay content: ${error}`);
      });
  }

  render() {
    logger.log("Rendering with state", this.state);
    return (
      <div className="App">
        <div style={{ position: "fixed", bottom: 0 }}>
          Playing: {this.state.playingBlock}
        </div>
        <ControlBar
          title={"Introduction to the testimony of Liubov’ Krasilovskaia"}
          continuousPlay={this.state.continuePlaying}
          playing={this.state.playing === "playing"}
          play={() => {
            this.playBlock(this.state.playingBlock || 0);
          }}
          stop={this.stopPlaying}
          toggleContinuousPlay={() => {
            this.setState({ continuePlaying: !this.state.continuePlaying });
          }}
        />
        <ContentBody
          playingBlock={this.state.playingBlock}
          playBlock={this.playBlock}
          stopPlaying={this.stopPlaying}
          playing={this.state.playing === "playing"}
          documentData={this.state.document.document}
        />
      </div>
    );
  }
}

export default App;
