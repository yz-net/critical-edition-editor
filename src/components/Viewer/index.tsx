import React from "react";
import { ContentBody } from "./ContentBody";
import DebugLogger from "../../utils/DebugLogger";
import DocumentReader from "../../utils/DocumentReader/DocumentReader";
import {
  IDocumentPlayer,
  PlayStatus,
} from "../../utils/DocumentPlayer/IDocumentPlayer";
import SpeechSynthesisDocumentPlayer from "../../utils/DocumentPlayer/SpeechSynthesisDocumentPlayer";
import styles from "./Viewer.module.css";
import { EssayDataEntry } from "../../Data/EssayData";
import EssayPreamble from "./EssayPreamble";
import LogoBar from "./LogoBar";
import CallToAction from "./CallToAction";
import Footer from "../Footer";
import {
  CompleteProjectDataObject,
  defaultProjectData,
} from "Data/ProjectData";
import { DataContext } from "Data/Context";
import { fetchEssay } from "Data/api";

const logger = new DebugLogger("Viewer");
interface ViewerState {
  document: DocumentReader;
  player: IDocumentPlayer;
  playing: PlayStatus;
  continuePlaying: boolean;
  playingBlock?: number;
  headerHeight: number;

  projectData: CompleteProjectDataObject;
}

interface ViewerProps {
  // projectData: CompleteProjectDataObject;
  essay: EssayDataEntry;
  // essayPath: string;
  // posterPath?: string;
  // hash: string;
  // homeLink: string;
  // appName: string;
  // callToAction?: boolean;
  // organizationName: string;
}

class Viewer extends React.Component<ViewerProps> {
  state: ViewerState;
  static contextType = DataContext;

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
      projectData: defaultProjectData(),
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

    this.setState({ projectData: this.context.projectData });
  }

  componentDidUpdate() {
    document.title = `${this.props.essay.title} | ${
      this.state.projectData.title
    } ${
      this.state.projectData.organizationName
        ? " | " + this.state.projectData.organizationName
        : ""
    }`;
  }

  loadEssay() {
    fetchEssay(this.props.essay)
      .then((loadedDocument) => {
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
    const splashImage = (
      <div
        className={styles.SplashBackgroundImage}
        style={{
          backgroundImage: `url(${this.props.essay.posterPath})`,
        }}
      >
        {" "}
      </div>
    );
    const splashVideo = (
      <video
        poster={this.props.essay.posterPath}
        playsInline
        muted
        loop
        autoPlay
        disablePictureInPicture={true}
        className={styles.SplashBackgroundVideo}
      >
        {/* <source src={this.props.essay.videoPath}></source> */}
        <source src={this.props.essay.videoPath} type={"video/mp4"} />

        {/* {[1280].map((width, idx) => {
    return (
      <source
        key={idx}
        src={get_url(`background-loop-${width}.mp4`)}
        type={"video/mp4"}
      />
    );
  })} */}
      </video>
    );

    const splashContent = this.props.essay.videoPath
      ? splashVideo
      : splashImage;

    return (
      <div className={styles.Viewer}>
        <div className={styles.LogoBarContainer}>
          <LogoBar
            appName={this.state.projectData.title}
            orgName={this.state.projectData.organizationName}
            homeLink={this.state.projectData.homeLink}
          />
        </div>

        <div className={styles.PageContent}>
          <header className={styles.SplashTitleContainer}>
            {this.props.essay.videoPath ? (
              <div className={styles.Gradient} />
            ) : null}
            <div className={styles.SplashBackgroundVideoContainer}>
              {splashContent}
            </div>
            <div className={styles.SplashTitle}>
              <div>
                {/* <header> */}
                {/* See example 5: https://www.w3.org/TR/html52/common-idioms-without-dedicated-elements.html#subheadings-subtitles-alternative-titles-and-taglines */}
                <p className={`sans-title-ff ${styles.SuperTitle}`}>
                  {this.props.essay.supertitle}
                </p>
                <h1>{this.props.essay.title}</h1>
                {/* </header> */}
              </div>
              <div>
                {/* <div className={styles.SplashMetaDivider}></div> */}
                <div className={styles.SplashMeta}>
                  by {this.props.essay.author}
                  <div className={`${styles.Affiliation} sans-copy-ff`}>
                    {this.props.essay.affiliation}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.SplashTitleTail}></div>
          </header>

          <EssayPreamble
            hvtID={this.props.essay.hvtID}
            aviaryLink={this.props.essay.aviaryLink}
          />

          <div
            // style={{ top: Math.max(0, 200 - this.state.scrollPosition) }}
            className={styles.ContentBodyContainer}
          >
            {
              //<EssayLinks
              // links={[
              //   {
              //     title: "HVT-" + this.props.essay.hvtID,
              //     href: `https://fortunoff.aviaryplatform.com/c/mssa.hvt.${this.props.essay.hvtID}`,
              //   },
              //   {
              //     title: "transcript",
              //     href: `https://fortunoff.aviaryplatform.com/c/mssa.hvt.${this.props.essay.hvtID}`,
              //   },
              // ]}
              ///>
            }

            <main className={styles.ContentBodyContents}>
              <ContentBody
                playingBlock={this.state.playingBlock}
                playBlock={this.playBlock}
                stopPlaying={this.stopPlaying}
                playing={this.state.playing === "playing"}
                documentData={this.state.document.document}
              />
            </main>

            {this.state.projectData.callToAction &&
            this.props.essay.aviaryLink ? (
              <div className={styles.CallToActionArea}>
                <CallToAction
                  posterURL={this.props.essay.posterPath}
                  essay={this.props.essay}
                />
              </div>
            ) : null}

            <Footer
              orgName={this.state.projectData.organizationName || ""}
              orgURL={this.state.projectData.homeLink || ""}
              parentOrgName={
                this.state.projectData.parentOrganizationName || ""
              }
              parentOrgURL={this.state.projectData.parentOrganizationURL || ""}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Viewer;
