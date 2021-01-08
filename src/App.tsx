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
  // return <Viewer essayPath={"./data/essay.json"} />;
  return (
    <Router>
      <Switch>
        <Route path="/example-essay">
          {/* <Viewer essayPath={"/data/essay.json"} /> */}
        </Route>
        <Route path="/essay/:essayID">
          <ViewerWrapper />
        </Route>
        <Route path="/">
          <IndexPage essays={essays} />
        </Route>
      </Switch>
    </Router>
  );
}
