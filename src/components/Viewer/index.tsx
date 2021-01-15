import React from "react";
import { ContentBody } from "./ContentBody";
// import ControlBar from "./HeaderArea/ControlBar";
import DebugLogger from "../../utils/DebugLogger";
import DocumentReader from "../../utils/DocumentReader/DocumentReader";
import {
  IDocumentPlayer,
  PlayStatus,
} from "../../utils/DocumentPlayer/IDocumentPlayer";
import SpeechSynthesisDocumentPlayer from "../../utils/DocumentPlayer/SpeechSynthesisDocumentPlayer";
import HeaderArea from "./HeaderArea";
import styles from "./Viewer.module.css";
import { EssayDataEntry } from "../../EssayData";

const logger = new DebugLogger("Viewer");
interface ViewerState {
  document: DocumentReader;
  player: IDocumentPlayer;
  playing: PlayStatus;
  continuePlaying: boolean;
  playingBlock?: number;
  headerHeight: number;
}

interface ViewerProps {
  essay: EssayDataEntry;
  essayPath: string;
  hash: string;
}

class Viewer extends React.Component<ViewerProps> {
  state: ViewerState;

  constructor(props: ViewerProps) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.render = this.render.bind(this);
    this.loadEssay = this.loadEssay.bind(this);
    this.playStatusHandler = this.playStatusHandler.bind(this);
    this.playBlock = this.playBlock.bind(this);
    this.stopPlaying = this.stopPlaying.bind(this);
    // this.handleScroll = this.handleScroll.bind(this);

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
      headerHeight: 200,
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

  // handleScroll(evt: React.UIEvent<HTMLDivElement, UIEvent>) {
  //   console.log("scroll event", evt.currentTarget.scrollTop, typeof evt.target);
  //   this.setState({ scrollPosition: evt.currentTarget.scrollTop });
  // }

  render() {
    logger.log("Rendering with state", this.state);
    return (
      <div
        // onScroll={this.handleScroll}
        className={styles.Viewer}
      >
        {/* <div style={{ position: "fixed", bottom: 0 }}>
          Playing: {this.state.playingBlock}
        </div> */}

        <div className={styles.HeaderAreaContainer}>
          <HeaderArea
            height={this.state.headerHeight}
            title={this.props.essay.title}
            author={this.props.essay.author}
            publicationDate={this.props.essay.publicationDate}
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
        </div>

        <div className={styles.SplashTitleContainer}>
          <div className={styles.Gradient} />
          <div className={styles.SplashBackgroundVideoContainer}>
            <video
              poster={this.props.essay.posterPath}
              playsInline
              muted
              loop
              autoPlay
              className={styles.SplashBackgroundVideo}
            >
              <source src={this.props.essay.videoPath}></source>
            </video>
          </div>

          <div className={styles.SplashTitle}>
            <div>
              <header>
                {/* See example 5: https://www.w3.org/TR/html52/common-idioms-without-dedicated-elements.html#subheadings-subtitles-alternative-titles-and-taglines */}
                <p className={styles.SuperTitle}>
                  {this.props.essay.supertitle}
                </p>
                <h1>{this.props.essay.title}</h1>
              </header>
            </div>
            <div>
              {/* <div className={styles.SplashMetaDivider}></div> */}
              <div className={styles.SplashMeta}>
                by {this.props.essay.author}
              </div>
              <div className={styles.SplashMeta}>January 1, 2021</div>
            </div>
          </div>
          <div className={styles.SplashTitleTail}></div>
        </div>

        <div className={styles.FixedTitleContainer}>
          <div className={styles.FixedTitleContents}>
            {/* <HeaderArea
              height={this.state.headerHeight}
              title={"Introduction to the testimony of Liubov’ Krasilovskaia"}
              author={"Author Name"}
              publicationDate={"January 1, 2020"}
              continuousPlay={this.state.continuePlaying}
              playing={this.state.playing === "playing"}
              play={() => {
                this.playBlock(this.state.playingBlock || 0);
              }}
              stop={this.stopPlaying}
              toggleContinuousPlay={() => {
                this.setState({ continuePlaying: !this.state.continuePlaying });
              }}
            /> */}
          </div>
        </div>

        <div
          // style={{ top: Math.max(0, 200 - this.state.scrollPosition) }}
          className={styles.ContentBodyContainer}
        >
          <div className={styles.ContentBodyContents}>
            <ContentBody
              playingBlock={this.state.playingBlock}
              playBlock={this.playBlock}
              stopPlaying={this.stopPlaying}
              playing={this.state.playing === "playing"}
              documentData={this.state.document.document}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Viewer;
