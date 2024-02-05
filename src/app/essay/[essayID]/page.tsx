"use client"

import { useParams } from "next/navigation"

import LogoBar from "~/components/LogoBar";

import config from "public/data/config.json" assert { type: "json" }

import styles from "./styles.module.scss"



export default function essayPage() {
    const params = useParams();

    const essay = config.essays.find((essay) => essay.id === params.essayID);

    if(!essay) {
        return <div>404</div>
    }

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

    const splashContent = essay.videoPath ? splashVideo : splashImage;

    return (
        <div className={styles.Viewer}>
            <div className={styles.LogoBarContainer}>
                <LogoBar />
            </div>

            <div className={styles.PageContent}>
          <header className={styles.SplashTitleContainer}>
            {essay.videoPath ? <div className={styles.Gradient} /> : null}
            <div className={styles.SplashBackgroundVideoContainer}>
              {splashContent}
            </div>
            <div className={styles.SplashTitle}>
              <div>
                {/* <header> */}
                {/* See example 5: https://www.w3.org/TR/html52/common-idioms-without-dedicated-elements.html#subheadings-subtitles-alternative-titles-and-taglines */}
                <p className={`sans-title-ff ${styles.SuperTitle}`}>
                  {essay.supertitle}
                </p>
                <h1>{essay.title}</h1>
                {/* </header> */}
              </div>
              <div>
                {/* <div className={styles.SplashMetaDivider}></div> */}
                <div className={styles.SplashMeta}>
                  by {essay.author}
                  <div className={`${styles.Affiliation} sans-copy-ff`}>
                    {essay.affiliation}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.SplashTitleTail} />
          </header>

          {/* <EssayPreamble hvtID={hvtID} aviaryLink={essayAviaryLink} />

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
              orgName={config.projectData.organizationName || ''}
              orgURL={config.projectData.homeLink || ''}
              parentOrgName={config.projectData.parentOrganizationName || ''}
              parentOrgURL={config.projectData.parentOrganizationURL || ''}
            /> 
          </div>*/}
        </div>
        </div>
    )
}