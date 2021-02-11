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
// import LogoBar from "./components/Viewer/LogoBar";

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
              projectDescription="The Critical Editions Series contextualizes Fortunoff Video testimonies in their historical time and space. Each testimony in the series was chosen by one of our visiting scholars. Each scholar then produced an introductory essay about the chosen testimony, along with an annotated transcript that provides additional insight and background information. "
              essays={essays}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
