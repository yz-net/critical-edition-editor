import React, { useEffect, useState } from "react";
import Viewer from "./components/Viewer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation,
} from "react-router-dom";
// import DebugLogger from "./utils/DebugLogger";
import "./App.css";
// import EssayIndexItem from "./components/EssayIndexItem";
import IndexPage from "./components/IndexPage";
import { EssayDataEntry } from "./Data/EssayData";
import { ProjectDataObject } from "./Data/ProjectData";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
// import LogoBar from "./components/Viewer/LogoBar";

// const logger = new DebugLogger("App: ");
interface ViewerWrapperProps {
  essays: Array<EssayDataEntry>;
  projectData: ProjectDataObject;
}
function ViewerWrapper(props: ViewerWrapperProps) {
  const { essays, projectData } = props;
  const location = useLocation();

  function BadViewRequest() {
    return <div>Error Loading Essay</div>;
  }
  const params: { essayID: string } = useParams();
  // const { essayID } = params;

  if (!params.essayID) {
    return <BadViewRequest />;
  }

  // look for essay
  const matches = essays.filter((e) => e.id === params.essayID);
  let essay: EssayDataEntry;
  if (matches.length === 1) {
    essay = matches[0];
  } else {
    return <div>Essay not found</div>;
  }

  // const essay: EssayDataEntry | undefined = essays[essayID];
  // if (!essay || ) {
  //   return <div>Essay not found</div>;
  // }

  return (
    <Router>
      <ScrollToTop />
      <Route path="/">
        <Viewer
          callToAction={projectData.callToAction}
          projectData={projectData}
          appName={projectData.title || "Critical Editions Viewer"}
          organizationName={projectData.organizationName || ""}
          homeLink={
            projectData.homeLink || "https://github.com/yale-fortunoff/"
          }
          essay={essay}
          hash={location.hash}
          essayPath={essay.essayPath}
          posterPath={essay.posterPath}
        />
      </Route>
    </Router>
  );
}

export interface RenderAppProps {
  projectData: ProjectDataObject;
  essays: Array<EssayDataEntry>;
}

function Loading() {
  return <div>Loading</div>;
}

export function RenderApp(props: RenderAppProps) {
  const { projectData, essays } = props;

  if (!projectData || !essays) {
    return <Loading />;
  }

  return (
    <div className="App serif-copy-ff">
      <Router>
        <Switch>
          <Route path="/example-essay">
            {/* <Viewer essayPath={"/data/essay.json"} /> */}
          </Route>
          <Route path="/essay/:essayID">
            <ViewerWrapper projectData={projectData} essays={essays} />
          </Route>
          <Route path="/">
            <IndexPage
              organizationName={projectData.organizationName || ""}
              projectTitle={projectData.title || ""}
              projectSubtitle={projectData.subtitle || ""}
              projectDescription={projectData.introCopy || ""}
              backgroundImageCaption={projectData.impactImageCaption || ""}
              showBylines={
                projectData.showBylinesOnIndexPage === false ? false : true
              }
              showSupertitles={
                projectData.showSupertitlesOnIndexPage === true ? true : false
              }
              projectHomeURL={
                projectData.homeLink || "https://github.com/yale-fortunoff"
              }
              backgroundImageURL={"/img/impact-header-background.jpg"}
              essays={essays}
              textOnly={projectData.textOnlyIndexPage ? true : false}
            />
          </Route>
        </Switch>
      </Router>
      {/* <Footer
        orgName={projectData.organizationName || ""}
        orgURL={projectData.homeLink || ""}
        parentOrgName={projectData.parentOrganizationName || ""}
        parentOrgURL={projectData.parentOrganizationURL || ""}
      /> */}
    </div>
  );
}

export default function App() {
  const [essays, setEssays] = useState<Array<EssayDataEntry>>([]);
  const [projectData, setProjectData] = useState<ProjectDataObject>({});

  useEffect(() => {
    fetch("/data/config.json")
      .then((resp) => resp.json())
      .then((json) => {
        setProjectData(json["projectData"]);
        setEssays(json["essays"]);
      });
  }, []);

  return RenderApp({
    projectData,
    essays,
  });
}
