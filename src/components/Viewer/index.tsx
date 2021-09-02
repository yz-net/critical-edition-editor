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
import { CompleteProjectDataObject } from "../../Data/ProjectData";

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
  projectData: CompleteProjectDataObject;
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
    document.title = `${this.props.essay.title} | ${
      this.props.projectData.title
    } ${
      this.props.projectData.organizationName
        ? " | " + this.props.projectData.organizationName
        : ""
    }`;
  }

  loadEssay() {
    fetch(this.props.essay.essayPath)
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
            appName={this.props.projectData.title}
            orgName={this.props.projectData.organizationName}
            homeLink={this.props.projectData.homeLink}
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

            {this.props.projectData.callToAction &&
            this.props.essay.aviaryLink ? (
              <div className={styles.CallToActionArea}>
                <CallToAction
                  posterURL={this.props.essay.posterPath}
                  essay={this.props.essay}
                />
              </div>
            ) : null}

            <Footer
              orgName={this.props.projectData.organizationName || ""}
              orgURL={this.props.projectData.homeLink || ""}
              parentOrgName={
                this.props.projectData.parentOrganizationName || ""
              }
              parentOrgURL={this.props.projectData.parentOrganizationURL || ""}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Viewer;
