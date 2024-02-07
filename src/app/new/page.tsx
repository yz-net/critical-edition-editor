import Editor from "~/components/EditorJS";

import LogoBar from "~/components/LogoBar";
import EssayPreamble from "~/components/Viewer/EssayPreamble";

import styles from "../essay/[essayID]/styles.module.scss";

function InputBoxMoney() {
  return (
    <div>
      <label
        htmlFor="price"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Price
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          type="text"
          name="price"
          id="price"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="0.00"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          >
            <option>USD</option>
            <option>CAD</option>
            <option>EUR</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function InputBox(props: { id: string; name: string; placeholder: string }) {
  return (
    <div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="text"
          name={props.name}
          id={props.id}
          className="block w-full rounded-md border-0 bg-transparent text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
}

export default function NewPage() {
  return (
    <div className={`serif-copy-ff ${styles.Viewer}`}>
      <div className={styles.LogoBarContainer}>
        <LogoBar />
      </div>

      <div className={styles.PageContent}>
        <header className={styles.SplashTitleContainer}>
          <div className={styles.Gradient} />
          <div className={styles.SplashBackgroundVideoContainer}>
            splashContent
          </div>
          <div className={styles.SplashTitle}>
            <div>
              {/* <header> */}
              {/* See example 5: https://www.w3.org/TR/html52/common-idioms-without-dedicated-elements.html#subheadings-subtitles-alternative-titles-and-taglines */}
              <p className={`sans-title-ff my-[1em] ${styles.SuperTitle}`}>
                introduction to the testimony of
              </p>
              <h1>
                <input
                  type="text"
                  name="SuperTitle"
                  id="SuperTitle"
                  placeholder="Critical Edition Title"
                  className="bg-transparent font-serif"
                />
                {/*
                <InputBox
                  name="SuperTitle"
                  id="SuperTitle"
                  placeholder="Title"
                />
                */}
              </h1>
              {/* </header> */}
            </div>
            <div>
              {/* <div className={styles.SplashMetaDivider}></div> */}
              <div className={styles.SplashMeta}>
                by <input />
                <div className={`${styles.Affiliation} sans-copy-ff`}>
                  <input />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.SplashTitleTail} />
        </header>

        <EssayPreamble hvtID={"test"} aviaryLink={"test"} />

        <div
          // style={{ top: Math.max(0, 200 - this.state.scrollPosition) }}
          className={styles.ContentBodyContainer}
        >
          <main className={styles.ContentBodyContents}>
            <Editor />
          </main>

          {/*
          {callToAction && essayAviaryLink ? (
            <div className={styles.CallToActionArea}>
              <CallToAction posterURL={essayPosterPath} essay={essay} />
            </div>
          ) : null}

          <Footer
            orgName={config.projectData.organizationName || ""}
            orgURL={config.projectData.homeLink || ""}
            parentOrgName={config.projectData.parentOrganizationName || ""}
            parentOrgURL={config.projectData.parentOrganizationURL || ""}
          />
          */}
        </div>
      </div>
    </div>
  );
}
