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
import {
  processProjectData,
  CompleteProjectDataObject,
} from "./Data/ProjectData";

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
  projectData: CompleteProjectDataObject;
}

function ViewerWrapper(props: ViewerWrapperProps) {
  const { essays, projectData } = props;

  function ViewError(props: { message: string }) {
    return <div>{props.message}</div>;
  }

  function BadViewRequest() {
    return <ViewError message="Error Loading Essay" />;
  }

  function EssayNotFound() {
    return <ViewError message="Essay Not Found" />;
  }

  const params: { essayID: string } = useParams();

  if (!params.essayID) {
    return <BadViewRequest />;
  }

  // look for essay. when multiple have the same id, return the first
  const matches = essays.filter((e) => e.id === params.essayID);
  let essay: EssayDataEntry;
  if (matches.length === 1) {
    essay = matches[0];
  } else if (matches.length > 1) {
    essay = matches[0];
    console.warn(
      `Warning: Multiple essays with the same id: ${params.essayID}`
    );
  } else {
    return <EssayNotFound />;
  }

  return (
    // <Router>
    //   <ScrollToTop />
    //   <Route path="/">
    <Viewer projectData={projectData} essay={essay} />
    //   </Route>
    // </Router>
  );
}

export interface RenderAppProps {
  projectData: CompleteProjectDataObject;
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
        <ScrollToTop />
        <Switch>
          <Route path="/example-essay"></Route>
          <Route path="/essay/:essayID">
            <ViewerWrapper projectData={projectData} essays={essays} />
          </Route>
          <Route path="/">
            <IndexPage projectData={projectData} essays={essays} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default function App() {
  const [essays, setEssays] = useState<Array<EssayDataEntry>>([]);
  const [projectData, setProjectData] = useState<CompleteProjectDataObject>({});

  useEffect(() => {
    fetch("/data/config.json")
      .then((resp) => resp.json())
      .then((json) => {
        setProjectData(processProjectData(json["projectData"]));
        setEssays(json["essays"]);
      });
  }, []);

  return RenderApp({
    projectData,
    essays,
  });
}
