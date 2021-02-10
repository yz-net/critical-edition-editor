import React from "react";
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
import { EssayDataEntry, essays } from "./EssayData";
import LogoBar from "./components/Viewer/LogoBar";

// const logger = new DebugLogger("App: ");

function ViewerWrapper() {
  const location = useLocation();
  function BadViewRequest() {
    return <div>Error Loading Essay</div>;
  }
  const params: { essayID: string } = useParams();
  const { essayID } = params;
  if (!params.essayID) {
    return <BadViewRequest />;
  }
  const essay: EssayDataEntry | undefined = essays[essayID];
  if (!essay) {
    return <div>NULL ESSAY</div>;
  }

  return (
    <Router>
      <Route path="/">
        <Viewer
          essay={essay}
          hash={location.hash}
          essayPath={essay.essayPath}
        />
      </Route>
    </Router>
  );
}

export default function App() {
  return (
    <div className="App serif-copy-ff">
      <LogoBar />
      <Router>
        <Switch>
          <Route path="/example-essay">
            {/* <Viewer essayPath={"/data/essay.json"} /> */}
          </Route>
          <Route path="/essay/:essayID">
            <ViewerWrapper />
          </Route>
          <Route path="/">
            <IndexPage
              projectTitle="Critical Edition Series"
              projectDescription="The Fortunoff Video Archive’s Critical Editions Series offers students, researchers and the public the opportunity to watch and learn about a selection of our video testimonies within their rich historical context. Written by our visiting scholars and postdoctoral fellows, each Critical Edition consists of two parts. The first is an introductory essay that draws on the most recent historical research to situate the survivor’s testimony in its specific time and place. The second is an annoted transcript, embedded in the video, that elucidate and shed light on the survivor’s testimony."
              essays={essays}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
