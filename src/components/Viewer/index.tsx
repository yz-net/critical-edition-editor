import React from 'react';
import { DataContext } from 'Data/Context';
import { fetchEssay } from 'Data/api';
import {
  CompleteProjectDataObject,
  defaultProjectData,
} from 'Data/ProjectData';
import { Helmet } from 'react-helmet';
import ContentBody from './ContentBody';
import DebugLogger from '../../utils/DebugLogger';
import DocumentReader from '../../utils/DocumentReader/DocumentReader';
import {
  IDocumentPlayer,
  PlayStatus,
} from '../../utils/DocumentPlayer/IDocumentPlayer';
import SpeechSynthesisDocumentPlayer from '../../utils/DocumentPlayer/SpeechSynthesisDocumentPlayer';
import styles from './Viewer.module.css';
import { EssayDataEntry } from '../../Data/EssayData';
import EssayPreamble from './EssayPreamble';
import LogoBar from './LogoBar';
import CallToAction from './CallToAction';
import Footer from '../Footer';

const logger = new DebugLogger('Viewer');
interface ViewerState {
  document: DocumentReader;
  player: IDocumentPlayer;
  playing: PlayStatus;
  continuePlaying: boolean;
  playingBlock?: number;
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

class Viewer extends React.Component<ViewerProps, ViewerState> {
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
      playing: 'stopped',
      continuePlaying: false,
      document: emptyDocument,
      player: new SpeechSynthesisDocumentPlayer({
        document: emptyDocument,
        playStatusHandler: this.playStatusHandler,
      }),
      projectData: defaultProjectData(),
    };
  }

  componentDidMount() {
    this.loadEssay();

    const { projectData } = this.context;

    this.setState({ projectData });
  }

  // componentDidUpdate() {
  //   const {
  //     props: {
  //       essay: { title: essayTitle },
  //     },
  //     state: {
  //       projectData: { title: projectTitle, organizationName },
  //     },
  //   } = this;

  //   const pageTitle = `${essayTitle} | ${projectTitle} ${
  //     organizationName ? ` | ${organizationName}` : ''
  //   }`;
  // }

  playBlock(blockIndex: number) {
    const {
      state: { player },
    } = this;

    player.playBlock(blockIndex);
    this.setState({ playingBlock: blockIndex });
  }

  stopPlaying() {
    const {
      state: { player },
    } = this;
    player.stopPlaying();
  }

  playStatusHandler(status: PlayStatus) {
    const {
      state: { continuePlaying, playingBlock },
    } = this;

    if (status === 'finished' && continuePlaying) {
      logger.log('Finished, playing the next one');
      this.playBlock((playingBlock || 0) + 1);
    } else if (status === 'finished') {
      this.setState({ playing: status });
    } else if (status === 'stopped') {
      this.setState({ playing: status });
    } else if (status === 'playing') {
      this.setState({ playing: status });
    }
  }

  loadEssay() {
    const {
      props: { essay },
    } = this;
    fetchEssay(essay)
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
    const {
      props: {
        essay,
        essay: {
          videoPath: essayVideoPath,
          supertitle: essaySupertitle,
          title: essayTitle,
          author: essayAuthor,
          affiliation: essayAffiliation,
          hvtID,
          aviaryLink: essayAviaryLink,
          posterPath: essayPosterPath,
        },
      },
      state: {
        playing,
        playingBlock,
        document: { document: documentReader },
        projectData: {
          organizationName,
          parentOrganizationName,
          parentOrganizationURL,
          homeLink,
          callToAction,
          title: projectTitle,
        },
      },
    } = this;

    const splashImage = (
      <div
        className={styles.SplashBackgroundImage}
        style={{
          backgroundImage: `url(${essay.posterPath})`,
        }}
      >
        {' '}
      </div>
    );
    const splashVideo = (
      <video
        poster={essay.posterPath}
        playsInline
        muted
        loop
        autoPlay
        disablePictureInPicture
        className={styles.SplashBackgroundVideo}
      >
        <source src={essay.videoPath} type="video/mp4" />
      </video>
    );

    const pageTitle = `${essayTitle} | ${projectTitle} ${
      organizationName ? ` | ${organizationName}` : ''
    }`;

    const splashContent = essay.videoPath ? splashVideo : splashImage;
    return (
      <div className={styles.Viewer}>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        <div className={styles.LogoBarContainer}>
          <LogoBar />
        </div>

        <div className={styles.PageContent}>
          <header className={styles.SplashTitleContainer}>
            {essayVideoPath ? <div className={styles.Gradient} /> : null}
            <div className={styles.SplashBackgroundVideoContainer}>
              {splashContent}
            </div>
            <div className={styles.SplashTitle}>
              <div>
                {/* <header> */}
                {/* See example 5: https://www.w3.org/TR/html52/common-idioms-without-dedicated-elements.html#subheadings-subtitles-alternative-titles-and-taglines */}
                <p className={`sans-title-ff ${styles.SuperTitle}`}>
                  {essaySupertitle}
                </p>
                <h1>{essayTitle}</h1>
                {/* </header> */}
              </div>
              <div>
                {/* <div className={styles.SplashMetaDivider}></div> */}
                <div className={styles.SplashMeta}>
                  by {essayAuthor}
                  <div className={`${styles.Affiliation} sans-copy-ff`}>
                    {essayAffiliation}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.SplashTitleTail} />
          </header>

          <EssayPreamble hvtID={hvtID} aviaryLink={essayAviaryLink} />

          <div
            // style={{ top: Math.max(0, 200 - this.state.scrollPosition) }}
            className={styles.ContentBodyContainer}
          >
            <main className={styles.ContentBodyContents}>
              <ContentBody
                playingBlock={playingBlock}
                playBlock={this.playBlock}
                stopPlaying={this.stopPlaying}
                playing={playing === 'playing'}
                documentData={documentReader}
              />
            </main>

            {callToAction && essayAviaryLink ? (
              <div className={styles.CallToActionArea}>
                <CallToAction posterURL={essayPosterPath} essay={essay} />
              </div>
            ) : null}

            <Footer
              orgName={organizationName || ''}
              orgURL={homeLink || ''}
              parentOrgName={parentOrganizationName || ''}
              parentOrgURL={parentOrganizationURL || ''}
            />
          </div>
        </div>
      </div>
    );
  }
}

Viewer.contextType = DataContext;

export default Viewer;
