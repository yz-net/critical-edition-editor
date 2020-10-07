import { stat } from "fs";
import React from "react";
import { textSpanIntersectsWithPosition } from "typescript";
import { ContentBody } from "./components/Viewer/ContentBody";
import ControlBar from "./components/Viewer/ControlBar";
import {
  CriticalEditionDocument,
  CriticalEditionDocumentBlock,
  ParagraphBlockData,
} from "./CriticalEditionData";
import Document from "./utils/Document/Document";
import {
  IDocumentPlayer,
  PlayStatus,
} from "./utils/DocumentPlayer/IDocumentPlayer";
import SpeechSynthesisDocumentPlayer from "./utils/DocumentPlayer/SpeechSynthesisDocumentPlayer";

interface AppState {
  document: Document;
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

    const emptyDocument: Document = new Document({ document: { blocks: [] } });

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
    console.log("Stop playing");
    this.state.player.stopPlaying();
  }

  playStatusHandler(status: PlayStatus) {
    if (status === "finished" && this.state.continuePlaying) {
      console.log("App: Finished, playing the next one");
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
        const loadedDocument = new Document({ document: essayContent });
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
    console.log("App: Rendering with state", this.state);
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
  // console.log("App: Rendering");

  // const [essayContent, setEssayContent] = useState<CriticalEditionDocument>();
  // // const [continuousPlay, setContinousPlay] = useState<boolean>(false);
  // // const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(0);
  // const [playback, setPlaybackSettings] = useState<PlaybackSettings>({
  //   playing: false,
  //   continuous: false,
  // });

  // const setPlayback = (settings: PlaybackSettings) => {
  //   console.log("App: Setting Playback Settings", settings);

  //   setPlaybackSettings(settings);
  // };

  // function getBlocks(): Array<CriticalEditionDocumentBlock> | undefined {
  //   if (!essayContent) {
  //     return;
  //   }
  //   if (!essayContent.blocks) {
  //     return;
  //   }
  //   if (essayContent.blocks.length < 1) {
  //     return;
  //   }
  //   return essayContent.blocks;
  // }

  // function getBlock(
  //   blockIndex: number
  // ): CriticalEditionDocumentBlock | undefined {
  //   if (blockIndex < 0) {
  //     return;
  //   }

  //   const blocks = getBlocks();
  //   if (!blocks) {
  //     return;
  //   }

  //   if (blockIndex >= blocks?.length) {
  //     return;
  //   }

  //   return blocks[blockIndex];
  // }

  // function getBlockText(
  //   block: CriticalEditionDocumentBlock
  // ): string | undefined {
  //   if (block.data && (block.data as ParagraphBlockData).text) {
  //     return htmlToText((block.data as ParagraphBlockData).text);
  //   }
  // }

  // function stopPlaying() {
  //   console.log("App: Stopping playback");

  //   dispatchEvent(speechStopped);
  //   speechSynthesis.cancel();
  //   setPlayback({
  //     playing: false,
  //     continuous: playback.continuous,
  //     next: undefined,
  //   });
  // }

  // function playBlock(blockIndex: number) {
  //   const block = getBlock(blockIndex);
  //   if (!block) {
  //     console.log("App: No block found");
  //     return;
  //   }

  //   const text = getBlockText(block);
  //   if (!text) {
  //     console.log("App: No block text found");
  //     return;
  //   }

  //   console.log("App: Playing block", blockIndex);

  //   // Cancel any existing playback and create new playback
  //   speechSynthesis.cancel();
  //   let utterance = new SpeechSynthesisUtterance(text);
  //   speechSynthesis.speak(utterance);
  //   dispatchEvent(speechStarted);

  //   if (utterance && utterance.onend === null) {
  //     const blocks = getBlocks();

  //     if (!blocks) {
  //       return;
  //     }

  //     const nextBlockIndex =
  //       blockIndex + 1 < blocks.length ? blockIndex + 1 : undefined;
  //     console.log("App: Found utterance. Setting playback ", nextBlockIndex);

  //     console.log("App: Attaching onend event to utterance");
  //     utterance.onend = (event) => {
  //       console.log(
  //         "App: Utterance has finished being spoken after " +
  //           event.elapsedTime +
  //           " milliseconds.",
  //         playback
  //       );
  //       if (
  //         playback !== undefined &&
  //         playback.next !== -1 &&
  //         playback.continuous
  //       ) {
  //         console.log("App: utterance done, playing next block");
  //         playBlock(blockIndex + 1);
  //       } else {
  //         console.log("App: Not continuing");
  //         setPlayback({
  //           playing: false,
  //           continuous: playback.continuous,
  //           next: undefined,
  //         });
  //       }
  //     };

  //     console.log("App: Done setting up");

  //     setPlayback({
  //       playing: true,
  //       continuous: playback.continuous,
  //       next: nextBlockIndex,
  //     });
  //   }

  //   // const text = htmlToText(blocks[blockIndex].data.text);
  // }

  // const toggleContinousPlay = () => {
  //   // setContinuousPlay(!continuousPlay);
  //   console.log("App: Toggling continuous", !playback.continuous);
  //   setPlayback({
  //     playing: playback.playing,
  //     continuous: !playback.continuous,
  //     next: playback.next,
  //   });
  // };

  // useEffect(() => {
  //   if (essayContent) {
  //     console.log("App: essayContent loaded", essayContent);
  //     return;
  //   }
  //   console.log("App: essayContent", essayContent);
  //   fetch(props.essayPath)
  //     .then((content) => content.json())
  //     .then((jsonContent) => {
  //       setEssayContent(jsonContent);
  //     })
  //     .catch((error) => {
  //       return <div>Error Loading content</div>;
  //     });
  // }, [essayContent, props.essayPath]);

  // if (!essayContent) {
  //   return <div>Loading essay</div>;
  // }
}

export default App;
